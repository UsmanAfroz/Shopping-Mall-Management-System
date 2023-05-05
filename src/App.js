import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddProduct from "./pages/admin/AddProduct";
import AddShop from "./pages/admin/AddShop";
import AllAdminShops from "./pages/admin/AllAdminShops";
import Dashboard from "./pages/admin/Floors";
import AdminProducts from "./pages/admin/Products";
import Shops from "./pages/admin/Shops";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/user/Cart";
import ConfirmOrder from "./pages/user/confirmOrder";
import Home from "./pages/user/Home";
import ProductDetail from "./pages/user/ProductDetail";
import UserProduct from "./pages/user/products";
import AllShops from "./pages/user/shops";
import CustomerProducts from "./pages/user/customerProduct";
import ShopKeeperShops from "./pages/shopkeeper/allShopKeeperShops";
import ShopKeeperProducts from "./pages/shopkeeper/shopKeeperProducts";
import AdminProduct from "./pages/admin/Products";
import AllOrders from "./pages/shopkeeper/orders";
import ChangePassword from "./pages/user/changePassword"

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/shops" element={<Shops />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/addshop" element={<AddShop />} />
        <Route path="/allshops" element={<AllShops />} />
        <Route path="/shopKeeperShops" element={<ShopKeeperShops />} />
        <Route path="/allAdminShops" element={<AllAdminShops />} />
        <Route path="/adminProducts/:id" element={<AdminProducts />} />
        <Route path="/customerProducts" element={<CustomerProducts />} />
        <Route
          path="/shopKeeperProducts/:id"
          element={<ShopKeeperProducts />}
        />
        <Route path="/allShopKeeperOrders" element={<AllOrders />} />
        <Route path="/adminProduct" element={<AdminProduct />} />
        <Route path="/" element={<Home />} />
        <Route path="/userProducts/:id" element={<UserProduct />} />
        <Route path="/productDetail" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/confirmorder" element={<ConfirmOrder />} />
      </Routes>
    </>
  );
}

export default App;
