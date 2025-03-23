import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Banner from "../banner";
import TopBar from "../topBar";
import { useParams } from "react-router-dom";
import { PROD } from "../../../Api/Api";
import { useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import ImageGallery from "react-image-gallery";
import { FaCartPlus, FaStar } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";

const ProductPage = () => {
  const { id } = useParams();

  const [prods, setProds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [product, setProduct] = useState({});

  useEffect(() => {
    Axios.get(`${PROD}`)
      .then((data) => {
        setProds(data.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!loading && prods.length > 0) {
      const foundProduct = prods.find((prod) => prod.id === Number(id));
      setProduct(foundProduct);
      if (foundProduct?.images) {
        const mappedImages = foundProduct.images.map((img) => ({
          original: img.image,
          thumbnail: img.image,
        }));
        setImages(mappedImages);
      }
    }
  }, [loading, prods, id]);

  const handleAddToCart = (id) => {
    const getCart = JSON.parse(localStorage.getItem("cart")) || [];
    getCart.push(product);
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

  return (
    <div>
      <div className="home">
        <div className="container">
          <TopBar />
        </div>
      </div>
      <Container className="mt-5">
        <Row className="g-4">
          <Col md={6}>
            {loading ? (
              <Skeleton height={500} />
            ) : images.length > 0 ? (
              <ImageGallery
                items={images}
                showPlayButton={false}
                showFullscreenButton={false}
                showNav={false}
                showBullets={true}
                autoPlay={false}
                slideInterval={3000}
                slideDuration={450}
                style={{
                  maxHeight: "500px",
                  objectFit: "contain",
                  overflow: "hidden",
                }}
              />
            ) : (
              <div className="text-center">
                <p>Loading images...</p>
              </div>
            )}
          </Col>
          <Col md={6}>
            {loading ? (
              <Card className="border-0 h-100 position-relative">
                <Card.Body className="d-flex flex-column p-4">
                  <Skeleton height={50} width="80%" className="mb-3" />
                  <Skeleton height={30} width="40%" className="mb-4" />
                  <Skeleton height={100} className="mb-4" />
                  <Skeleton height={50} width="60%" className="mb-4" />
                  <Skeleton height={40} className="mb-4" />
                  <Skeleton height={50} />
                </Card.Body>
              </Card>
            ) : prods.length > 0 && (
              <Card className="border-0 h-100 position-relative">
                <Card.Body
                  className="d-flex flex-column p-4"
                  style={{ backgroundColor: "#f8f9fa", borderRadius: "15px" }}
                >
                  <div className="mb-4">
                    <h2
                      className="mb-3"
                      style={{
                        background: "linear-gradient(45deg, #ff005a, #ff5d2d)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontWeight: "bold",
                        fontSize: "2.5rem",
                      }}
                    >
                      {prods.find((prod) => prod.id === Number(id))?.title}
                    </h2>

                    {prods.find((prod) => prod.id === Number(id))?.discount >
                      0 && (
                      <span
                        className="badge"
                        style={{
                          background:
                            "linear-gradient(45deg, #ff005a, #ff5d2d)",
                          padding: "8px 15px",
                          borderRadius: "20px",
                          color: "white",
                          fontSize: "1rem",
                        }}
                      >
                        {Math.round(
                          (prods.find((prod) => prod.id === Number(id))
                            ?.discount /
                            prods.find((prod) => prod.id === Number(id))
                              ?.price) *
                            100
                        )}
                        % OFF
                      </span>
                    )}
                  </div>

                  <div
                    className="mb-4 p-3"
                    style={{
                      backgroundColor: "white",
                      borderRadius: "10px",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                    }}
                  >
                    <h4 className="mb-3" style={{ color: "#2c3e50" }}>
                      Description
                    </h4>
                    <p
                      className="lead"
                      style={{ color: "#34495e", lineHeight: "1.8" }}
                    >
                      {
                        prods.find((prod) => prod.id === Number(id))
                          ?.description
                      }
                    </p>
                  </div>

                  <div
                    className="mb-4 p-3"
                    style={{
                      backgroundColor: "white",
                      borderRadius: "10px",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                    }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <h3
                        className="m-0"
                        style={{
                          background:
                            "linear-gradient(45deg, #2ecc71, #27ae60)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          fontSize: "2.5rem",
                          fontWeight: "bold",
                        }}
                      >
                        $
                        {prods.find((prod) => prod.id === Number(id))?.price -
                          prods.find((prod) => prod.id === Number(id))
                            ?.discount}
                      </h3>
                      {prods.find((prod) => prod.id === Number(id))?.discount >
                        0 && (
                        <h5
                          className="m-0 text-decoration-line-through"
                          style={{ color: "#95a5a6", fontSize: "1.5rem" }}
                        >
                          ${prods.find((prod) => prod.id === Number(id))?.price}
                        </h5>
                      )}
                    </div>
                  </div>

                  <div
                    style={{
                      position: "sticky",
                      bottom: "20px",
                      backgroundColor: "white",
                      padding: "20px",
                      borderRadius: "10px",
                      boxShadow: "0 -5px 20px rgba(0,0,0,0.1)",
                    }}
                  >
                    <div className="mb-4 text-center">
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <span style={{ color: "#7f8c8d", fontSize: "1.1rem" }}>
                          Rating:
                        </span>
                        <div className="d-flex">
                          {[
                            ...Array(
                              Number(
                                prods.find((prod) => prod.id === Number(id))
                                  ?.rating
                              )
                            ),
                          ].map((_, index) => (
                            <FaStar key={index} color="#f1c40f" size={20} />
                          ))}
                          {[
                            ...Array(
                              5 -
                                Number(
                                  prods.find((prod) => prod.id === Number(id))
                                    ?.rating
                                )
                            ),
                          ].map((_, index) => (
                            <FaStar
                              key={`unfilled-${index}`}
                              color="#bdc3c7"
                              size={20}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddToCart(id)}
                      className="mt-auto w-100 border-0 py-2 rounded"
                      style={{
                        background: "linear-gradient(45deg, #ff005a, #ff5d2d)",
                        color: "white",
                        transition: "all 0.3s ease",
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = "scale(1.02)";
                        e.target.style.boxShadow =
                          "0 8px 20px rgba(255, 0, 90, 0.4)";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = "scale(1)";
                        e.target.style.boxShadow =
                          "0 5px 15px rgba(255, 0, 90, 0.3)";
                      }}
                    >
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <span>Add to Cart</span>
                        <FaCartPlus fontSize="18px" />
                      </div>
                    </button>
                  </div>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductPage;
