/**
 * 路徑是"../"
 * */
import "../styles/global.scss";
import Head from "next/head";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "../store/redux-learning/store";

function MyApp({ Component, pageProps }) {
  const storeRef = useRef(null);

  if (storeRef.current === null) {
    storeRef.current = makeStore();
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Provider store={storeRef.current}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
