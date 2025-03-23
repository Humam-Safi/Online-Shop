import { createContext, useEffect, useState } from "react";

export const WindowSize = createContext(null);

const WindowContext = ({ children }) => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    function setWindowWidth() {
      setWindowSize(window.innerWidth);
    }

    window.addEventListener("resize", setWindowWidth);

    // Cleanup Function
    return () => {
      window.removeEventListener("resize", setWindowWidth);
    };
  }, []);

  return (
    <WindowSize.Provider value={{ windowSize }}>{children}</WindowSize.Provider>
  );
};

export default WindowContext;
