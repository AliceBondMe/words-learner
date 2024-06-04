import { FC, useEffect } from "react";

import { WordsPagination, WordsTable } from "../../components";
import { AppDispatch } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getRecommendedWords } from "../../redux/words/operations";
import { selectRecommendedWords } from "../../redux/words/selectors";

const RecommendPage: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { results: recommendedWords, totalPages } = useSelector(
    selectRecommendedWords
  );

  useEffect(() => {
    dispatch(getRecommendedWords());
  }, [dispatch]);

  return (
    <div>
      <h2>RecommendPage</h2>
      <WordsTable wordsList={recommendedWords} />
      <WordsPagination totalPages={totalPages} />
    </div>
  );
};

export default RecommendPage;
