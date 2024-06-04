import { FC } from "react";

import { AppDispatch } from "../../../redux/store";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/auth/operations";
import { Icon } from "../../common";

import styles from "./LogoutButton.module.css";

const LogoutButton: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <button
      type="button"
      className={styles.logoutButton}
      onClick={handleLogout}
    >
      <span>Log out </span>
      <Icon name="icon-arrow-right2" width={16} height={16} />
    </button>
  );
};

export default LogoutButton;
