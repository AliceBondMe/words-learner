import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "../../redux/store";
import { Dashboard, WordsPagination, WordsTable } from "../../components";
import {
  getCategories,
  getRecommendedWords,
} from "../../redux/words/operations";
import { selectRecommendedWords } from "../../redux/words/selectors";
import { useGetWordsSearchParams } from "../../hooks/useGetWordsSearchParams";

import styles from "./RecommendPage.module.css";

const RecommendPage: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { results: recommendedWords, totalPages } = useSelector(
    selectRecommendedWords
  );
  const wordsSearchParams = useGetWordsSearchParams();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getRecommendedWords(wordsSearchParams));
  }, [dispatch, wordsSearchParams]);

  return (
    <div className={styles.container}>
      <Dashboard />
      <WordsTable wordsList={recommendedWords} />
      {totalPages > 1 && <WordsPagination totalPages={totalPages} />}
    </div>
  );
};

export default RecommendPage;
