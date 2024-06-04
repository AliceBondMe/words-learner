import { createSlice } from "@reduxjs/toolkit";

import { WordsState } from "../types";
import { getRecommendedWords } from "./operations";

const wordsInitialState: WordsState = {
  recommended: {
    results: [],
    totalPages: 0,
  },
  wordsError: null,
};

const wordsSlice = createSlice({
  name: "words",
  initialState: wordsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRecommendedWords.fulfilled, (state, action) => {
      state.recommended.results = action.payload.results;
      state.recommended.totalPages = action.payload.totalPages;
      state.wordsError = null;
    });
    builder.addCase(getRecommendedWords.rejected, (state, action) => {
      state.wordsError = action.payload;
    });
  },
});

export const wordsReducer = wordsSlice.reducer;
