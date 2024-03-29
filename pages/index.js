import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";

export default function Home() {
  const [eventData, setEventData] = useState("");

  useEffect(() => {
    if (window.DeviceOrientationEvent) {
      window.addEventListener(
        "deviceorientation",
        function (event) {
          const alpha = event.alpha;
          const beta = event.beta;
          const gamma = event.gamma;
          setEventData(`alpha:${alpha}, beta:${beta}, gamma:${gamma}`);
        },
        false
      );
    } else {
      setEventData(`你的瀏覽器不支援喔`);
    }

    window.addEventListener("resize", function (event) {
      var newWidth = window.innerWidth;
      var newHeight = window.innerHeight;
      console.log("newWidth", newWidth);
      console.log("newHeight", newHeight);
    });
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Nddddext App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        {"eventData" + eventData}

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
