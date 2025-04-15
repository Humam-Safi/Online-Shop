import { useEffect, useState } from "react";
import { Axios } from "../../Api/axios";
import { LOGOUT, USER } from "../../Api/Api";
import {
  FaRegUserCircle,
  FaUserEdit,
  FaCog,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserPlus,
} from "react-icons/fa";
import Cookie from "cookie-universal";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const cookie = Cookie();

  useEffect(() => {
    Axios.get(`${USER}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  async function handleLogOut() {
    try {
      const res = await Axios.get(`/${LOGOUT}`);
      window.location.reload();
      cookie.remove("e-commerce");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <motion.div
      className="profile-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="profile-container">
        {user ? (
          <motion.div
            className="profile-content"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="profile-avatar mb-4">
              <div className="avatar-wrapper">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="d-flex justify-content-center"
                >
                  <FaRegUserCircle color="#001f3f" size={80} className="avatar-icon" />
                </motion.div>
              </div>

              <div className="profile-info mb-4 text-center">
                <h4 className="fw-bold mb-2">{user.name}</h4>
                <p className="text-muted mb-0">{user.email}</p>
              </div>
            </div>

            <div className="profile-actions d-flex flex-column gap-3">
              {user.role !== "2001" && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/dashboard")}
                  className="btn w-100 py-2 rounded-pill d-flex align-items-center justify-content-center gap-2"
                  style={{
                    background: "linear-gradient(45deg, #001f3f, #003366)",
                    color: "white",
                  }}
                >
                  <FaCog />
                  <span>Dashboard</span>
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogOut}
                className="btn btn-danger w-100 py-2 rounded-pill d-flex align-items-center justify-content-center gap-2"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="guest-content"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="guest-avatar mb-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="d-flex justify-content-center"
              >
                <FaRegUserCircle color="#001f3f" size={80} className="text-muted" />
              </motion.div>
            </div>

            <div className="guest-actions d-flex flex-column gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/login")}
                className="btn w-100 py-2 rounded-pill d-flex align-items-center justify-content-center gap-2"
                style={{
                  background: "linear-gradient(45deg, #001f3f, #003366)",
                  color: "white",
                }}
              >
                <FaSignInAlt />
                <span>Login</span>
              </motion.button>

              <div className="divider">
                <span className="text-muted">or</span>
              </div>

              <motion.button
                style={{
                  background: "white",
                  color: "#001f3f",
                  border: "1px solid #001f3f",
                }}
                whileHover={{ 
                  scale: 1.02,
                  background: "linear-gradient(45deg, #001f3f, #003366)",
                  color: "white",
                  border: "none"
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/register")}
                className="btn w-100 py-2 rounded-pill d-flex align-items-center justify-content-center gap-2"
              >
                <FaUserPlus />
                <span>Create Account</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>

      <style jsx>{`
        .profile-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f8f9fa 0%, #fff 100%);
          padding: 2rem;
        }

        .profile-container {
          background: white;
          padding: 3rem;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 123, 255, 0.1);
          max-width: 500px;
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        .profile-container::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #007bff, #00ff88);
        }

        .profile-avatar {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .avatar-wrapper {
          position: relative;
          display: inline-block;
        }

        .divider {
          position: relative;
          text-align: center;
          margin: 1rem 0;
        }

        .divider:before,
        .divider:after {
          content: "";
          position: absolute;
          top: 50%;
          width: 45%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #dee2e6, transparent);
        }

        .divider:before {
          left: 0;
        }

        .divider:after {
          right: 0;
        }

        .divider span {
          background: white;
          padding: 0 10px;
          position: relative;
          z-index: 1;
        }

        .btn {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .btn::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.1);
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }

        .btn:hover::after {
          transform: translateX(0);
        }
      `}</style>
    </motion.div>
  );
};

export default Profile;
