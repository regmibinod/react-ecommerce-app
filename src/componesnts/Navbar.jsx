import "../styles/navbar.css";

function Navbar() {
  return (
    <nav>
      <div className="logo">
        <h2>ABShopZone</h2>
      </div>
      <ul>
        <li>Home</li>
        <li>Products</li>
        <li>Categories</li>
        <li>About</li>
      </ul>

      <div className="nav-icons">
        <span>♡</span>
        <span>🛒</span>
      </div>
    </nav>
  );
}

export default Navbar;
