/**
 * 很神奇的是路徑不能是"~/"，但可以是"../"
 * */
import "../styles/global.scss";
import Head from "next/head";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <Script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
