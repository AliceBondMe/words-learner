import { RootState } from "../store";

export const selectRecommendedWords = (state: RootState) =>
  state.words.recommended;
export const selectOwnWords = (state: RootState) => state.words.dictionary;
export const selectWordsCategories = (state: RootState) =>
  state.words.categories;
export const selectWordsToEdit = (state: RootState) => state.words.wordToEdit;
export const selectTasks = (state: RootState) => state.words.tasks;
export const selectCheckedAnswers = (state: RootState) =>
  state.words.checkedAnswers;
export const selectWordsError = (state: RootState) => state.words.wordsError;
