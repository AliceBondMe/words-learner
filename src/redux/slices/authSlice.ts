import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./types";

const authInitialState: AuthState = {
  email: null,
  name: null,
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {},
  extraReducers(builder) {
    builder;
  },
});

export const authReducer = authSlice.reducer;
