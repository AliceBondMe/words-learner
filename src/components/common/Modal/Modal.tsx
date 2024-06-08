import { FC, SyntheticEvent, useEffect } from "react";
import { createPortal } from "react-dom";

import { IoCloseOutline } from "react-icons/io5";
import { ModalProps } from "./types";

import styles from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root") as HTMLElement;

const Modal: FC<ModalProps> = ({ closeModal, children }) => {
  const handleBackdropClose = (e: SyntheticEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    const handleCloseByEsc = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleCloseByEsc);

    return () => {
      window.removeEventListener("keydown", handleCloseByEsc);
    };
  }, [closeModal]);

  return createPortal(
    <div onClick={handleBackdropClose} className={`${styles.backdrop} fadeIn`}>
      <div className={`${styles.modalContainer} zoomIn`}>
        <button
          type="button"
          aria-label="close modal window"
          onClick={closeModal}
          className={styles.closeButton}
        >
          <IoCloseOutline size={32} color="var(--text-contrast)" />
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
