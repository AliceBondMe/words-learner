import { createSlice } from "@reduxjs/toolkit";

import { WordsState } from "../types";
import {
  addNewWord,
  addOthersWord,
  deleteWord,
  editWord,
  getCategories,
  getOwnWords,
  getRecommendedWords,
  getTasks,
  sendAnswers,
} from "./operations";

const wordsInitialState: WordsState = {
  tasks: [],
  checkedAnswers: [],
  wordToEdit: null,
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
  reducers: {
    setWordToEditAction(state, action) {
      state.wordToEdit = action.payload;
    },
  },
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
    builder.addCase(editWord.fulfilled, (state, action) => {
      const editedWordIndex = state.dictionary.results.findIndex(
        ({ _id }) => _id === action.payload._id
      );
      state.dictionary.results[editedWordIndex] = action.payload;
    });
    builder.addCase(addOthersWord.fulfilled, (state, action) => {
      state.dictionary.results.push(action.payload);
    });
    builder.addCase(deleteWord.fulfilled, (state, action) => {
      state.dictionary.results = state.dictionary.results.filter(
        ({ _id }) => _id !== action.payload
      );
    });
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.tasks = action.payload.tasks;
    });
    builder.addCase(sendAnswers.fulfilled, (state, action) => {
      state.checkedAnswers = action.payload;
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
    builder.addCase(editWord.rejected, (state, action) => {
      state.wordsError = action.payload;
    });
    builder.addCase(deleteWord.rejected, (state, action) => {
      state.wordsError = action.payload;
    });
    builder.addCase(getTasks.rejected, (state, action) => {
      state.wordsError = action.payload;
    });
    builder.addCase(sendAnswers.rejected, (state, action) => {
      state.wordsError = action.payload;
    });
  },
});

export const wordsReducer = wordsSlice.reducer;
export const { setWordToEditAction } = wordsSlice.actions;
