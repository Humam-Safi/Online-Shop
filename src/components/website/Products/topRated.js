import { TopRatedApi } from "../../../Api/Api";
import ProductComp from "./productsComp";


const TopRated = () => {
 return <ProductComp api={TopRatedApi} title="Top Rated Products"/>
};

export default TopRated;
