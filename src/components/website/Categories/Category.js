import { useState } from "react";
import { useParams } from "react-router-dom";
import { Axios } from "../../../Api/axios";
import { CAT, PROD } from "../../../Api/Api";
import { useEffect } from "react";
import TopBar from "../topBar";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaStar, FaCartPlus } from "react-icons/fa";
import SkeletonComp from "../Skeleton/skeleton";
import { useNavigate } from "react-router-dom";
import ProductsComp from "../Products/productsComp";
const Category = () => {
  const { id } = useParams();
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`${CAT}`)
      .then((data) => {
        setCats(data.data.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!loading && cats.length > 0) {
      const foundCategory = cats.find((cat) => cat.id === Number(id));
      setCategory(foundCategory);
      
      // Get products for this category
      Axios.get(`${PROD}`)
        .then((data) => {
          const categoryProducts = data.data.filter(
            (prod) => prod.category === foundCategory.id
          );
          setProducts(categoryProducts);
        })
        .catch((err) => console.log(err));
    }
  }, [loading, cats, id]);
  console.log(products);
  console.log(category);

  return (
    <div>
      <div className="home">
        <div className="container">
          <TopBar />
        </div>
      </div>
      <div>
        <div className="container py-4">
          <h2 
            style={{
              background: "linear-gradient(45deg, #ff005a, #ff5d2d)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "2rem",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "2rem"
            }}
          >
            Category: {category?.title}
          </h2>
        </div>
        <ProductsComp products={products} title="Related Products"/>  
      </div>
    </div>
  );  
};

export default Category;
