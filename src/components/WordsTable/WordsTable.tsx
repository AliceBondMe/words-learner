import { FC } from "react";

import { useIsNotMobile } from "../../hooks/useIsNotMobile";
import { WordsTableProps } from "./types";
import { Icon } from "../common";

import styles from "./WordsTable.module.css";

const WordsTable: FC<WordsTableProps> = ({ wordsList }) => {
  const { isNotMobile } = useIsNotMobile();

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
            <th className={styles.th}>
              <span>Category</span>
            </th>
            <th className={`${styles.th} ${styles.thRight}`}></th>
          </tr>
        </thead>
        <tbody>
          {wordsList.map(({ _id, en, ua, category }) => (
            <tr key={_id}>
              <td className={`${styles.td} ${styles.tdLeft}`}>
                <span>{en}</span>
              </td>
              <td className={styles.td}>
                <span>{ua}</span>
              </td>
              <td className={styles.td}>
                <span>{category}</span>
              </td>
              <td className={`${styles.td} ${styles.tdRight}`}>
                <button
                  type="button"
                  className={styles.button}
                  aria-label="Add to dictionary"
                >
                  {isNotMobile && <span>Add to dictionary</span>}
                  <Icon
                    name="icon-arrow-right"
                    width={20}
                    height={20}
                    stroke="var(--accent-primary)"
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WordsTable;
