import { IoIosSearch } from "react-icons/io";
import { FaBars, FaCartPlus, FaRegHeart, FaHome } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import User from "./User";
import { Search} from "../../context/SearchContext";

const TopBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { setSearch } = useContext(Search);


  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchVisible((prev) => !prev);
    setIsMobileMenuOpen(false);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSearch(value); // Send to context
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setSearch(searchTerm); // Save the search text to context
      setIsSearchVisible(false); // Hide the search overlay
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSearch(suggestion);
    setIsSearchVisible(false);
  };

  const MenuItem = ({ icon: Icon, label, onClick, color }) => (
    <div className="d-flex align-items-center gap-3" onClick={onClick}>
      <Icon fontSize="22px" color={color} cursor="pointer" />
      {label && <span>{label}</span>}
    </div>
  );

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between py-4 flex-md-row">
        <div className="title mb-3 mb-md-0">
          <h2 className="mt-3">E-Commerce</h2>
        </div>

        {/* Desktop Menu */}
        <div className="d-none d-md-flex gap-3 mt-3 mt-md-0 justify-content-center">
          <MenuItem
            icon={FaHome}
            onClick={() => navigate("/")}
            color="#ff005a"
          />
          <MenuItem icon={IoIosSearch} onClick={toggleSearch} />
          <MenuItem
            icon={FaRegHeart}
            onClick={() => navigate("/favorites")}
            color="red"
          />
          <MenuItem
            icon={FaCartPlus}
            onClick={() => navigate("/cart")}
            color="aqua"
          />
          <User />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="d-md-none d-flex align-items-center">
          <FaBars
            fontSize="22px"
            cursor="pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>
      </div>

      {/* Mobile Menu Sidebar */}
      <div
        className={`mobile-menu position-fixed top-0 end-0 h-100 bg-white shadow p-4 ${
          isMobileMenuOpen ? "show" : ""
        }`}
        style={{
          width: "250px",
          transform: isMobileMenuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease-in-out",
          zIndex: 1000,
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="m-0">Menu</h5>
          <MdOutlineCancel
            fontSize="22px"
            cursor="pointer"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        </div>

        <div className="d-flex flex-column gap-4">
          <MenuItem
            icon={FaHome}
            label="Home"
            onClick={() => handleNavigation("/")}
            color="#ff005a"
          />
          <MenuItem icon={IoIosSearch} label="Search" onClick={toggleSearch} />
          <MenuItem
            icon={FaRegHeart}
            label="Favorites"
            onClick={() => handleNavigation("/favorites")}
            color="red"
          />
          <MenuItem
            icon={FaCartPlus}
            label="Cart"
            onClick={() => handleNavigation("/cart")}
            color="aqua"
          />
          <div className="d-flex align-items-center gap-3">
            <User />
            <span>Profile</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div 
        className={`search-overlay ${isSearchVisible ? 'show' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: isSearchVisible ? 'flex' : 'none',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1100,
          backdropFilter: 'blur(5px)'
        }}
      >
        <div 
          className="search-container"
          style={{
            width: '80%',
            maxWidth: '600px',
            position: 'relative',
            animation: isSearchVisible ? 'slideDown 0.3s ease-out' : 'none'
          }}
        >
          <div className="search-wrapper position-relative">
            <IoIosSearch 
              className="position-absolute"
              style={{
                left: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '24px',
                color: '#666'
              }}
            />
            <input 
              value={searchTerm}
              onChange={handleSearch}
              onKeyPress={handleKeyPress}
              className="form-control py-3 ps-5 pe-5"
              type="text" 
              placeholder="What are you looking for?"
              style={{
                borderRadius: '50px',
                border: '2px solid #fff',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                fontSize: '18px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease'
              }}
            />
            <MdOutlineCancel
              className="position-absolute"
              style={{
                right: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '24px',
                color: '#666',
                cursor: 'pointer'
              }}
              onClick={() => {
                setIsSearchVisible(false);
                setSearchTerm("");
                setSearch("");
              }}
            />
          </div>
          <div 
            className="search-suggestions mt-3 p-3"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '15px',
              display: searchTerm ? 'block' : 'none'
            }}
          >
            <p className="text-muted mb-2">Popular Searches</p>
            <div className="suggestion-tags d-flex flex-wrap gap-2">
              <span 
                className="badge bg-light text-dark p-2" 
                style={{cursor: 'pointer'}}
                onClick={() => handleSuggestionClick('Electronics')}
              >
                Electronics
              </span>
              <span 
                className="badge bg-light text-dark p-2"
                style={{cursor: 'pointer'}}
                onClick={() => handleSuggestionClick('Fashion')}
              >
                Fashion
              </span>
              <span 
                className="badge bg-light text-dark p-2"
                style={{cursor: 'pointer'}}
                onClick={() => handleSuggestionClick('Home & Garden')}
              >
                Home & Garden
              </span>
              <span 
                className="badge bg-light text-dark p-2"
                style={{cursor: 'pointer'}}
                onClick={() => handleSuggestionClick('Books')}
              >
                Books
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .search-container input:focus {
            border-color: #007bff;
            box-shadow: 0 4px 20px rgba(0, 123, 255, 0.25);
            outline: none;
          }
        `}
      </style>
    </div>
  );
};

export default TopBar;
