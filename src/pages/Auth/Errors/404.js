import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const Err404 = () => {
  return (
    <div 
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f8f9fa 0%, #fff 100%)"
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "2rem",
          borderRadius: "20px", 
          background: "white",
          boxShadow: "0 10px 30px rgba(0, 123, 255, 0.1)",
          maxWidth: "600px",
          width: "90%"
        }}
      >
        <h1
          style={{
            fontSize: "8rem",
            fontWeight: "bold",
            margin: "0",
            background: "linear-gradient(45deg, #001f3f, #003366)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          404
        </h1>

        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "600",
            color: "#2c3e50",
            marginBottom: "1rem"
          }}
        >
          Oops! Page Not Found
        </h2>

        <p
          style={{
            fontSize: "1.1rem",
            color: "#7f8c8d",
            marginBottom: "2rem"
          }}
        >
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "linear-gradient(45deg, #001f3f, #003366)",
            color: "white",
            padding: "0.8rem 1.5rem",
            borderRadius: "50px",
            textDecoration: "none",
            fontSize: "1.1rem",
            fontWeight: "500",
            transition: "transform 0.2s ease",
            boxShadow: "0 4px 15px rgba(0, 123, 255, 0.2)"
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
          onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
        >
          <FaHome /> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Err404;
