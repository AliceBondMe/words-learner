import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { clearAuthHeader, setAuthHeader } from "../axios";
import {
  AuthResponse,
  ErrorResponse,
  LogoutResponse,
  UserData,
} from "../types";
import { RootState } from "../store";
import { handleError } from "../helpers";

export const registerUser = createAsyncThunk<
  AuthResponse,
  UserData,
  { rejectValue: ErrorResponse }
>("auth/register", async (userInfo: UserData, thunkAPI) => {
  try {
    const response = await axios.post<AuthResponse>("/users/signup", userInfo);
    setAuthHeader(response.data.token);
    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    return thunkAPI.rejectWithValue({ message: errorMessage });
  }
});

export const loginUser = createAsyncThunk<
  AuthResponse,
  UserData,
  { rejectValue: ErrorResponse }
>("auth/login", async (userInfo: UserData, thunkAPI) => {
  try {
    const response = await axios.post<AuthResponse>("/users/signin", userInfo);
    setAuthHeader(response.data.token);
    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    return thunkAPI.rejectWithValue({ message: errorMessage });
  }
});

export const refreshUser = createAsyncThunk<
  AuthResponse,
  void,
  { rejectValue: ErrorResponse }
>("auth/refresh", async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const persistedToken = state.auth.token;

  if (persistedToken === null) {
    return thunkAPI.rejectWithValue({ message: "Unable to fetch user" });
  }

  try {
    setAuthHeader(persistedToken);
    const response = await axios.get<AuthResponse>("/users/current");
    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    return thunkAPI.rejectWithValue({ message: errorMessage });
  }
});

export const logoutUser = createAsyncThunk<
  LogoutResponse,
  void,
  { rejectValue: ErrorResponse }
>("auth/logout", async (_, thunkAPI) => {
  try {
    const response = await axios.post<LogoutResponse>("/users/signout");
    clearAuthHeader();
    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    return thunkAPI.rejectWithValue({ message: errorMessage });
  }
});
