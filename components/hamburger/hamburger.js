import React, { useEffect } from "react";
import styles from "./hamburger.module.scss";

const Hamburger = ({ isOpenModal = false }) => {
  useEffect(() => {
    const hamburger = document.getElementById("panel");
    if (isOpenModal) {
      hamburger.style.display = "block";
    } else {
      hamburger.style.display = "none";
    }
  }, [isOpenModal]);

  return (
    <div className={styles.hamburgerContainer}>
      <div className={isOpenModal ? styles.cross : styles.hamburger}></div>
    </div>
  );
};
export default Hamburger;
