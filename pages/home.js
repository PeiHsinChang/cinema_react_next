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

const WebLogo = () => (
  <a className={styles.WebLogo}>
    <Link href="/">
      <img src="/static/logo/logo_1.png" alt="回到首頁" />
    </Link>
  </a>
);

const posters = [
  {
    title: "1/2的魔法",
    content:
      "《1/2的魔法》故事背景在現代科技已比精通魔法還方便的精靈世界，精靈、人馬、美人魚、獨",
  },
];
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
      <div className={styles.body}>
        <div className={styles.mainImage}>
          <img src="/static/slider/littlewoman.jpg" />
        </div>
        <div className={styles.main}>
          <div className={styles.mainBlock}>
            <div>熱門推薦</div>
            <div className={styles.posterWrapper}>
              <div className="poster" onclick="change(1)">
                <img src="./img/post/Onward.jpg" alt="" />
              </div>
            </div>
            <div className={styles.posterContent}></div>
          </div>
          <div className={styles.mainBlock}>
            <div>相關訊息</div>
          </div>
        </div>
      </div>
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
