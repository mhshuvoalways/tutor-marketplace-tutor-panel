const BASE_URL = process.env.BASE_URL;

const recoverPass = (url) => {
  return (
    <div
      style={{
        backgroundColor: "#f7f8fc",
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      <h2>Hello there,</h2>
      <p>Forgot your password? Click the button and change your password.</p>
      <a
        style={{
          textDecoration: "none",
        }}
        href={`${BASE_URL}/recover-password/${url}`}
      >
        <button
          style={{
            backgroundColor: "#6a307d",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "3px",
            outline: "0",
            cursor: "pointer",
          }}
        >
          Change password
        </button>
      </a>
    </div>
  );
};

export default recoverPass;
