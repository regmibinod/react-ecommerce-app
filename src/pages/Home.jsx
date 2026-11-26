import { useState, useEffect } from "react";
import "../styles/home.css";
import Products from "./Products";


function Home() {



  
  return (
    <div>
      <h1>Welcome to ShopZone</h1>
      <p>Discover amazing products at great prices.</p>

       <Products />
    </div>
  );
}

export default Home;
