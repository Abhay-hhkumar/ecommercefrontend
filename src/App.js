import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/user/HomePage";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";

import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";

import PrivateRoute from "./components/Routes/Private";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminRoute from "./components/Routes/AdminRoute";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";

import Profile from "./pages/user/Profile";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";

import CartPage from "./pages/CartPage";
import Admins from "./pages/Admin/Admins";
import AdminsCart from "./pages/Admin/AdminsCart";
import ProductsPerPage from "./pages/Admin/ProductsPerPage";


function App() {
  return (
    <>
      <Routes>
        <Route    path = "/"                     element = {<HomePage       />} />
        
        <Route    path = "/product/:slug"        element = {<ProductDetails />} />        
        <Route    path = "/cart"                 element = {<CartPage       />} />      
        <Route    path = "/search"               element = {<Search         />} />

        <Route    path = "/dashboard"            element = {<PrivateRoute   />} >
           <Route path = "user"                  element = {<Dashboard      />} />         
           <Route path = "user/profile"          element = {<Profile        />} />
        </Route>

        <Route    path = "/dashboard"            element = {<AdminRoute      />} >
           <Route path = "admin"                 element = {<AdminDashboard  />} />
           <Route path = "admin/create-category" element = {<CreateCategory  />} />
           <Route path = "admin/create-product"  element = {<CreateProduct   />} />
           <Route path = "admin/product/:slug"   element = {<UpdateProduct   />} />
           <Route path = "admin/products"        element = {<Products        />} />
           <Route path = "admin/users"           element = {<Users           />} />
           <Route path = "admin/admins"          element = {<Admins          />} />
           <Route path = "admin/cart-items"      element = {<AdminsCart      />} />
           <Route path = "admin/products-per-page"      element = {<ProductsPerPage />} />
        </Route>

        <Route    path = "/register"             element = {<Register        />} />
        <Route    path = "/forgot-password"      element = {<ForgotPassword  />} />
        <Route    path = "/login"                element = {<Login           />} />
        <Route    path = "*"                     element = {<HomePage       />} />
      </Routes>
    </>
  );
}

export default App;