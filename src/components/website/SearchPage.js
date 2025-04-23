import { useContext, useEffect, useState } from "react";
import SearchContext, { SearchCont } from "../../context/SearchContext";
import { Axios } from "../../Api/axios";
import { PROD } from "../../Api/Api";
import ProductComp from "./Products/productsComp";

const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { search } = useContext(SearchCont);

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

  const mappedDate = products.filter((product)=>(
    product.title.toLowerCase().includes(search.toLowerCase()) && !product.title.includes("dummy") 
  ))
  console.log(mappedDate)

  console.log(mappedDate)

  return (
    <div className="container">
      {
        <ProductComp products={mappedDate}  />}
    </div>
  );
};

export default SearchPage;
