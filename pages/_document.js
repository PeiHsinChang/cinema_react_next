/**
 * 屬於 server-side-render，不適合在此寫JSX。
 * 這裡可以放page共用的檔案，但<title> <meta>不在此使用。
 * 在page/_document必須使用class的寫法。 https://stackoverflow.com/questions/66531551/error-mydocument-getinitialprops-should-resolve-to-an-object-with-a-html
 * 先執行 _document.js -> _app.js。
 * 目前 _document.js 不支援 getStaticProps & getServerSideProps。
 */

import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

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
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default appDocument;
