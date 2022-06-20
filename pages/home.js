import Image from "next/image";
import Link from "next/link";

import React, { useEffect, useState } from "react";
import styles from "./home.module.scss";
import Hamburger from "../components/hamburger/hamburger";
import Footer from "../components/Footer/Footer";

const NavMenu = () => {
  const navData = [
    { title: "購票系統", url: "ticket.html" },
    { title: "電影", url: "movies.html" },
    { title: "場次查詢", url: "schedule.html" },
    { title: "相關資訊", url: "information.html" },
    { title: "展場租借", url: "activity.html" },
  ];

  useEffect(() => {}, []);

  return (
    <ul className={styles.navMenu}>
      {navData.map((item, index) => (
        <li key={index}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
    </ul>
  );
};

const SocialImage = () => {
  const imageData = [
    { src: "/static/icon/fb.png", alt: "facebook" },
    { src: "/static/icon/ig.png", alt: "instagram" },
    { src: "/static/icon/google.png", alt: "google" },
    { src: "/static/icon/youtube.png", alt: "youtube" },
  ];
  return (
    <>
      {imageData.map((item, index) => (
        <div className={styles.socialImg} key={index + "_img"}>
          <img src={item.src} alt={item.url} />
        </div>
      ))}
    </>
  );
};

const WebLogo = () => (
  <a className={styles.WebLogo}>
    <Link href="/">
      <img src="/static/logo/logo_1.png" alt="回到首頁" />
    </Link>
  </a>
);

const Home = () => {
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <WebLogo />
          <NavMenu />
          <Hamburger isOpenModal={false} />
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
      <Footer />
    </>
  );
};

// Home.getInitialProps = async (context) => {
//   console.log(context?.req?.headers);
//   const userAgent = context?.req?.headers
//     ? context?.req?.headers["user-agent"]
//     : typeof navigator !== "undefined"
//     ? navigator?.userAgent
//     : query?.isExport
//     ? "isExport"
//     : "";
//   return {
//     ...(Home.getInitialProps
//       ? await Home.getInitialProps({ ...context, userAgent })
//       : {}),
//     userAgent,
//   };
// };
export default Home;
