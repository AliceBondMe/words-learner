import { ComponentType, LazyExoticComponent, lazy, useEffect } from "react";
import { Route, Routes } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import Layout from "./pages/Layout/Layout";
import { Loader } from "./components/common";
import { selectIsRefreshing } from "./redux/auth/selectors";
import { refreshUser } from "./redux/auth/operations";
import { AppDispatch } from "./redux/store";
import { PrivateRoute, RestrictedRoute } from "./routes";

const HomePage: LazyExoticComponent<ComponentType> = lazy(
  () => import("./pages/HomePage/HomePage")
);

const RegisterPage: LazyExoticComponent<ComponentType> = lazy(
  () => import("./pages/AuthPages/RegisterPage")
);

const LoginPage: LazyExoticComponent<ComponentType> = lazy(
  () => import("./pages/AuthPages/LoginPage")
);

const DictionaryPage: LazyExoticComponent<ComponentType> = lazy(
  () => import("./pages/DictionaryPage/DictionaryPage")
);

const RecommendPage: LazyExoticComponent<ComponentType> = lazy(
  () => import("./pages/RecommendPage/RecommendPage")
);

const TrainingPage: LazyExoticComponent<ComponentType> = lazy(
  () => import("./pages/TrainingPage/TrainingPage")
);

function App() {
  const isRefreshingUser = useSelector(selectIsRefreshing);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo="/dictionary"
                component={<RegisterPage />}
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute
                redirectTo="/dictionary"
                component={<LoginPage />}
              />
            }
          />
          <Route
            path="/dictionary"
            element={
              <PrivateRoute
                redirectTo="/login"
                component={<DictionaryPage />}
              />
            }
          />
          <Route
            path="/recommend"
            element={
              <PrivateRoute redirectTo="/login" component={<RecommendPage />} />
            }
          />
          <Route
            path="/training"
            element={
              <PrivateRoute redirectTo="/login" component={<TrainingPage />} />
            }
          />
        </Route>
      </Routes>

      {isRefreshingUser && <Loader />}
    </>
  );
}

export default App;
