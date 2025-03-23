import axios from "axios";
import { useEffect } from "react";
import { baseUrl, GOOGLE_CALL_BACK } from "../../../Api/Api";
import { useLocation } from "react-router-dom";

const GoogleCallBack = () => {
  const location = useLocation();
  useEffect(() => {
    async function GoogleCall() {
      try {
        const res = await axios.get(`${baseUrl}/${GOOGLE_CALL_BACK}${location.search}`);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
    GoogleCall();
  }, [location.search]);

  return <h1>Test</h1>;
};

export default GoogleCallBack;
