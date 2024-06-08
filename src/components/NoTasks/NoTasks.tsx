import { FC } from "react";
import { Link, useLocation } from "react-router-dom";

import noWords from "../../assets/images/noWords.png";
import noWords_2x from "../../assets/images/noWords-2x.png";

import styles from "./NoTasks.module.css";

const NoTasks: FC = () => {
  const location = useLocation();

  return (
    <div className={styles.container}>
      <div className={styles.imageWrap}>
        <img
          srcSet={`${noWords} 1x, ${noWords_2x} 2x`}
          src={noWords}
          alt="Examination paper"
        />
      </div>

      <div className={styles.infoBlock}>
        <h3 className={styles.header}>
          You don't have a single word to learn right now.{" "}
        </h3>
        <p className={styles.text}>
          Please create or add a word to start the workout. We want to improve
          your vocabulary and develop your knowledge, so please share the words
          you are interested in adding to your study.
        </p>

        <div className={styles.linksWrap}>
          <Link
            to="/dictionary"
            state={{ from: location }}
            className={styles.link}
          >
            Add word
          </Link>

          <Link to="/dictionary" className={styles.linkCancel}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoTasks;
