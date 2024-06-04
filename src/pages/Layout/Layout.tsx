import { FC, Suspense } from "react";
import { Outlet } from "react-router";

import { Header } from "../../components";
import { Loader } from "../../components/common";

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
