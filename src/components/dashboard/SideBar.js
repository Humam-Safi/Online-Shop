import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./bards.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu } from "../../context/menuContext";
import { useContext, useEffect, useState } from "react";
import { WindowSize } from "../../context/windowContext";
import { USER } from "../../Api/Api";
import { Axios } from "../../Api/axios";
import { Links } from "./NavLink";

const SideBar = () => {
  const { isOpen } = useContext(Menu);
  const { windowSize: size } = useContext(WindowSize);
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => { 
    Axios.get(`/${USER}`)
      .then((data) => setUser(data.data))
      .catch(() => navigate("/login", { replace: true }));
  }, [navigate]);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "70px",
          left: "0",
          width: "100%",
          height: "100vh",
          background: "rgba(0,0,0,0.2)",
          display: size < "768" && isOpen ? "block" : "none",
        }}
      />
      <div
        className="side-bar pt-3"
        style={{
          left: size < "768" ? (isOpen ? "0" : "-100%") : "0",
          width: isOpen ? "220px" : "fit-content",
          position: size < "768" ? "fixed" : "sticky",
        }}
      >
        {Links.map(
          (link, key) =>
            link.role.includes(user.role) && (
              <NavLink key={key} to={link.to} className={link.class}>
                <FontAwesomeIcon
                  style={{
                    padding: isOpen ? "10px 8px 10px 15px" : "10px 13px",
                  }}
                  icon={link.icon}
                />
                <p
                  className="m-0"
                  style={{
                    display: isOpen ? "block" : "none",
                  }}
                >
                  {link.name}
                </p>
              </NavLink>
            )
        )}
      </div>
    </>
  );
};

export default SideBar;
