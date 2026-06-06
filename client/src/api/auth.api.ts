import { apiClient, makeRequest } from ".";
import type {
  AuthResponse,
  LoginInput,
  LogoutResponse,
  RegisterInput,
} from "@jobtrack/shared";

type AuthData = AuthResponse["data"];
type LogoutData = LogoutResponse["data"];

export function login(payload: LoginInput): Promise<AuthData> {
  return makeRequest<AuthData>(apiClient.post("/api/auth/login", payload));
}

export function register(payload: RegisterInput): Promise<AuthData> {
  return makeRequest<AuthData>(apiClient.post("/api/auth/register", payload));
}

export function getMe(): Promise<AuthData> {
  return makeRequest<AuthData>(apiClient.get("/api/auth/me"));
}

export function logout(): Promise<LogoutData> {
  return makeRequest<LogoutData>(apiClient.post("/api/auth/logout"));
}
