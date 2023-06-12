/**
 * 屬於 server-side-render，不適合在此寫JSX。
 * 這裡可以放page共用的檔案，但<title> <meta>不在此使用。
 * 在page/_document必須使用class的寫法。 https://stackoverflow.com/questions/66531551/error-mydocument-getinitialprops-should-resolve-to-an-object-with-a-html
 * 先執行 _document.js -> _app.js。
 * 目前 _document.js 不支援 getStaticProps & getServerSideProps。
 */

import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/Script";

class appDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const res = await fetch("https://api.github.com/repos/vercel/next.js");
    const json = await res.json();
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="zh-Hant-TW">
        <Head>
          <Script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js" />
          {/* <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          /> */}
        </Head>
        {/* <Script language="javascript">
          var noPrint = true; var noCopy = true; var noScreenshot = true; var
          autoBlur = true;
        </Script>
        <Script
          type="text/javascript"
          src="https://pdfanticopy.com/noprint.js"
        ></Script> */}
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default appDocument;
