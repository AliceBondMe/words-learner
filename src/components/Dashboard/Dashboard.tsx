import { FC } from "react";
import { Link } from "react-router-dom";

import Filters from "./Filters/Filters";
import { Icon } from "../common";

import styles from "./Dashboard.module.css";

const Dashboard: FC = () => {
  return (
    <div className={styles.container}>
      <Filters />

      <div className={styles.actionsBlock}>
        <p className={styles.statWrap}>
          <span className={styles.statText}>To study:</span>{" "}
          <span className={styles.statValue}>20</span>
        </p>
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
