import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/website/HomePage";
import Login from "./pages/Auth/AuthOperations/login";
import Register from "./pages/Auth/AuthOperations/Register";
import Users from "./pages/dashboard/Users/Users";
import GoogleCallBack from "./pages/Auth/AuthOperations/GoogleCallBack";
import DashBoard from "./pages/dashboard/dashBoard";
import RequierAuth from "./pages/Auth/Protecting/RequierAuth";
import User from "./pages/dashboard/Users/User";
import AddUsers from "./pages/dashboard/Users/addUser";
import Writer from "./pages/dashboard/writer";
import Err404 from "./pages/Auth/Errors/404";
import RequierBack from "./pages/Auth/Protecting/RequierBack";
import Categories from "./pages/dashboard/Category/categories";
import AddCategory from "./pages/dashboard/Category/AddCategory";
import EditCategory from "./pages/dashboard/Category/EditCategory";
import Products from "./pages/dashboard/Products/products";
import AddProduct from "./pages/dashboard/Products/Addproduct";
import EditProduct from "./pages/dashboard/Products/EditProduct";
import ProductPage from "./components/website/Products/productPage";
import CategoriesPage from "./components/website/Categories/categoriesPage";
import Category from "./components/website/Categories/Category";
import Cart from "./components/website/Cart";
import Favorites from "./components/website/Favorites";
import TopBar from "./components/dashboard/TopBar";
import Topbar from "./components/website/topBar";
import Profile from "./components/website/User";
import SearchPage from "./components/website/SearchPage";
import About from "./pages/About";
import Collections from "./pages/Collections";
import Contact from "./pages/Contact";

function App() {
  return (
    <div className="app">
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <>
              <Topbar />
              <HomePage />
            </>
          }
        />
        <Route
          path="/product/:id"
          element={
            <>
              <Topbar />
              <ProductPage />
            </>
          }
        />
        <Route
          path="/categories"
          element={
            <>
              <Topbar />
              <CategoriesPage />
            </>
          }
        />
        <Route
          path="/category/:id"
          element={
            <>
              <Topbar />
              <Category />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Topbar />
              <Cart />
            </>
          }
        />
        <Route
          path="/favorites"
          element={
            <>
              <Topbar />
              <Favorites />
            </>
          }
        />
        <Route
          path="/search"
          element={
            <>
              <Topbar />
              <SearchPage />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Topbar />
              <About />
            </>
          }
        />
        <Route
          path="/collections"
          element={
            <>
              <Topbar />
              <Collections />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Topbar />
              <Contact />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Profile />
            </>
          }
        />

        {/* Auth Routes */}
        <Route element={<RequierBack />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/auth/google/callback" element={<GoogleCallBack />} />
        <Route path="/*" element={<Err404 />} />

        {/* Protected Dashboard Routes */}
        <Route element={<RequierAuth allowedRole={["1995", "1997", "1999"]} />}>
          <Route path="/dashboard" element={<DashBoard />}>
            {/* Admin Only Routes */}
            <Route element={<RequierAuth allowedRole={["1995"]} />}>
              <Route path="users" element={<Users />} />
              <Route path="users/:id" element={<User />} />
              <Route path="user/add" element={<AddUsers />} />
            </Route>

            {/* Admin and Editor Routes */}
            <Route element={<RequierAuth allowedRole={["1995", "1999"]} />}>
              <Route path="categories" element={<Categories />} />
              <Route path="categories/:id" element={<EditCategory />} />
              <Route path="category/add" element={<AddCategory />} />
              <Route path="products" element={<Products />} />
              <Route path="product/add" element={<AddProduct />} />
              <Route path="products/:id" element={<EditProduct />} />
            </Route>

            {/* Admin and Writer Routes */}
            <Route element={<RequierAuth allowedRole={["1997", "1995"]} />}>
              <Route path="writer" element={<Writer />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
