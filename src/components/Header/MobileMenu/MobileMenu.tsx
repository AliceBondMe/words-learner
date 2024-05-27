import { FC } from "react";
import { createPortal } from "react-dom";

import { UserNav } from "../UserNav/UserNav";
import { Icon } from "../../common/Icon/Icon";
import { UserBar } from "../UserBar/UserBar";
import { MobileMenuProps } from "./types";
import { LogoutButton } from "../LogoutButton/LogoutButton";
import menu from "../../../assets/images/menu.png";
import menu_2x from "../../../assets/images/menu-2x.png";
import menu_tablet from "../../../assets/images/menu-tablet.png";
import menu_tablet_2x from "../../../assets/images/menu-tablet-2x.png";

import styles from "./MobileMenu.module.css";

const modalRoot = document.querySelector("#modal-root");

export const MobileMenu: FC<MobileMenuProps> = ({ closeMobileMenu }) => {
  return createPortal(
    <div className={`${styles.container} fadeInRight`}>
      <div className={styles.menuHeader}>
        <UserBar isMobileMenu />
        <button
          type="button"
          aria-label="Close menu"
          className={styles.closeButton}
          onClick={closeMobileMenu}
        >
          <Icon
            name="icon-close"
            width={32}
            height={32}
            stroke="var(--text-contrast)"
          />
        </button>
      </div>

      <UserNav />
      <LogoutButton />

      <div className={styles.imageContainer}>
        <picture>
          <source
            srcSet={`${menu_tablet} 1x, ${menu_tablet_2x} 2x`}
            media="(min-width: 768px)"
          />
          <source
            srcSet={`${menu} 1x, ${menu_2x} 2x`}
            media="(max-width: 767px)"
          />
          <img src={menu} alt="Students reading books" />
        </picture>
      </div>
    </div>,
    modalRoot as HTMLElement
  );
};
