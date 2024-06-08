import { RootState } from "../store";

export const selectRecommendedWords = (state: RootState) =>
  state.words.recommended;
export const selectOwnWords = (state: RootState) => state.words.dictionary;
export const selectWordsCategories = (state: RootState) =>
  state.words.categories;
export const selectWordsToEdit = (state: RootState) => state.words.wordToEdit;
