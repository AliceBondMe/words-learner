import { FC, Suspense } from "react";

import { Header } from "../../components/Header/Header";
import { Outlet } from "react-router";
import { Loader } from "../../components/common/Loader/Loader";

import styles from "./Layout.module.css";

const Layout: FC = () => {
  return (
    <>
      <Header />
      <main className={styles.container}>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

export default Layout;
