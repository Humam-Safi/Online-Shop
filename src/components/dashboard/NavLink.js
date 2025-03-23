import {
  faCartPlus,
  faLayerGroup,
  faPenNib,
  faPlus,
  faUserPlus,
  faUsers
} from "@fortawesome/free-solid-svg-icons";
import { faTruckFast } from "@fortawesome/free-solid-svg-icons/faTruckFast";

export const Links = [
  {
    name: "Users",
    class: "d-flex align-items-center gap-3 mt-3 side-bar-link",
    to: "users",
    icon: faUsers,
    style: "padding: isOpen ? 10px 8px 10px 15px; :10px 13px",
    role: "1995"
  },
  {
    name: "Add User", 
    class: "d-flex align-items-center gap-3 mt-3 side-bar-link",
    to: "user/add",
    icon: faUserPlus,
    style: "padding: isOpen ? 10px 8px 10px 15px; :10px 13px",
    role: "1995"
  },
  {
    name: "Categories",
    class: "d-flex align-items-center gap-3 mt-3 side-bar-link", 
    to: "categories",
    icon: faLayerGroup,
    style: "padding: isOpen ? 10px 8px 10px 15px; :10px 13px",
    role: ["1995", "1999"]
  },
  {
    name: "Add Category",
    class: "d-flex align-items-center gap-3 mt-3 side-bar-link",
    to: "category/add", 
    icon: faPlus,
    style: "padding: isOpen ? 10px 8px 10px 15px; :10px 13px",
    role: ["1995", "1999"]
  },
  {
    name: "Products",
    class: "d-flex align-items-center gap-3 mt-3 side-bar-link",
    to: "products",
    icon: faTruckFast,
    style: "padding: isOpen ? 10px 8px 10px 15px; :10px 13px", 
    role: ["1995", "1999"]
  },
  {
    name: "Add Product",
    class: "d-flex align-items-center gap-3 mt-3 side-bar-link",
    to: "Product/add",
    icon: faCartPlus,
    style: "padding: isOpen ? 10px 8px 10px 15px; :10px 13px",
    role: ["1995", "1999"]
  },
  {
    name: "Writer",
    class: "d-flex align-items-center gap-3 mt-3 side-bar-link",
    to: "writer",
    icon: faPenNib,
    style: "padding: isOpen ? 10px 8px 10px 15px; :10px 13px",
    role: ["1995", "1997"]
  }
];
