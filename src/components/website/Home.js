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
    <div className="home">
      <div className="banner-section">
        <Banner />
      </div>
      <div className="content-section">
        <FeaturedCategory />
        <Products />
        <TopRated />
        <LastProducts />
      </div>
      <Footer />

      <style jsx>{`
        .home {
          width: 100%;
          overflow-x: hidden;
        }

        .banner-section {
          width: 100%;
          height: 60vh;
          position: relative;
          background: black;
        }

        .content-section {
          position: relative;
          z-index: 1;
          background: white;
          padding-top: 2rem;
        }

        @media (max-width: 768px) {
          .banner-section {
            height: 40vh;
          }
        }
      `}</style>
    </div>
  );
};

export default HomeComponent;
