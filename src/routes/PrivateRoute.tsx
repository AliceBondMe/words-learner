import { FC, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RouteProps } from "./types";
import { selectIsLoggedIn, selectIsRefreshing } from "../redux/auth/selectors";

export const PrivateRoute: FC<RouteProps> = ({
  component: Component,
  redirectTo = "/",
}): ReactElement => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const notAuthorised = !isLoggedIn && !isRefreshing;

  return notAuthorised ? <Navigate to={redirectTo} /> : Component;
};
