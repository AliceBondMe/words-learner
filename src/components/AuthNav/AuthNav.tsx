import { FC } from "react";
import { Link } from "react-router-dom";

import styles from "./AuthNav.module.css";

export const AuthNav: FC = () => {
  return (
    <nav className={styles.navigation}>
      <Link to="register" className={styles.link}>
        Register
      </Link>

      <Link to="login" className={styles.link}>
        Login
      </Link>
    </nav>
  );
};
