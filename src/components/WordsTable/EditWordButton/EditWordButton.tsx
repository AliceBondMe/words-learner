import { FC } from "react";

import { useShowModal } from "../../../hooks/useShowModal";
import { Icon, Modal } from "../../common";
import EditWordForm from "../../EditWordForm/EditWordForm";

import styles from "./EditWordButton.module.css";

const EditWordButton: FC<{ closePopover: () => void }> = ({ closePopover }) => {
  const { isShowModal, openModal, closeModal } = useShowModal();

  return (
    <>
      <button type="button" onClick={openModal} className={styles.button}>
        <Icon
          name="icon-pencil"
          width={16}
          height={16}
          fill="var(--accent-primary)"
        />
        <span>Edit</span>
      </button>

      {isShowModal && (
        <Modal
          closeModal={() => {
            closeModal();
            closePopover();
          }}
          children={
            <EditWordForm
              closeModal={() => {
                closeModal();
                closePopover();
              }}
            />
          }
        />
      )}
    </>
  );
};

export default EditWordButton;
