import react from "react";

const Captcha = () => {
  return (
    <html>
      <head>
        <title>reCAPTCHA demo: Simple page</title>
        <script
          src="https://www.google.com/recaptcha/api.js"
          async
          defer
        ></script>
        <script>
          {function onSubmit(token) {
            document.getElementById("demo-form").submit();
          }}
        </script>
      </head>
      <body>
        <form id="demo-form" action="?" method="POST">
          <button
            class="g-recaptcha"
            data-sitekey="your_site_key"
            data-callback="onSubmit"
          >
            Submit
          </button>
          <br />
        </form>
      </body>
    </html>
  );
};

export default Captcha;
