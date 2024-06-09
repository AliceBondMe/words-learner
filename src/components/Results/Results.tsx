import { FC } from "react";
import { useSelector } from "react-redux";

import book from "../../assets/images/book.png";
import book_2x from "../../assets/images/book-2x.png";

import { selectCheckedAnswers } from "../../redux/words/selectors";

import styles from "./Results.module.css";
import { nanoid } from "@reduxjs/toolkit";

const Results: FC = () => {
  const results = useSelector(selectCheckedAnswers);

  const correct = results.filter(({ isDone }) => isDone);
  const mistakes = results.filter(({ isDone }) => !isDone);

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Well done</h2>
      <div className={styles.columnsWrap}>
        <div className={styles.column}>
          <h3 className={styles.columnHeader}>Сorrect answers: </h3>
          {!correct.length ? (
            <p className={styles.message}>
              Unfortunately, you didn't get any correct answers this time <br />{" "}
              Don't give up, keep practicing and you'll improve!
            </p>
          ) : (
            <ul>
              {correct.map(({ en, ua, task }) => (
                <li key={nanoid()} className={styles.word}>
                  {task === "en" ? ua : en}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={styles.rightColumn}>
          <div>
            <h3 className={styles.columnHeader}>Mistakes:</h3>
            {!mistakes.length ? (
              <p className={styles.message}>
                Excellent work! <br />
                You got all the answers correct. <br />
                Keep up the great work!
              </p>
            ) : (
              <ul>
                {mistakes.map(({ en, ua, task }) => (
                  <li key={nanoid()} className={styles.word}>
                    {task === "en" ? ua : en}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={styles.imageWrap}>
            <img
              srcSet={`${book} 1x, ${book_2x} 2x`}
              src={book}
              alt="Opened book"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
