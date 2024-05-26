import { FC } from "react";

import { Icon } from "../../common/Icon/Icon";
import { UserBarProps } from "./types";

import styles from "./UserBar.module.css";

export const UserBar: FC<UserBarProps> = ({ isMobileMenu = false }) => {
  return (
    <div className={styles.container}>
      <span
        className={
          isMobileMenu
            ? `${styles.userName} ${styles.mobMenuName}`
            : `${styles.userName}`
        }
      >
        UserName
      </span>
      <div
        className={
          isMobileMenu
            ? `${styles.iconContainer} ${styles.mobMenuIcon}`
            : `${styles.iconContainer}`
        }
      >
        <Icon
          name="icon-user"
          width={20}
          height={20}
          fill={isMobileMenu ? "var(--accent-primary)" : "var(--text-contrast)"}
        />
      </div>
    </div>
  );
};
