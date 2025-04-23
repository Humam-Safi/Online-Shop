import React, { useState, useEffect } from "react";
import { Axios } from "../Api/axios";
import { PROD } from "../Api/Api";
import ProductComp from "../components/website/Products/productsComp";
import { FaCartPlus, FaHeart, FaStar } from "react-icons/fa";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Collections = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(PROD)
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const dataMapped = products.filter(
    (product) => !product.title.includes("dummy")
  );
  console.log(dataMapped);

  return <Container>{<ProductComp products={dataMapped} />}</Container>;
};

export default Collections;
