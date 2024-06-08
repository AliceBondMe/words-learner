import { useState } from "react";

export const useShowModal = () => {
  const [isShowModal, setIsShowModal] = useState(false);

  const openModal: () => void = () => {
    setIsShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal: () => void = () => {
    setIsShowModal(false);
    document.body.style.overflow = "";
  };

  return { isShowModal, openModal, closeModal };
};
