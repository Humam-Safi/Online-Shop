import { useContext, useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import { Card, Col, Container, Row } from "react-bootstrap";
import { FaCartPlus, FaStar, FaHeart } from "react-icons/fa";
import SkeletonComp from "../Skeleton/skeleton";
import { useNavigate } from "react-router-dom";
import { Search } from "../../../context/SearchContext";

const ProductComp = (props) => {
  const [prod, setProd] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    return savedFavorites.map((fav) => fav.id);
  });

  const navigate = useNavigate();

  const { search } = useContext(Search);

  useEffect(() => {
    Axios.get(`${props.api}`)
      .then((data) => {
        setProd(data.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);
  const prods = props.products || prod;

  const dataMapped =
    search.length > 0
      ? prods.filter((product) =>
          product.title.toLowerCase().includes(search.toLowerCase())
        )
      : prods;

  const handleAddToCart = (id) => {
    const getCart = JSON.parse(localStorage.getItem("cart")) || [];
    const productToAdd = (props.products || prod).find((p) => p.id === id);
    getCart.push(productToAdd);
    localStorage.setItem("cart", JSON.stringify(getCart));

    // Show success message
    const successMessage = document.createElement("div");
    successMessage.textContent = "Item Added To Cart!";
    successMessage.style.position = "fixed";
    successMessage.style.top = "20px";
    successMessage.style.left = "50%";
    successMessage.style.transform = "translateX(-50%)";
    successMessage.style.backgroundColor = "#2ecc71";
    successMessage.style.color = "white";
    successMessage.style.padding = "10px 20px";
    successMessage.style.borderRadius = "5px";
    successMessage.style.zIndex = "1000";
    successMessage.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";

    document.body.appendChild(successMessage);

    setTimeout(() => {
      successMessage.style.opacity = "0";
      successMessage.style.transition = "opacity 0.5s ease";
      setTimeout(() => {
        document.body.removeChild(successMessage);
      }, 500);
    }, 2000);
  };

  const handleFavorite = (id) => {
    setFavorites((prev) => {
      if (prev.includes(id)) {
        return prev.filter((favId) => favId !== id);
      } else {
        return [...prev, id];
      }
    });
    const getFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const productIndex = getFavorites.findIndex((p) => p.id === id);

    if (productIndex === -1) {
      const favoriteToAdd = (props.products || prod).find((p) => p.id === id);
      getFavorites.push(favoriteToAdd);
    } else {
      getFavorites.splice(productIndex, 1);
    }

    localStorage.setItem("favorites", JSON.stringify(getFavorites));
  };

  return (
    <Container className="py-5">
      <div className="d-flex align-items-center justify-content-center py-5">
        <h1
          style={{
            background: "linear-gradient(45deg, #001f3f, #003366)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: "bold",
            textAlign: "center",
            margin: "0 10px",
            wordWrap: "break-word",
          }}
        >
          {props.title}
        </h1>
      </div>
      {loading ? (
        <div className="d-flex">
          <SkeletonComp length={4} height="500px" />
        </div>
      ) : (
        <Row style={{ cursor: "pointer" }} className="g-4">
          {dataMapped.length > 0 ? dataMapped.map((product) => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                className="h-100 p-3"
                style={{
                  transition: "all 0.3s ease",
                  transform: "translateY(0)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 20px rgba(0,0,0,0.2)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  className="position-relative"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <Card.Img
                    className="product-image"
                    style={{
                      height: "250px",
                      objectFit: "contain",
                      borderRadius: "10px 10px 0 0",
                      backgroundColor: "#fff",
                    }}
                    src={product.images[0].image}
                    alt={product.title}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      zIndex: 2,
                    }}
                  >
                    <FaHeart
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFavorite(product.id);
                      }}
                      style={{
                        fontSize: "24px",
                        color: favorites.includes(product.id)
                          ? "#ff005a"
                          : "#ffffff",
                        filter: "drop-shadow(5px 5px 4px rgba(0,0,0,0.4))",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                  {product.discount > 0 && (
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        background: "#ff005a",
                        color: "white",
                        padding: "5px 10px",
                        borderRadius: "20px",
                        fontSize: "14px",
                      }}
                    >
                      {Math.round((product.discount / product.price) * 100)}%
                      OFF
                    </div>
                  )}
                </div>

                <Card.Body
                  className="d-flex flex-column"
                  style={{ background: "#f8f9fa" }}
                >
                  <Card.Title
                    className="text-center mb-3"
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: "600",
                      color: "#2c3e50",
                    }}
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    {product.title}
                  </Card.Title>

                  <div className="d-flex justify-content-center align-items-center gap-3 mb-3">
                    <span
                      style={{
                        fontSize: "1.4rem",
                        color: "#2ecc71",
                        fontWeight: "bold",
                      }}
                    >
                      ${product.price - product.discount}
                    </span>
                    {product.discount > 0 && (
                      <span
                        style={{
                          color: "#95a5a6",
                          textDecoration: "line-through",
                        }}
                      >
                        ${product.price}
                      </span>
                    )}
                  </div>

                  <div className="text-center mb-3">
                    <div className="d-flex align-items-center justify-content-center gap-2">
                      <span style={{ color: "#7f8c8d" }}>Rating:</span>
                      <div className="d-flex">
                        {[...Array(Number(product.rating))].map((_, index) => (
                          <FaStar key={index} color="#f1c40f" />
                        ))}
                        {[...Array(5 - Number(product.rating))].map(
                          (_, index) => (
                            <FaStar key={`unfilled-${index}`} color="#bdc3c7" />
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product.id);
                    }}
                    className="mt-auto w-100 border-0 py-2 rounded"
                    style={{
                      background: "linear-gradient(45deg, #001f3f, #003366)",
                      color: "white",
                      transition: "all 0.3s ease",
                      whiteSpace: "nowrap",
                      minWidth: "fit-content",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = "scale(1.02)";
                      e.target.style.boxShadow =
                        "0 8px 20px rgba(0, 31, 63, 0.4)";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = "scale(1)";
                      e.target.style.boxShadow =
                        "0 5px 15px rgba(0, 31, 63, 0.3)";
                    }}
                  >
                    <div
                      className="d-flex align-items-center justify-content-center gap-2"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      <span>Add to Cart</span>
                      <FaCartPlus fontSize="18px" />
                    </div>
                  </button>
                </Card.Body>
              </Card>
            </Col>
          )) : <div className="d-flex justify-content-center align-items-center" style={{ height: "100px" }}>
            <h1 className="text-muted">The Local Server Is Not Running</h1>
          </div>}
        </Row>
      )}
    </Container>
  );
};

export default ProductComp;
