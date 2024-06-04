import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { AllWordsResponse, ErrorResponse } from "../types";

export const getRecommendedWords = createAsyncThunk<
  AllWordsResponse,
  void,
  { rejectValue: ErrorResponse }
>("words/getRecommended", async (_, thunkAPI) => {
  try {
    const response = await axios.get<AllWordsResponse>("/words/all");
    return response.data;
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    return thunkAPI.rejectWithValue({ message: errorMessage });
  }
});
