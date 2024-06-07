import { createSlice } from "@reduxjs/toolkit";

import { WordsState } from "../types";
import { getCategories, getRecommendedWords } from "./operations";

const wordsInitialState: WordsState = {
  categories: [],
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
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = ["all", ...action.payload];
    });
    builder.addCase(getRecommendedWords.rejected, (state, action) => {
      state.wordsError = action.payload;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.wordsError = action.payload;
    });
  },
});

export const wordsReducer = wordsSlice.reducer;
