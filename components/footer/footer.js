import React, { useState } from "react";
import Image from "next/image";
import styles from "./footer.module.scss";

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
          <Image
            src={item.src}
            alt={item.url}
            layout="responsive"
            width={50}
            height={50}
          />
        </div>
      ))}
    </>
  );
};

const Footer = () => {
  const thisYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <div className={styles.footerBox}>
          <span>FOLLOW US</span>
          <div className={styles.socialBox}>
            <SocialImage />
          </div>
        </div>
        <div className={styles.footerBox}>
          <span>SUBSCRIBE TO NEWSLETTER</span>
          <div className={styles.emailContainer}>
            <input
              className={styles.emailInput}
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
            />
            <button className={styles.emailSubmit}>訂閱</button>
          </div>
        </div>
      </div>
      <div className={styles.logo2}>
        <Image
          src="/static/logo/logo_2.png"
          alt="/"
          layout="responsive"
          width={50}
          height={50}
        />
      </div>
      <span>Copyright © {thisYear} 桐畫劇場 all rights reserved</span>
    </footer>
  );
};
export default Footer;
