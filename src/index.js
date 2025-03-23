import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./Css/component/loading.css";
import "./Css/component/buttons.css";
import "./Css/component/alert.css";
import "./pages/Auth/Auth.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loading-skeleton/dist/skeleton.css";
import "react-image-gallery/styles/css/image-gallery.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import MenuContext from "./context/menuContext";
import WindowContext from "./context/windowContext";
import SearchContext from "./context/SearchContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WindowContext>
      <MenuContext>
        <SearchContext>
          <Router>
            <App />
          </Router>
        </SearchContext>
      </MenuContext>
    </WindowContext>
  </React.StrictMode>
);
