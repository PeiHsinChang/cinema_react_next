/**
 * 很神奇的是路徑不能是"~/"，但可以是"../"
 * */
import "../styles/global.scss";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
