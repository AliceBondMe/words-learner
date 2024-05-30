import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";

import { UserData } from "./types";
import {
  validationSchemaSignin,
  validationSchemaSignup,
} from "./validationSchema";
import { Icon } from "../common/Icon/Icon";
import { MdError } from "react-icons/md";
import { loginUser, registerUser } from "../../redux/auth/operations";

import styles from "./AuthForm.module.css";
import { selectAuthError } from "../../redux/auth/selectors";

export const AuthForm: FC = () => {
  const { pathname } = useLocation();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const authError = useSelector(selectAuthError);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>({
    resolver: yupResolver(
      pathname.includes("register")
        ? validationSchemaSignup
        : validationSchemaSignin
    ),
  });

  const onSubmit: SubmitHandler<UserData> = async ({
    name,
    email,
    password,
  }: UserData) => {
    pathname.includes("register")
      ? dispatch(registerUser({ name, email, password })).then((action) => {
          if (action.type === "auth/register/fulfilled") {
            navigate("/dictionary");
          } else {
            alert(authError);
          }
        })
      : dispatch(loginUser({ email, password })).then((action) => {
          if (action.type === "auth/login/fulfilled") {
            navigate("/dictionary");
          } else {
            alert(authError);
          }
        });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.formHeader}>
        {pathname.includes("register") ? "Register" : "Login"}
      </h2>
      <p className={styles.formText}>
        {pathname.includes("register")
          ? "To start using our services, please fill out the registration form below. All fields are mandatory:"
          : "Please enter your login details to continue using our service:"}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {pathname.includes("register") && (
          <div>
            <input
              {...register("name")}
              placeholder="Name"
              className={
                errors.name
                  ? `${styles.input} ${styles.inputInvalid}`
                  : `${styles.input}`
              }
            />
            <p className={styles.errorMessage}>
              {errors.name && <MdError size={16} />} {errors.name?.message}
            </p>
          </div>
        )}

        <div>
          <input
            type="email"
            {...register("email")}
            placeholder="Email"
            className={
              errors.email
                ? `${styles.input} ${styles.inputInvalid}`
                : `${styles.input}`
            }
          />
          <p className={styles.errorMessage}>
            {errors.email && <MdError size={16} />} {errors.email?.message}
          </p>
        </div>

        <div>
          <div className={styles.passwordContainer}>
            <input
              type={isShowPassword ? "text" : "password"}
              {...register("password")}
              placeholder="Password"
              className={
                errors.password
                  ? `${styles.input} ${styles.inputInvalid}`
                  : `${styles.input}`
              }
            />

            <button
              type="button"
              aria-label="show password"
              onClick={() => setIsShowPassword((prev) => !prev)}
              className={styles.showPasswordBtn}
            >
              {isShowPassword ? (
                <Icon
                  name="icon-eye_off"
                  width={20}
                  height={20}
                  fill="transparent"
                  stroke="var(--text-primary)"
                />
              ) : (
                <Icon
                  name="icon-eye"
                  width={20}
                  height={20}
                  fill="transparent"
                  stroke="var(--text-primary)"
                />
              )}
            </button>
          </div>

          <p className={styles.errorMessage}>
            {errors.password && <MdError size={16} />}{" "}
            {errors.password?.message}
          </p>
        </div>

        <button type="submit" className={styles.submitBtn}>
          {pathname.includes("register") ? "Register" : "Login"}
        </button>
      </form>
    </div>
  );
};
