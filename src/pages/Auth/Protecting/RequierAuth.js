import { Navigate, Outlet,  useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { USER } from "../../../Api/Api";
import LoadingSubmit from "../../../components/loading/loading";
import { Axios } from "../../../Api/axios";
import Err403 from "../Errors/403";

const RequierAuth = ({allowedRole}) => {
  // User
  const [user, setUser] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setUser(data.data))
      .catch(() => {
        navigate("/login" , {replace:true} );
      });
  }, []);
  // Token
  const cookie = Cookie();
  const token = cookie.get("e-commerce");


  return token ? (
    user === "" ? (
      <LoadingSubmit />
    ) : allowedRole.includes(user.role) ?(
      <Outlet />
    ) : <Err403 role={user.role}/>
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
};

export default RequierAuth;
