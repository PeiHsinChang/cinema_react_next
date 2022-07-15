import Image from "next/image";
import Link from "next/link";

import logo1 from "../../static/logo/logo_1.png";

import React, { useEffect, useState } from "react";
import styles from "./header.module.scss";
import Hamburger from "../hamburger/hamburger";

const navData = [
  { title: "購票系統", url: "/ticket" },
  { title: "電影", url: "/movies" },
  { title: "場次查詢", url: "/schedule" },
  { title: "相關資訊", url: "/information" },
  { title: "展場租借", url: "/activity" },
];

const NavMenu = () => {
  useEffect(() => {}, []);
  return (
    <ul className={styles.navMenu}>
      {navData &&
        navData.map((item, index) => (
          <li key={index}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
    </ul>
  );
};

const WebLogo = () => (
  <a className={styles.WebLogo}>
    <div className={styles.test}>
      <Link href="/">
        <Image
          src={logo1}
          layout="fill"
          alt="回到首頁"
          width={100}
          height={50}
          objectFit="contain"
        />
      </Link>
    </div>
  </a>
);

const NavigationBar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const hamburgerToggle = () => setOpenMenu(openMenu ? false : true);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <WebLogo />
        <NavMenu />
        <div onClick={hamburgerToggle}>
          <Hamburger isOpenModal={openMenu} />
        </div>
      </nav>
      <div className={styles.panel} id="panel">
        <ul className={styles.panelWrapper}>
          {navData &&
            navData.map((item, index) => (
              <Link href={item.url} key={index}>
                <a>
                  <li className={styles.panelList}>{item.title}</li>
                </a>
              </Link>
            ))}
        </ul>
      </div>
    </header>
  );
};

export default NavigationBar;
