import Image from "next/image";
import Link from "next/link";

import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Hamburger from "../components/hamburger/hamburger";

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
const WebLogo = () => (
  <Link href="/">
    <a className={styles.WebLogo}>
      <Image
        src="/static/logo/logo_1.png"
        alt="回到首頁"
        width={50}
        height={50}
      />
    </a>
  </Link>
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
        <div className="footer">
          <div className="footer_col ">
            <span>FOLLOW US</span>
            <div className="icon_img">
              <Image
                src="/static/icon/fb.png"
                alt="facebook"
                width={50}
                height={50}
              />
              <Image
                src="/static/icon/ig.png"
                alt="instagram"
                width={50}
                height={50}
              />
              <Image
                src="/static/icon/google.png"
                alt="google"
                width={50}
                height={50}
              />
              <Image
                src="/static/icon/youtube.png"
                alt="youtube"
                width={50}
                height={50}
              />
            </div>
          </div>
          <div className="footer_col subscribe">
            <span>SUBSCRIBE TO NEWSLETTER</span>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
            />
            <button className="button_type2">訂閱</button>
          </div>
        </div>
        <Image
          className="logo"
          src="/static/logo/logo_2.png"
          alt=""
          width={50}
          height={50}
        />
        <p className="footer_p">
          Copyright © 2020 桐畫劇場 all rights reserved
        </p>
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
