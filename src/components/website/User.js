import { useEffect, useState } from "react";
import { Axios } from "../../Api/axios";
import { LOGOUT, USER } from "../../Api/Api";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import {  Modal } from "react-bootstrap";
import Cookie from "cookie-universal";
import { useNavigate } from "react-router-dom";
const User = () => {
  const [user, setUser] = useState(null);
  const [showich, setShowich] = useState(false);
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
    <div>
      <FaRegCircleUser
        cursor="pointer"
        fontSize="22px"
        color="black"
        onClick={() => setShowich(true)}
      />
      <Modal show={showich} onHide={() => setShowich(false)}>
        <Modal.Header closeButton>
          <Modal.Title>User Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {user ? (
            <>
              <div className="mb-4">
                <FaRegCircleUser size={80} />
              </div>
              <div className="mb-3">
                <h4>{user.name}</h4>
              </div>
              <div className="mb-4">
                <p className="text-muted">{user.email}</p>
              </div>
              {user.role !== "2001" && (
                <button
                  onClick={() => navigate("/dashboard")}
                  className="mb-3 w-100 border-0 py-2 rounded"
                  style={{
                    background: "linear-gradient(45deg, #2193b0, #6dd5ed)",
                    color: "white",
                    transition: "all 0.3s ease",
                    whiteSpace: "nowrap",
                    minWidth: "fit-content"
                  }}
                >
                  <div className="d-flex align-items-center justify-content-center gap-2">
                    <span>Go to Dashboard</span>
                    <i className="fas fa-tachometer-alt"></i>
                  </div>
                </button>
              )}
              <button
                onClick={() => {
                  handleLogOut();
                }}
                className="mt-auto w-100 border-0 py-2 rounded"
                style={{
                  background: "linear-gradient(45deg, #ff005a, #ff5d2d)",
                  color: "white",
                  transition: "all 0.3s ease",
                  whiteSpace: "nowrap",
                  minWidth: "fit-content"
                }}
              >
                <div className="d-flex align-items-center justify-content-center gap-2" style={{whiteSpace: "nowrap"}}>
                  <span>Logout</span>
                  <FaSignOutAlt />
                </div>
              </button>
            </>
          ) : (
            <div className="text-center">
              <FaRegCircleUser size={80} className="mb-4" />
              <div className="d-flex flex-column gap-3">
                <button
                  onClick={(e) => {
                    navigate("/login");
                  }}
                  className="w-100 border-0 py-2 rounded"
                  style={{
                    background: "linear-gradient(45deg, #ff005a, #ff5d2d)",
                    color: "white",
                    transition: "all 0.3s ease",
                    whiteSpace: "nowrap",
                    minWidth: "fit-content"
                  }}
                >
                  <div className="d-flex align-items-center justify-content-center gap-2" style={{whiteSpace: "nowrap"}}>
                    <span>Login</span>
                    <FaSignInAlt />
                  </div>
                </button>
                
                <div className="position-relative my-2">
                  <hr className="my-2" />
                  <span className="position-absolute top-50 start-50 translate-middle px-3 bg-white text-muted">
                    or
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    navigate("/register");
                  }}
                  className="w-100 border-2 py-2 rounded"
                  style={{
                    background: "transparent",
                    border: "2px solid #ff005a",
                    color: "#ff005a",
                    transition: "all 0.3s ease",
                    whiteSpace: "nowrap",
                    minWidth: "fit-content"
                  }}
                >
                  <div className="d-flex align-items-center justify-content-center gap-2">
                    <span>Don't have an account? Sign up</span>
                  </div>
                </button>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default User;
