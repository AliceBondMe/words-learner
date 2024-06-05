import { FC, useEffect } from "react";

import { WordsPagination, WordsTable } from "../../components";
import { AppDispatch } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getRecommendedWords } from "../../redux/words/operations";
import { selectRecommendedWords } from "../../redux/words/selectors";
import { useSearchParams } from "react-router-dom";

import styles from "./RecommendPage.module.css";

const RecommendPage: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { results: recommendedWords, totalPages } = useSelector(
    selectRecommendedWords
  );

  useEffect(() => {
    const page = searchParams.get("page");
    const pageParam = page ? Number(page) : undefined;
    dispatch(getRecommendedWords({ page: pageParam }));
  }, [dispatch, searchParams]);

  return (
    <div className={styles.container}>
      <h2>RecommendPage</h2>
      <WordsTable wordsList={recommendedWords} />
      <WordsPagination totalPages={totalPages} />
    </div>
  );
};

export default RecommendPage;
