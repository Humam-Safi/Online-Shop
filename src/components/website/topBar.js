import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Logo from "../Logo";
import { Axios } from "../../Api/axios";
import { CAT } from "../../Api/Api";
import SearchContext, { SearchCont } from "../../context/SearchContext";
import { useLocation } from "react-router-dom";

const Topbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { setSearch } = useContext(SearchCont);
  setSearch(searchQuery);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setCartCount(cart.length);
    setFavoritesCount(favorites.length);
  }, []);

  useEffect(() => {
    Axios.get(`${CAT}?limit=8`)
      .then((data) => {
        setCategories(data.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="topbar">
        <div className="top-section">
          <div className="logo">
            <Logo />
          </div>

          <div className={`menu ${isMenuOpen ? "open" : ""}`}>
            <Link
              to="/"
              className={`menu-item ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              HOME
            </Link>
            <Link
              to="/collections"
              className={`menu-item ${
                location.pathname === "/collections" ? "active" : ""
              }`}
            >
              COLLECTIONS
            </Link>
            <Link
              to="/about"
              className={`menu-item ${
                location.pathname === "/about" ? "active" : ""
              }`}
            >
              ABOUT
            </Link>
            <Link
              to="/contact"
              className={`menu-item ${
                location.pathname === "/contact" ? "active" : ""
              }`}
            >
              CONTACT
            </Link>
            <div className="mobile-icons">
              <Link to="/favorites" className="menu-item">
                <FaHeart />
                {favoritesCount > 0 && (
                  <span className="badge">{favoritesCount}</span>
                )}
              </Link>
              <Link to="/cart" className="menu-item">
                <FaShoppingCart />
                {cartCount > 0 && <span className="badge">{cartCount}</span>}
              </Link>
              <Link to="/profile" className="menu-item">
                <FaUser />
              </Link>
            </div>
          </div>

          <div className={`actions ${isMenuOpen ? "open" : ""}`}>
            <Link to="/favorites" className="iconss desktop-only">
              <FaHeart />
              {favoritesCount > 0 && (
                <span className="badge">{favoritesCount}</span>
              )}
            </Link>
            <Link to="/cart" className="iconss desktop-only">
              <FaShoppingCart />
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </Link>
            <Link to="/profile" className="iconss desktop-only">
              <FaUser />
            </Link>
            <button
              className="menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
        <div className={`search-section ${isMenuOpen ? "hidden" : ""}`}>
          <div className="search-container">
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button
                type="submit"
                onClick={() => navigate("/search")}
                className="search-button"
              >
                <FaSearch />
              </button>
            </form>
          </div>
        </div>
        <div className="categories-bar">
          <div className="categories-container">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="category-item"
              >
                {category.title}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .topbar {
          position: relative;
          width: 100%;
          z-index: 1000;
          background: #232f3e;
        }

        .top-section {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0.5rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
        }

        .logo {
          flex: 1;
        }

        .menu {
          flex: 2;
          display: flex;
          justify-content: center;
          gap: 2.5rem;
        }

        .menu-item {
          color: white;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 1px;
          position: relative;
          padding: 0.5rem 0;
        }

        .menu-item::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: white;
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        .menu-item:hover::after,
        .menu-item.active::after {
          width: 100%;
        }

        .menu-item.active {
          color: #febd69;
        }

        .menu-item.active::after {
          background: #febd69;
        }

        .actions {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 1.5rem;
        }

        .search-section {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0.5rem 2rem;
          display: flex;
          justify-content: center;
        }

        .search-container {
          position: relative;
          width: 60%;
        }

        .search-form {
          display: flex;
          align-items: center;
        }

        .search-input {
          padding: 0.5rem 1rem;
          padding-right: 2.5rem;
          border: none;
          border-radius: 4px;
          outline: none;
          transition: all 0.3s ease;
          width: 100%;
          font-size: 0.9rem;
          background: white;
        }

        .search-button {
          position: absolute;
          right: 0;
          height: 100%;
          padding: 0 1rem;
          background: #febd69;
          border: none;
          border-radius: 0 4px 4px 0;
          color: #232f3e;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .search-button:hover {
          background: #f3a847;
        }

        .categories-bar {
          background: #131921;
          padding: 0.5rem 0;
        }

        .categories-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .category-item {
          color: white;
          text-decoration: none;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .category-item:hover {
          color: #febd69;
        }

        .iconss {
          color: white;
          font-size: 1.2rem;
          position: relative;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .iconss:hover {
          color: #febd69;
        }

        .badge {
          position: absolute;
          top: -11px;
          right: -8px;
          background: #febd69;
          color: #232f3e;
          font-size: 0.7rem;
          padding: 2px 6px;
          border-radius: 10px;
          min-width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .menu-toggle {
          display: none;
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0;
        }

        .mobile-icons {
          display: none;
        }

        .desktop-only {
          display: flex;
        }

        .search-section.hidden {
          display: none;
        }

        @media (max-width: 992px) {
          .menu {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: #232f3e;
            flex-direction: column;
            align-items: center;
            padding: 2rem;
            gap: 1.5rem;
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
          }

          .menu.open {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
          }

          .menu-toggle {
            display: block;
          }
        }

        @media (max-width: 768px) {
          .search-section {
            padding: 0.5rem 1rem;
          }

          .search-container {
            width: 100%;
          }

          .categories-container {
            padding: 0 1rem;
            gap: 1rem;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .categories-container::-webkit-scrollbar {
            display: none;
          }
        }

        @media (max-width: 446px) {
          .desktop-only {
            display: none;
          }

          .mobile-icons {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px solid #e0e0e0;
          }

          .mobile-icons .menu-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .mobile-icons .badge {
            position: static;
            margin-left: 0.5rem;
          }
        }
      `}</style>
    </>
  );
};

export default Topbar;
