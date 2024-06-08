import { FC, useEffect, useState } from "react";

import { Icon, Modal } from "../common";
import { useShowModal } from "../../hooks/useShowModal";
import AddWordForm from "../AddWordForm/AddWordForm";
import { useLocation } from "react-router";

import styles from "./AddWordButton.module.css";

const AddWordButton: FC = () => {
  const { isShowModal, openModal, closeModal } = useShowModal();
  const { state } = useLocation();
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    if (!modalOpened && state?.from?.pathname.includes("training")) {
      openModal();
      setModalOpened(true);
    }
  }, [state, openModal, modalOpened]);

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className={styles.addWordButton}
      >
        <span>Add word</span>
        <Icon
          name="icon-plus"
          width={20}
          height={20}
          stroke="var(--accent-primary)"
        />
      </button>
      {isShowModal && (
        <Modal
          closeModal={closeModal}
          children={<AddWordForm closeModal={closeModal} />}
        />
      )}
    </>
  );
};

export default AddWordButton;
