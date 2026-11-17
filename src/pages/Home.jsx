import { useState, useEffect } from "react";


function Home() {
  const [products, setProducts] = useState([]);
  const [sort, setSortItem] = useState("default");

  useEffect(() => {
   
  }, []);
  const filteredProducts = products.sort((a, b) => {
    if (sort === "hightolow") {
      return b.price - a.price;
    } else if (sort === "lowtohigh") {
      return a.price - b.price;
    }
    return 0;
  });
  return (
    <div>
      <h1>Welcome to ShopZone</h1>
      <p>Discover amazing products at great prices.</p>

      <div className="display">
        <div className="sleect">
          <label htmlFor="product">Product item</label>
          <select
            name="product"
            id="product"
            value={sort}
            onChange={(e) => setSortItem(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="lowtohigh">Low to high</option>
            <option value="hightolow">High t olow</option>
          </select>
        </div>
        <ul>
          {filteredProducts.map((item) => (
            <li>
              {item.name} Price is : <span>$ {item.price}</span>{" "}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
