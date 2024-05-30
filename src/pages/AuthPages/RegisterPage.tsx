import { FC } from "react";
import { Link } from "react-router-dom";

import { AuthForm } from "../../components/AuthForm/AuthForm";
import { AuthPicture } from "../../components/AuthPicture/AuthPicture";
import { useIsNotMobile } from "../../hooks/useIsNotMobile";

import styles from "./AuthPages.module.css";

const RegisterPage: FC = () => {
  const { isNotMobile } = useIsNotMobile();

  return (
    <div className={styles.container}>
      <div>
        <AuthPicture />
        {isNotMobile && (
          <p className={styles.additionalText}>
            Word · Translation · Grammar · Progress
          </p>
        )}
      </div>
      <div className={styles.formWrap}>
        <AuthForm />
        <Link to="/login" className={styles.link}>
          Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
