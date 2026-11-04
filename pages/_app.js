/**
 * 路徑是"../"
 * */
import "../styles/global.scss";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { Provider } from "react-redux";
import { hydrateData } from "../store/redux-learning/data";
import { makeStore } from "../store/redux-learning/store";

function MyApp({ Component, pageProps }) {
  const storeRef = useRef(null);

  if (storeRef.current === null) {
    storeRef.current = makeStore(pageProps.initialReduxState);
  }

  const snapshot = pageProps.initialReduxState;
  const [appliedSnapshot, setAppliedSnapshot] = useState(snapshot);

  useEffect(() => {
    if (snapshot && snapshot !== appliedSnapshot) {
      storeRef.current.dispatch(hydrateData(snapshot.data));
    }
    setAppliedSnapshot(snapshot);
  }, [snapshot, appliedSnapshot]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Provider store={storeRef.current}>
        {(!snapshot || snapshot === appliedSnapshot) ? (
          <Component {...pageProps} />
        ) : <p role="status">正在套用伺服器資料…</p>}
      </Provider>
    </>
  );
}

export default MyApp;
