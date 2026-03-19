import ApiClient from "./config/axios.instance";
import { ResponseEntity } from "./config/response.types";

export interface AuthResponse {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  userType: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface TokenRefreshResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

const client = ApiClient.getDefaultClient();

export const AuthApiClient = {
  login(
    email: string,
    password: string
  ): Promise<ResponseEntity<AuthResponse>> {
    return ApiClient.handleRequest<AuthResponse>(
      client.post("/api/v1/admin/auth/login", { email, password })
    );
  },

  refreshToken(
    refreshToken: string
  ): Promise<ResponseEntity<TokenRefreshResponse>> {
    return ApiClient.handleRequest<TokenRefreshResponse>(
      client.post("/api/v1/admin/auth/refresh", { refreshToken })
    );
  },

  logout(): Promise<ResponseEntity<void>> {
    return ApiClient.handleRequest<void>(
      client.post("/api/v1/admin/auth/logout")
    );
  },
};
