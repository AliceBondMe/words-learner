import { FC } from "react";

import { Icon, Modal } from "../common";
import { useShowModal } from "../../hooks/useShowModal";

import styles from "./AddWordButton.module.css";
import AddWordForm from "../AddWordForm/AddWordForm";

const AddWordButton: FC = () => {
  const { isShowModal, openModal, closeModal } = useShowModal();

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
