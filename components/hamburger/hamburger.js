import React, { useState } from "react";
import styles from "./hamburger.module.scss";

const Hamburger = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const hamburgerToggle = () => setOpenMenu(openMenu ? false : true);

  return (
    <>
      <div className={styles.hamburgerContainer} onClick={hamburgerToggle}>
        <div className={openMenu ? styles.hamburger : styles.cross}></div>
      </div>
    </>
  );
};
export default Hamburger;
