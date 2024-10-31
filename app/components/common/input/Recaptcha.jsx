import ReCAPTCHA from "react-google-recaptcha";

const Recaptcha = ({ onChange }) => {
  return (
    <ReCAPTCHA
      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}
      onChange={onChange}
    />
  );
};

export default Recaptcha;
