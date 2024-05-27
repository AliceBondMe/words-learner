import { FC, useEffect, useState } from "react";

import { Logo } from "./Logo/Logo";
import { UserNav } from "./UserNav/UserNav";
import { Icon } from "../common/Icon/Icon";

import styles from "./Header.module.css";
import { MobileMenu } from "./MobileMenu/MobileMenu";
import { UserBar } from "./UserBar/UserBar";
import { useLocation } from "react-router";
import { LogoutButton } from "./LogoutButton/LogoutButton";

export const Header: FC = () => {
  const { pathname } = useLocation();
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1440);
  const [isMobileMenulOpen, setIsMobileMenulOpen] = useState(false);
  const [isAuthPage, setIsAuthPage] = useState(false);

  const handleResize = () => {
    window.innerWidth < 1440 ? setIsMobile(true) : setIsMobile(false);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (pathname.includes("register") || pathname.includes("login")) {
      setIsAuthPage(true);
    } else {
      setIsAuthPage(false);
    }
  }, [pathname]);

  const openMobileMenu = () => {
    setIsMobileMenulOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeMobileMenu = () => {
    setIsMobileMenulOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <header
      className={
        isAuthPage
          ? `${styles.header} ${styles.authPageHeader}`
          : `${styles.header}`
      }
    >
      <Logo />
      {isMobile ? (
        <div className={styles.userMenuBlock}>
          <UserBar />
          <button
            type="button"
            aria-label="Open menu"
            className={styles.menuButton}
            onClick={openMobileMenu}
          >
            <Icon
              name="icon-menu"
              width={40}
              height={28}
              stroke="var(--text-primary)"
            />
          </button>
        </div>
      ) : (
        <>
          <UserNav />
          <div className={styles.userMenuBlock}>
            <UserBar />
            <LogoutButton />
          </div>
        </>
      )}
      {isMobileMenulOpen && <MobileMenu closeMobileMenu={closeMobileMenu} />}
    </header>
  );
};