import React from "react";
import styles from "./Modal.module.scss";

const Modal = ({
  id = "modal",
  isOpenModal = false,
  closeModalHandler = () => {},
  children = <></>,
}) => {
  return (
    <div
      id={id}
      className={styles.alertModal}
      style={{ display: isOpenModal ? "flex" : "none" }}
      onClick={(e) => {
        closeModalHandler(e);
      }}
    >
      <div className={styles.alertBox} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
