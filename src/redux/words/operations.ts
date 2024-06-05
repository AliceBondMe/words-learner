import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { AllWordsResponse, ErrorResponse, WordsRequestParams } from "../types";

export const getRecommendedWords = createAsyncThunk<
  AllWordsResponse,
  WordsRequestParams,
  { rejectValue: ErrorResponse }
>(
  "words/getRecommended",
  async (wordsRequestData: WordsRequestParams, thunkAPI) => {
    try {
      const response = await axios.get<AllWordsResponse>("/words/all", {
        params: wordsRequestData,
      });
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
  }
);
