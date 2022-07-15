import Image from "next/image";
import Link from "next/link";

import React, { useEffect, useState } from "react";
import styles from "./home.module.scss";
import NavigationBar from "../components/header/header";

import Footer from "../components/footer/footer";

const posters = [
  {
    title: "1/2的魔法",
    content:
      "《1/2的魔法》故事背景在現代科技已比精通魔法還方便的精靈世界，精靈、人馬、美人魚、獨",
    src: "/static/post/Onward.jpg",
  },
  {
    title: "1995",
    content:
      "《1/2的魔法》故事背景在現代科技已比精通魔法還方便的精靈世界，精靈、人馬、美人魚、獨",
    src: "/static/post/1995.jpg",
  },
];

const Home = () => {
  return (
    <>
      <NavigationBar />
      <div className={styles.body}>
        <div className={styles.mainImage}>
          <Image
            src="/static/slider/littlewoman.jpg"
            alt="littlewoman"
            layout="responsive"
            width={100}
            height={50}
          />
        </div>
        <div className={styles.main}>
          <div className={styles.mainBlock}>
            <div>熱門推薦</div>
            <div className={styles.posterWrapper}>
              {posters &&
                posters.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={styles.poster}
                      onClick={() => {}}
                    >
                      <Image
                        src={item.src}
                        alt={item.title}
                        layout="responsive"
                        width={3}
                        height={4}
                      />
                    </div>
                  );
                })}
            </div>
            <div className={styles.posterContent}></div>
          </div>
          <div className={styles.mainBlock}>
            <div>相關訊息</div>
          </div>
        </div>
      </div>
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
