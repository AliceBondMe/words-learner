import { FC } from "react";

import { Icon } from "../../common/Icon/Icon";

import styles from "./Logo.module.css";

export const Logo: FC = () => {
  return (
    <div className={styles.logo}>
      <Icon
        name="icon-logo"
        width={36}
        height={36}
        fill="var(--accent-primary)"
      />
      <span>VocabBuilder</span>
    </div>
  );
};
