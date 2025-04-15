import { Container } from "react-bootstrap";
import TopBar from "../topBar";
import CategoryComp from "./CategoryComp";

const CategoriesPage = () => {
  return (
    <div className="container">
      <div>
        <CategoryComp limit={100000} showAll={false} />
      </div>
    </div>
  );
};

export default CategoriesPage;
