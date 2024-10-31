const BASE_URL = process.env.BASE_URL;

const verifyEmailTemplate = (name, token) => {
  return (
    <div
      style={{
        backgroundColor: "#f7f8fc",
        padding: "30px",
        borderRadius: "5px",
      }}
    >
      <h2>Hello {name},</h2>
      <p
        style={{
          marginTop: "5px",
        }}
      >
        {`Thanks for signing up with Tim's Tutor! Please verify your email address to activate your account.`}
      </p>
      <div
        style={{
          marginTop: "30px",
        }}
      >
        <p>
          🔗 Verify My Email:{" "}
          <a
            style={{
              textDecoration: "underline",
            }}
            target="blank"
            href={`${BASE_URL}/verify-account?token=${token}`}
          >
            {`${BASE_URL}/verify-account?token=${token}`}
          </a>
        </p>
      </div>
      <p
        style={{
          marginTop: "30px",
        }}
      >
        Verifying your email helps us keep your account secure and ensures you
        have full access to all our features.
      </p>
      <div
        style={{
          marginTop: "30px",
        }}
      >
        <p>Best regards,</p>
        <h4>{`Tim's Tutor Team`}</h4>
      </div>
    </div>
  );
};

export default verifyEmailTemplate;
