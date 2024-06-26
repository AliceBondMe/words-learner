import { FC } from "react";
import { Link } from "react-router-dom";

import { AuthForm, AuthPicture } from "../../components";

import styles from "./AuthPages.module.css";

const LoginPage: FC = () => {
  return (
    <div className={styles.container}>
      <div>
        <AuthPicture />
        <p className={styles.additionalText}>
          Word · Translation · Grammar · Progress
        </p>
      </div>
      <div className={styles.formWrap}>
        <AuthForm />
        <Link to="/register" className={styles.link}>
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
