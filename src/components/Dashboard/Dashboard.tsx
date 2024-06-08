import { FC } from "react";
import { Link, useLocation } from "react-router-dom";

import Filters from "./Filters/Filters";
import { Icon } from "../common";

import styles from "./Dashboard.module.css";
import AddWordButton from "../AddWordButton/AddWordButton";
import { useSelector } from "react-redux";
import { selectOwnWords } from "../../redux/words/selectors";

const Dashboard: FC = () => {
  const { pathname } = useLocation();
  const { results: ownWords } = useSelector(selectOwnWords);

  return (
    <div className={styles.container}>
      <Filters />

      <div className={styles.actionsBlock}>
        <p className={styles.statWrap}>
          <span className={styles.statText}>To study:</span>{" "}
          <span className={styles.statValue}>{ownWords.length}</span>
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
