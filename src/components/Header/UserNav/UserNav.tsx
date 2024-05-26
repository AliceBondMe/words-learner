import { FC } from "react";
import { NavLink } from "react-router-dom";

import styles from "./UserNav.module.css";

const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;

export const UserNav: FC = () => {
  return (
    <nav className={styles.navigation}>
      <NavLink to="dictionary" className={getNavLinkClass}>
        Dictionary
      </NavLink>

      <NavLink to="recommend" className={getNavLinkClass}>
        Recommend
      </NavLink>

      <NavLink to="training" className={getNavLinkClass}>
        Training
      </NavLink>
    </nav>
  );
};
