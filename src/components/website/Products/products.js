import { LatestSale } from "../../../Api/Api";
import ProductComp from "./productsComp";

const Products = () => {
  return <ProductComp api={LatestSale} title="Last Sale Products" />;
};

export default Products;
