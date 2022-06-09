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

  useEffect(() => {
    // try {
    //   console.log(window?.navigator?.userAgent);
    // } catch (error) {
    //   console.log(error);
    // }
  }, []);

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
    <img class="logo" src="./static/logo/logo_1.png" alt="回到首頁" />
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
      <footer className={styles.footer}>
        <div class="footer">
          <div class="footer_col ">
            <span>FOLLOW US</span>
            <div class="icon_img">
              <img src="./img/icon/fb.png" alt="facebook" />
              <img src="./img/icon/ig.png" alt="instagram" />
              <img src="./img/icon/google.png" alt="google" />
              <img src="./img/icon/youtube.png" alt="youtube" />
            </div>
          </div>
          <div class="footer_col subscribe">
            <span>SUBSCRIBE TO NEWSLETTER</span>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
            />
            <button class="button_type2">訂閱</button>
          </div>
        </div>
        <img class="logo" src="./img/logo/logo_2.png" alt="" />
        <p class="footer_p">Copyright © 2020 桐畫劇場 all rights reserved</p>
      </footer>
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
