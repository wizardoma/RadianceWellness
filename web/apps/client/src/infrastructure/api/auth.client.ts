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

export interface RegisterResponse {
  customerId: string;
  email: string;
  message: string;
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
      client.post("/api/v1/auth/login", { email, password })
    );
  },

  register(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string
  ): Promise<ResponseEntity<RegisterResponse>> {
    return ApiClient.handleRequest<RegisterResponse>(
      client.post("/api/v1/auth/register", {
        firstName,
        lastName,
        email,
        phone,
        password,
      })
    );
  },

  refreshToken(
    refreshToken: string
  ): Promise<ResponseEntity<TokenRefreshResponse>> {
    return ApiClient.handleRequest<TokenRefreshResponse>(
      client.post("/api/v1/auth/refresh", { refreshToken })
    );
  },

  forgotPassword(email: string): Promise<ResponseEntity<void>> {
    return ApiClient.handleRequest<void>(
      client.post("/api/v1/auth/forgot-password", { email })
    );
  },

  resetPassword(
    token: string,
    newPassword: string
  ): Promise<ResponseEntity<void>> {
    return ApiClient.handleRequest<void>(
      client.post("/api/v1/auth/reset-password", { token, newPassword })
    );
  },

  logout(): Promise<ResponseEntity<void>> {
    return ApiClient.handleRequest<void>(
      client.post("/api/v1/auth/logout")
    );
  },
};
