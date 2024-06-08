import { createSlice } from "@reduxjs/toolkit";

import { WordsState } from "../types";
import {
  addNewWord,
  addOthersWord,
  getCategories,
  getOwnWords,
  getRecommendedWords,
} from "./operations";

const wordsInitialState: WordsState = {
  dictionary: {
    results: [],
    totalPages: 0,
  },
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
    builder.addCase(getOwnWords.fulfilled, (state, action) => {
      state.dictionary.results = action.payload.results;
      state.dictionary.totalPages = action.payload.totalPages;
      state.wordsError = null;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(addNewWord.fulfilled, (state, action) => {
      state.dictionary.results.push(action.payload);
    });
    builder.addCase(addOthersWord.fulfilled, (state, action) => {
      state.dictionary.results.push(action.payload);
    });
    builder.addCase(getRecommendedWords.rejected, (state, action) => {
      state.wordsError = action.payload;
    });
    builder.addCase(getOwnWords.rejected, (state, action) => {
      state.wordsError = action.payload;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.wordsError = action.payload;
    });
    builder.addCase(addNewWord.rejected, (state, action) => {
      state.wordsError = action.payload;
    });
    builder.addCase(addOthersWord.rejected, (state, action) => {
      state.wordsError = action.payload;
    });
  },
});

export const wordsReducer = wordsSlice.reducer;
