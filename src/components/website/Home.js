import Banner from "./banner";
import FeaturedCategory from "./Categories/FeaturedCategory";
import LastProducts from "./Products/lastProducts";
import Products from "./Products/products";
import TopBar from "./topBar";
import TopRated from "./Products/topRated";
import Footer from "./footer";
import "./home.css";
const HomeComponent = () => {
  return (
    <div>
      <div className="home">
        <div className="container">
          
          <TopBar />
          <Banner />
        </div>
      </div>
      <FeaturedCategory />
      <Products />
      <TopRated />
      <LastProducts />
      <Footer />
    </div>
  );
};

export default HomeComponent;
