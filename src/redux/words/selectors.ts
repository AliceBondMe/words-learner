import { RootState } from "../store";

export const selectRecommendedWords = (state: RootState) =>
  state.words.recommended;
export const selectWordsCategories = (state: RootState) =>
  state.words.categories;
