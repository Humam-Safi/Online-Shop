import { useState, useEffect, useContext } from "react";
import { Axios } from "../../../Api/axios";
import { CAT } from "../../../Api/Api";
import { Card, Col, Container, Row } from "react-bootstrap";
import SkeletonComp from "../Skeleton/skeleton";
import { useNavigate } from "react-router-dom";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Search } from "../../../context/SearchContext";

const CategoryComp = (props) => {
  const [categ, setCateg] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();


  useEffect(() => {
    Axios.get(`${CAT}?limit=${props.limit}`)
      .then((data) => {
        setCateg(data.data.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);


  const dataMapped =  categ;

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
            marginBottom: "1rem"
          }}
        >
          Awesome Categories
        </h1>
      </div>
      {loading ? (
        <div className="d-flex">
          <SkeletonComp length={4} height="500px" />
        </div>
      ) : (
        <Row className="g-4">
          {dataMapped.length > 0 ? dataMapped.map((category) => (
            <Col key={category.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                className="h-100 border-0"
                style={{
                  borderRadius: "15px",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onClick={() => navigate(`/category/${category.id}`)}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow =
                    "0 15px 30px rgba(0,0,0,0.1)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    position: "relative",
                    height: "300px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Card.Img
                    style={{
                      width: "80%",
                      height: "80%",
                      objectFit: "contain",
                      transition: "transform 0.3s ease",
                    }}
                    src={category.image}
                    alt={category.title}
                  />
                </div>
                <Card.Body
                  style={{
                    background: "linear-gradient(45deg, #001f3f, #003366)",
                    padding: "15px",
                  }}
                >
                  <Card.Title className="text-center text-white mb-0">
                    {category.title.length > 20 ? category.title.substring(0, 20) + "..." : category.title}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          )) : <div className="d-flex justify-content-center align-items-center" style={{ height: "100px" }}>
            <h1 className="text-muted">The Local Server Is Not Running</h1>
          </div>}
        </Row>
      )}
      {props.showAll && (
        <div
          className="d-flex align-items-center justify-content-end mt-4"
          onClick={() => navigate("/categories")}
          style={{
            cursor: "pointer",
            color: " #001f3f",
            transition: "all 0.3s ease",
            animation: "moveLeftRight 2s ease-in-out infinite"
          }}
        >
          <span style={{ fontSize: "1.2rem", fontWeight: "500" }}>
            Show All
          </span>
          <MdKeyboardDoubleArrowRight
            fontSize="28px" 
            style={{ marginLeft: "8px" }}
          />
          <style>
            {`
              @keyframes moveLeftRight {
                0%, 100% { transform: translateX(0); }
                50% { transform: translateX(10px); }
              }
            `}
          </style>
        </div>
      )}
    </Container>
  );
};

export default CategoryComp;
