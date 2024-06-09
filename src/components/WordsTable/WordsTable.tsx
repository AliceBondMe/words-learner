import { FC } from "react";

import { useIsNotMobile } from "../../hooks/useIsNotMobile";
import { WordsTableProps } from "./types";
import { Icon } from "../common";
import AddOthersWordButton from "./AddOthersWordButton/AddOthersWordButton";

import styles from "./WordsTable.module.css";
import { useLocation } from "react-router";
import ProgressBar from "../ProgressBar/ProgressBar";
import ActionsButton from "./ActionsButton/ActionsButton";

const WordsTable: FC<WordsTableProps> = ({ wordsList }) => {
  const { pathname } = useLocation();
  const { isNotMobile } = useIsNotMobile();

  const isDictionaryPage = pathname.includes("dictionary");

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={`${styles.th} ${styles.thLeft}`}>
              <div className={styles.headWithIcon}>
                <span>Word</span>
                {isNotMobile && <Icon name="icon-uk" width={28} height={28} />}
              </div>
            </th>
            <th className={styles.th}>
              <div className={styles.headWithIcon}>
                <span>Translation</span>
                {isNotMobile && (
                  <Icon name="icon-ukraine" width={28} height={28} />
                )}
              </div>
            </th>
            {isNotMobile && isDictionaryPage && (
              <th className={styles.th}>
                <span>Category</span>
              </th>
            )}
            {!isDictionaryPage && (
              <th className={styles.th}>
                <span>Category</span>
              </th>
            )}
            {isDictionaryPage && (
              <th className={styles.th}>
                <span>Progress</span>
              </th>
            )}
            <th className={`${styles.th} ${styles.thRight}`}></th>
          </tr>
        </thead>
        <tbody>
          {wordsList.map((word) => (
            <tr key={word._id}>
              <td className={`${styles.td} ${styles.tdLeft}`}>
                <span>{word.en}</span>
              </td>
              <td className={styles.td}>
                <span>{word.ua}</span>
              </td>
              {isNotMobile && isDictionaryPage && (
                <td className={styles.td}>
                  <span>{word.category}</span>
                </td>
              )}
              {!isDictionaryPage && (
                <td className={styles.td}>
                  <span>{word.category}</span>
                </td>
              )}
              {isDictionaryPage && (
                <td className={styles.td}>
                  <div className={styles.progressWrap}>
                    {isNotMobile && (
                      <span className={styles.progressText}>
                        {Math.round(word.progress as number)}%
                      </span>
                    )}
                    <ProgressBar
                      progress={word.progress as number}
                      color1="var(--progressDark)"
                      color2="var(--progressLight)"
                      thickness1={isNotMobile ? 9 : 8}
                      thickness2={4}
                      size={isNotMobile ? "26px" : "24px"}
                    />
                  </div>
                </td>
              )}
              <td
                className={`${styles.td} ${
                  wordsList.indexOf(word) === wordsList.length - 1 &&
                  styles.tdRight
                }`}
              >
                {isDictionaryPage ? (
                  <ActionsButton word={word} />
                ) : (
                  <AddOthersWordButton wordId={word._id} wordEn={word.en} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WordsTable;
