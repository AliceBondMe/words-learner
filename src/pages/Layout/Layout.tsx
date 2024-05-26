import { FC, Suspense } from "react";
import { Header } from "../../components/Header/Header";
import { Outlet } from "react-router";
import { Loader } from "../../components/common/Loader/Loader";

const Layout: FC = () => {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

export default Layout;
