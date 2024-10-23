import ReCAPTCHA from "react-google-recaptcha";

function onChange(value) {
  console.log("Captcha value:", value);
}

const Page = ({ RECAPTCHA_KEY }) => {
  return (
    <>
      TEST RECAPTCHA_KEY
      <ReCAPTCHA sitekey={RECAPTCHA_KEY} onChange={onChange} />
    </>
  );
};

export default Page;

export async function getStaticProps() {
  const RECAPTCHA_KEY = process.env.RECAPTCHA_KEY;

  return { props: { RECAPTCHA_KEY } };
}
