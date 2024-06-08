import { FC, SyntheticEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AppDispatch } from "../../../redux/store";
import { useDispatch } from "react-redux";
import { LuTrash2 } from "react-icons/lu";

import { ActionsButtonProps } from "./types";
import EditWordButton from "../EditWordButton/EditWordButton";
import { setWordToEditAction } from "../../../redux/words/wordsSlice";
import { deleteWord } from "../../../redux/words/operations";

import styles from "./ActionsButton.module.css";
import styles2 from "../EditWordButton/EditWordButton.module.css";

const modalRoot = document.querySelector("#modal-root") as HTMLElement;

const ActionsButton: FC<ActionsButtonProps> = ({ word }) => {
  const [isShowPopover, setIsShowPopover] = useState(false);
  const [popoverStyles, setPopoverStyles] = useState<React.CSSProperties>({});
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dispatch: AppDispatch = useDispatch();

  const handleBackdropClose = (e: SyntheticEvent) => {
    if (e.target === e.currentTarget) {
      setIsShowPopover(false);
    }
  };

  useEffect(() => {
    const handleCloseByEsc = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        setIsShowPopover(false);
      }
    };
    window.addEventListener("keydown", handleCloseByEsc);

    return () => {
      window.removeEventListener("keydown", handleCloseByEsc);
    };
  }, [setIsShowPopover]);

  const handleOpenModal = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPopoverStyles({
        top: rect.bottom + 4,
        left: rect.left - 40,
      });
    }
    setIsShowPopover(true);
    dispatch(setWordToEditAction(word));
  };

  const handleDeleteWord = () => {
    dispatch(deleteWord(word._id));
  };

  return (
    <>
      <button
        type="button"
        ref={buttonRef}
        onClick={handleOpenModal}
        className={
          isShowPopover
            ? `${styles.button} ${styles.activeButton}`
            : styles.button
        }
      >
        ...
      </button>

      {isShowPopover &&
        createPortal(
          <div
            onClick={handleBackdropClose}
            className={`${styles.popoverBackdrop} fadeIn`}
          >
            <div
              className={`${styles.popoverContainer} zoomIn`}
              style={popoverStyles}
            >
              <div className={styles.buttonsWrap}>
                <EditWordButton closePopover={() => setIsShowPopover(false)} />

                <button
                  type="button"
                  onClick={handleDeleteWord}
                  className={styles2.button}
                >
                  <LuTrash2 size={16} color="var(--accent-primary)" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>,
          modalRoot
        )}
    </>
  );
};

export default ActionsButton;
