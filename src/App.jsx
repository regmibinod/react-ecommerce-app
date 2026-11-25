import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Favourites from "./pages/Favourites";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderHistory from "./pages/OrderHistory";
import OrderDetails from "./pages/orderdetails";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orderconfirmation" element={<OrderConfirmation />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
      </Routes>
    </>
  );
}

export default App;
