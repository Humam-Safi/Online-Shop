import { Link } from "react-router-dom";
import { FaLock, FaHome } from "react-icons/fa";

const Err403 = ({ role }) => {
  return (
    <div 
      className="error-page"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f8f9fa 0%, #fff 100%)"
      }}
    >
      <div 
        className="error-container"
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
        <div 
          className="error-icon"
          style={{
            marginBottom: "2rem"
          }}
        >
          <FaLock 
            className="lock-icon"
            style={{
              color: "#001f3f",
              fontSize: "4rem",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          />
        </div>
        
        <h1 
          className="error-code"
          style={{
            fontSize: "6rem",
            fontWeight: "bold",
            margin: "0",
            background: "linear-gradient(45deg, #001f3f, #003366)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          403
        </h1>
        
        <div 
          className="error-title"
          style={{
            fontSize: "2rem",
            fontWeight: "600",
            color: "#343a40",
            marginBottom: "1rem"
          }}
        >
          Access Forbidden
        </div>
        
        <div 
          className="error-message"
          style={{
            fontSize: "1.2rem",
            color: "#495057",
            marginBottom: "1rem"
          }}
        >
          Oops! Looks like you don't have permission to access this area.
        </div>

        <div 
          className="error-details"
          style={{
            color: "#6c757d",
            marginBottom: "2rem",
            lineHeight: "1.6"
          }}
        >
          The page you're trying to reach is off-limits. Please check your credentials or contact an administrator if you believe this is a mistake.
        </div>

        <div 
          className="animation-container"
          style={{
            margin: "2rem 0"
          }}
        >
          <div 
            className="shield"
            style={{
              width: "100px",
              height: "100px",
              margin: "0 auto",
              position: "relative",
              animation: "pulse 2s infinite"
            }}
          >
            <div 
              className="shield-inner"
              style={{
                background: "linear-gradient(45deg, #001f3f, #003366)",
                borderRadius: "50%",
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <div 
                className="shield-x"
                style={{
                  color: "white",
                  fontSize: "3rem",
                  fontWeight: "bold"
                }}
              >
                ✕
              </div>
            </div>
          </div>
        </div>

        <Link 
          to="/"
          className="home-button"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "linear-gradient(45deg, #001f3f, #003366)",
            color: "white",
            padding: "0.8rem 2rem",
            borderRadius: "50px",
            textDecoration: "none",
            fontWeight: "500",
            transition: "all 0.3s ease",
            boxShadow: "0 5px 15px rgba(0, 123, 255, 0.3)"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 123, 255, 0.4)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 5px 15px rgba(0, 123, 255, 0.3)";
          }}
        >
          <FaHome className="home-icon" />
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default Err403;
