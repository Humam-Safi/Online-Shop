import { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import TopBar from "./topBar";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items);
  }, []);

  const handleRemoveFromCart = (id) => {
    const cartItemIndex = cartItems.findIndex((item) => item.id === id);
    if (cartItemIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart.splice(cartItemIndex, 1);
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  return (
    <div>
      <div className="container"></div>
      <Container className="py-5">
        <h1
          className="text-center mb-5"
          style={{
            background: "linear-gradient(45deg, #001f3f, #003366)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: "2.5rem",
            fontWeight: "bold",
          }}
        >
          Your Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center">
            <h3 className="text-muted">Your cart is empty</h3>
          </div>
        ) : (
          <Row className="g-4">
            {cartItems.map((item, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={3}>
                <Card
                  className="h-100 border-0 shadow-sm"
                  style={{
                    transition: "all 0.3s ease",
                    transform: "translateY(0)",
                    boxShadow: "3px 9px 25px rgba(0, 0, 0, 0.15) !important",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow =
                      "0 15px 30px rgba(0,0,0,0.2)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 5px 15px rgba(0,0,0,0.15)";
                  }}
                >
                  <div className="position-relative">
                    <Card.Img
                      variant="top"
                      src={item.images[0].image}
                      style={{
                        height: "200px",
                        objectFit: "contain",
                        borderRadius: "10px 10px 0 0",
                      }}
                    />
                  </div>
                  <Card.Body className="text-center">
                    <Card.Title
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: "600",
                        color: "#2c3e50",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {item.title}
                    </Card.Title>
                    <div className="d-flex justify-content-center align-items-center gap-2">
                      <span className="text-success fw-bold">
                        ${item.price - item.discount}
                      </span>
                      {item.discount > 0 && (
                        <span className="text-muted text-decoration-line-through">
                          ${item.price}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        handleRemoveFromCart(item.id);
                      }}
                      className="mt-3 w-100 border-0 py-2 rounded"
                      style={{
                        background: "linear-gradient(45deg, #001f3f, #003366)",
                        color: "white",
                        transition: "all 0.3s ease",
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
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <span>Remove from Cart</span>
                      </div>
                    </button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Cart;
