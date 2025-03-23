import { Container } from "react-bootstrap";
import TopBar from "../topBar";
import CategoryComp from "./CategoryComp";

const CategoriesPage = () => {


  return (
    <div>
    <div className="home">
      <div className="container">
        <TopBar />
      </div>
    </div>
    <div>

      <CategoryComp limit={100000} showAll={false} />  
    </div>
    </div>
    
  );
}
 
export default CategoriesPage;