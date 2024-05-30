export interface ErrorResponse {
  message: string;
}

export interface AuthState {
  email: string | null;
  name: string | null;
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  authError: ErrorResponse | null | undefined;
}

export interface UserData {
  name?: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  _id?: string;
  email: string;
  name: string;
  token: string;
}

export interface LogoutResponse {
  message: string;
}
