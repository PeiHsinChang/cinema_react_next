import React, { useEffect, useState } from "react";
import styles from "./intersectionObserver.module.scss";

const IntsectionObserver = () => {
  useEffect(() => {
    // IntersectionObserver(callback,options)
    const container = document.getElementById("container");

    const observer = new IntersectionObserver(
      (enteries, options) => {
        console.log({ enteries, options });
        enteries.forEach((entry) => {
          // do something...
          entry.target.classList.toggle(styles.show, entry.isIntersecting);
          // console.log({ entry });
        });
      },
      {
        // threshold: 0.7,
        root: container,
        // rootMargin: "-300px 0px 0px 0px",
      }
    );

    // 綁定
    observer.observe(document.getElementById("card1"));

    // const allCards = document.querySelectorAll("." + styles.card);
    // allCards.forEach((card) => observer.observe(card));

    // console.log(allCards);
  }, []);

  return (
    <div id={"container"} className={styles.cardContainer}>
      <div className={styles.card}>First card</div>
      <div className={styles.card}>Card</div>
      <div className={styles.card}>Card</div>
      <div className={styles.card}>Card</div>
      <div className={styles.card}>Card</div>
      <div className={styles.card}>Card</div>
      <div className={styles.card}>Card</div>
      <div className={styles.card}>Card</div>
      <div id={"card1"} className={styles.card}>
        Card
      </div>
      <div className={styles.card}>Card</div>
      <div className={styles.card}>Card</div>
      <div className={styles.card}>Card</div>
      <div className={styles.card}>Card</div>
      <div className={styles.card}>Card</div>
      <div className={styles.card}>Card</div>
      <div className={styles.card}>Last card</div>
    </div>
  );
};

export default IntsectionObserver;
