import { Latest } from "../../../Api/Api";
import ProductComp from "./productsComp";
const LastProducts = () => {
  return <ProductComp api={Latest} title="Latest Products" />;
};

export default LastProducts;
