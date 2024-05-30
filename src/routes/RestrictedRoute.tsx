import { FC, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RouteProps } from "./types";
import { selectIsLoggedIn } from "../redux/auth/selectors";

export const RestrictedRoute: FC<RouteProps> = ({
  component: Component,
  redirectTo = "/",
}): ReactElement => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};
