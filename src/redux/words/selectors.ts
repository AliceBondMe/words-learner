import { RootState } from "../store";

export const selectRecommendedWords = (state: RootState) =>
  state.words.recommended;
