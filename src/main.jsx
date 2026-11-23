import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContex.jsx";
import { FavouriteProvider } from "./context/FavouriteContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/products">
      <CartProvider>
        <FavouriteProvider>
          <App />
        </FavouriteProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
);
