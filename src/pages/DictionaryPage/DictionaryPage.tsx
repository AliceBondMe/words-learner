import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "../../redux/store";
import { getCategories, getOwnWords } from "../../redux/words/operations";
import { selectOwnWords } from "../../redux/words/selectors";
import { useGetWordsSearchParams } from "../../hooks/useGetWordsSearchParams";
import { Dashboard, WordsPagination, WordsTable } from "../../components";

import styles from "../RecommendPage/RecommendPage.module.css";

const DictionaryPage: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { results: ownWords, totalPages } = useSelector(selectOwnWords);
  const wordsSearchParams = useGetWordsSearchParams();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOwnWords(wordsSearchParams));
  }, [dispatch, wordsSearchParams]);

  return (
    <div className={styles.container}>
      <Dashboard />
      <WordsTable wordsList={ownWords} />
      {totalPages > 1 && <WordsPagination totalPages={totalPages} />}
    </div>
  );
};

export default DictionaryPage;
