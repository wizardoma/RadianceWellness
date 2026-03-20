import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { Setup } from "./environment";
import { ResponseEntity } from "./response.types";

export interface ApiClientOptions {
  timeout?: number;
}

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}[] = [];

function processQueue(error: unknown, token: string | null) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token!);
    }
  });
  failedQueue = [];
}

class ApiClient {
  private static instance: AxiosInstance | null = null;

  static createClient(options: ApiClientOptions = {}): AxiosInstance {
    const { timeout = 30000 } = options;

    const client = axios.create({
      baseURL: Setup.apiUrl,
      timeout,
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
    });

    // ── Request interceptor ─────────────────────────────────────────────
    client.interceptors.request.use(
      (config) => {
        if (Setup.isDevelopment) {
          console.log(
            `Radiance -> ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`,
            config.params ?? ""
          );
        }

        // Attach auth token if present
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("radiance_access_token");
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }

        return config;
      },
      (error) => {
        console.error("API Request Error:", error);
        return Promise.reject(error);
      }
    );

    // ── Response interceptor with auto-refresh ─────────────────────────
    client.interceptors.response.use(
      (response: AxiosResponse) => {
        if (Setup.isDevelopment) {
          console.log(
            `Radiance <- ${response.config.url} — ${response.status}`
          );
        }
        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
          _retry?: boolean;
        };

        // Only attempt refresh on 401, not on auth endpoints themselves
        if (
          error.response?.status === 401 &&
          originalRequest &&
          !originalRequest._retry &&
          !originalRequest.url?.includes("/auth/login") &&
          !originalRequest.url?.includes("/auth/refresh") &&
          !originalRequest.url?.includes("/auth/logout")
        ) {
          if (isRefreshing) {
            // Another refresh is in progress — queue this request
            return new Promise((resolve, reject) => {
              failedQueue.push({
                resolve: (token: string) => {
                  originalRequest.headers.Authorization = `Bearer ${token}`;
                  resolve(client(originalRequest));
                },
                reject,
              });
            });
          }

          originalRequest._retry = true;
          isRefreshing = true;

          const refreshToken =
            typeof window !== "undefined"
              ? localStorage.getItem("radiance_refresh_token")
              : null;

          if (!refreshToken) {
            isRefreshing = false;
            handleAuthFailure();
            return Promise.reject(error);
          }

          try {
            // Use raw axios (not intercepted client) to avoid infinite loop
            const response = await axios.post(
              `${Setup.apiUrl}/api/v1/auth/refresh`,
              { refreshToken }
            );

            const newAccessToken = response.data?.data?.accessToken;
            const newRefreshToken = response.data?.data?.refreshToken;
            if (!newAccessToken) {
              throw new Error("No access token in refresh response");
            }

            // Update stored tokens
            localStorage.setItem("radiance_access_token", newAccessToken);
            if (newRefreshToken) {
              localStorage.setItem("radiance_refresh_token", newRefreshToken);
            }

            processQueue(null, newAccessToken);

            // Retry the original request with new token
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return client(originalRequest);
          } catch (refreshError) {
            processQueue(refreshError, null);
            handleAuthFailure();
            return Promise.reject(refreshError);
          } finally {
            isRefreshing = false;
          }
        }

        console.error(
          `API Error: ${error.config?.url} — ${error.response?.status}`
        );
        return Promise.reject(error);
      }
    );

    return client;
  }

  static getDefaultClient(): AxiosInstance {
    if (!this.instance) {
      this.instance = this.createClient();
    }
    return this.instance;
  }

  static async handleRequest<T>(
    requestPromise: Promise<AxiosResponse>
  ): Promise<ResponseEntity<T>> {
    try {
      const response = await requestPromise;

      if (response.data && typeof response.data === "object") {
        if (
          response.data.status === true ||
          response.data.success === true ||
          response.data.status === "success"
        ) {
          return ResponseEntity.Data<T>(
            response.data.data,
            response.data.pagination
          );
        }
        return ResponseEntity.Data<T>(response.data.data ?? response.data);
      }

      return ResponseEntity.Data<T>(response.data);
    } catch (error) {
      console.error("API Request failed:", error);

      if (axios.isAxiosError(error)) {
        if (error.code === "ECONNABORTED") {
          return ResponseEntity.Timeout<T>();
        }

        if (!error.response) {
          return ResponseEntity.Socket<T>();
        }

        const errorMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          error.message ||
          "An error occurred";

        return ResponseEntity.Error<T>(errorMessage, {
          statusCode: error.response.status,
          fieldErrors: error.response.data?.fieldErrors || {},
        });
      }

      return ResponseEntity.Error<T>("Network error occurred");
    }
  }
}

function handleAuthFailure() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("radiance_access_token");
    localStorage.removeItem("radiance_refresh_token");
    localStorage.removeItem("radiance_user");

    // Store a flag so the login page can show a toast
    localStorage.setItem("radiance_session_expired", "true");

    window.location.href = "/login";
  }
}

export default ApiClient;
