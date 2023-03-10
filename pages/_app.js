/**
 * 很神奇的是路徑不能是"~/"，但可以是"../"
 * */
import "../styles/global.scss";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script language="javascript">
          var noPrint = true; var noCopy = true; var noScreenshot = true; var
          autoBlur = true;
        </script>
        <script
          type="text/javascript"
          src="https://pdfanticopy.com/noprint.js"
        ></script>
      </Head>
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
