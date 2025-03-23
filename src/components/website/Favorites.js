import TopBar from "./topBar";
import { useState, useEffect } from "react";
import ProductComp from "./Products/productsComp";
const Favorites = () => {

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  return ( 
    <div>
    <div className="home">
      <div className="container">
        <TopBar />
      </div>
    </div>
    <ProductComp products={favorites} title="Favorites" />
    </div>
   );
}
 
export default Favorites;