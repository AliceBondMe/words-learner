import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import Filters from "./Filters/Filters";
import { Icon } from "../common";
import AddWordButton from "../AddWordButton/AddWordButton";
import {
  selectOwnWords,
  selectWordsToStudy,
} from "../../redux/words/selectors";
import { AppDispatch } from "../../redux/store";

import styles from "./Dashboard.module.css";
import { getStatistics } from "../../redux/words/operations";

const Dashboard: FC = () => {
  const { pathname } = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const { results: ownWords } = useSelector(selectOwnWords);
  const wordsToStudy = useSelector(selectWordsToStudy);

  useEffect(() => {
    dispatch(getStatistics());
  }, [dispatch, ownWords]);

  return (
    <div className={styles.container}>
      <Filters />

      <div className={styles.actionsBlock}>
        <p className={styles.statWrap}>
          <span className={styles.statText}>To study:</span>{" "}
          <span className={styles.statValue}>{wordsToStudy}</span>
        </p>

        {pathname.includes("dictionary") && <AddWordButton />}

        <Link to="/training" className={styles.link}>
          <span>Train oneself</span>
          <Icon
            name="icon-arrow-right"
            width={20}
            height={20}
            stroke="var(--accent-primary)"
          />
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
