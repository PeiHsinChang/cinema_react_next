import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Hamburger from "../components/hamburger/hamburger";

const NavMenu = () => {
  const navData = [
    {
      title: "購票系統",
      url: "ticket.html",
    },
    {
      title: "電影",
      url: "movies.html",
    },
    {
      title: "場次查詢",
      url: "schedule.html",
    },
    {
      title: "相關資訊",
      url: "information.html",
    },
    {
      title: "展場租借",
      url: "activity.html",
    },
  ];
  return (
    <ul className={styles.navMenu}>
      {navData.map((item) => (
        <li>
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
    </ul>
  );
};
const WebLogo = () => (
  <a className={styles.WebLogo} href="/">
    <img class="logo" src="./img/logo/logo_1.png" alt="回到首頁" />
  </a>
);
const Home = () => {
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <WebLogo />

          <NavMenu />
          <Hamburger />
        </nav>
      </header>
      <div className={styles.body}></div>
      {/* <nav id="navbar" className={styles.nav}>
        <div class="nav">
          <div class="nav_left">
            <a href="index.html">
              <img class="logo" src="./img/logo/logo_1.png" alt="回到首頁" />
            </a>
          </div>
          <div class="nav_right">
            <NavList />
          </div>
        </div>
        <div id="panel">
          <NavList />
        </div>
      </nav> */}
    </>
  );
};
export default Home;
