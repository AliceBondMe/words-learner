import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../types";
import { loginUser, logoutUser, refreshUser, registerUser } from "./operations";

const authInitialState: AuthState = {
  name: null,
  email: null,
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  authError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.authError = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.authError = null;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.name = null;
      state.email = null;
      state.token = null;
      state.isLoggedIn = false;
      state.authError = null;
    });
    builder.addCase(refreshUser.pending, (state) => {
      state.isRefreshing = true;
    });
    builder.addCase(refreshUser.fulfilled, (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isLoggedIn = true;
      state.isRefreshing = false;
    });
    builder.addCase(refreshUser.rejected, (state) => {
      state.isRefreshing = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.authError = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.authError = action.payload;
    });
  },
});

export const authReducer = authSlice.reducer;
