// import Head from "next/head";
// import Script from "next/script";
// import react from "react";
import dynamic from "next/dynamic";
import ReCAPTCHA from "react-google-recaptcha";

// const NoSSR = dynamic(() => Captcha, { ssr: false });

function onChange(value) {
  console.log("Captcha value:", value);
}

const Captcha = () => {
  return (
    <>
      {/* <Head>
        <title>reCAPTCHA demo: Simple page</title>
        <Script
          src="https://www.google.com/recaptcha/api.js"
          async
          defer
        ></Script>
        <Script>
          {function onSubmit(token) {
            document.getElementById("demo-form").submit();
          }}
        </Script>
      </Head>
      <body>
        <form id="demo-form" action="?" method="POST">
          <button
            className="g-recaptcha"
            data-sitekey="6LeFZlQqAAAAAMjKM35xkFCr3yqtYaPeaPDCfQrd"
            data-callback="onSubmit"
          >
            Submit
          </button>
          <br />
        </form>
      </body> */}

      <ReCAPTCHA
        sitekey="6LeFZlQqAAAAAMjKM35xkFCr3yqtYaPeaPDCfQrd"
        onChange={onChange}
      />
    </>
  );
};

const Page = () => {
  return (
    <>
      {/* <NoSSR /> */}
      <Captcha />
    </>
  );
};

// ReactDOM.render(
//   ,
//   document.body
// );

export default Page;
