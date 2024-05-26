export interface AuthState {
  email: string | null;
  name: string | null;
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
}
