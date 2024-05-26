import { ComponentType, LazyExoticComponent, lazy } from "react";
import { Route, Routes } from "react-router";

import Layout from "./pages/Layout/Layout";

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
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dictionary" element={<DictionaryPage />} />
          <Route path="/recommend" element={<RecommendPage />} />
          <Route path="/training" element={<TrainingPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
