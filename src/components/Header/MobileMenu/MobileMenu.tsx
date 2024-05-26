import { FC } from "react";
import { createPortal } from "react-dom";

import { UserNav } from "../UserNav/UserNav";
import { Icon } from "../../common/Icon/Icon";

import styles from "./MobileMenu.module.css";
import { UserBar } from "../UserBar/UserBar";
import { MobileMenuProps } from "./types";

const modalRoot = document.querySelector("#modal-root");

export const MobileMenu: FC<MobileMenuProps> = ({ closeMobileMenu }) => {
  return createPortal(
    <div className={styles.container}>
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
    </div>,
    modalRoot as HTMLElement
  );
};
