
import {Routes,Route} from "react-router-dom";
import Navbar from "./componesnts/Navbar";
import Home  from "./pages/Home";
import Products from "./pages/Product";
import Categories from "./pages/Categories";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Favourites from "./pages/Favourites";
function App() {
  return (
    <>

    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/about" element={<About />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/favourites" element={<Favourites />} />
      
    </Routes>
     
    </>
  );
}

export default App;
