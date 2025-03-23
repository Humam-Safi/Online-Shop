import { faBars, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Menu } from "../../context/menuContext";
import { LOGOUT, USER } from "../../Api/Api";
import { Axios } from "../../Api/axios";
import { useNavigate } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Cookie from "cookie-universal";

const TopBar = () => {
  const { setIsOpen } = useContext(Menu);
  const [name, setName] = useState("");
  const cookie = Cookie();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await Axios.get(`/${LOGOUT}`);
      cookie.remove("e-commerce");
      window.location.pathname = "/login";
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setName(data.data.name))
      .catch(() => {
        navigate("/login", { replace: true });
      });
  }, [navigate]);

  return (
    <div className="top-bar">
      <div className="d-flex align-items-center justify-content-between h-100">
        <div className="d-flex align-items-center gap-5">
          <h3>E-commerce</h3>
          <FontAwesomeIcon
            onClick={() => setIsOpen((prev) => !prev)}
            cursor="pointer"
            icon={faBars}
          />
        </div>
        <div>
          <DropdownButton id="dropdown-basic-button" title={name}>
            <Dropdown.Item onClick={handleLogOut}>Log Out</Dropdown.Item>
            <Dropdown.Item onClick={() => navigate("/")}>
              <FontAwesomeIcon icon={faHome} className="me-2" />
              Home
            </Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
