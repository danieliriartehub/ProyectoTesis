import { api, setToken } from "./client";
import type { User } from "@/types";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role?: "admin" | "inspector" | "engineer" | "viewer";
}

export interface TokenResponse {
  accessToken: string;
  tokenType: string;
  user: User;
}

export const authApi = {
  async login(data: LoginRequest): Promise<TokenResponse> {
    const res = await api.post<TokenResponse>("/api/v1/auth/login", data);
    setToken(res.accessToken);
    return res;
  },

  async register(data: RegisterRequest): Promise<User> {
    return api.post<User>("/api/v1/auth/register", data);
  },

  async me(): Promise<User> {
    return api.get<User>("/api/v1/auth/me");
  },
};
