import { FC } from "react";

import { Icon } from "../../common/Icon/Icon";

import styles from "./LogoutButton.module.css";

export const LogoutButton: FC = () => {
  return (
    <button type="button" className={styles.logoutButton}>
      <span>Log out </span>
      <Icon name="icon-arrow-right2" width={16} height={16} />
    </button>
  );
};
