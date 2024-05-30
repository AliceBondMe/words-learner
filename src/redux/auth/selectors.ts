import { RootState } from "../store";

export const selectUserName = (state: RootState) => state.auth.name;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state: RootState) => state.auth.isRefreshing;
export const selectAuthError = (state: RootState) => state.auth.authError;
