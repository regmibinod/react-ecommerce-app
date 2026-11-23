import "../styles/about.css"

function About() {
  return (
    <div className="about-container">
      <h1>About Us</h1>

      <p>
        Welcome to React E-Commerce, your one-stop destination for quality
        products at affordable prices. Our mission is to provide a seamless and
        enjoyable online shopping experience for customers worldwide.
      </p>

      <p>
        This project is built using React, React Router, Context API, and modern
        web technologies to demonstrate a fully functional eCommerce
        application. Users can browse products, search items, filter by
        category, view product details, manage their cart, and save favorite
        products.
      </p>

      <h2>What We Offer</h2>
      <ul>
        <li>Wide range of products</li>
        <li>Easy product search and filtering</li>
        <li>Product detail pages</li>
        <li>Shopping cart functionality</li>
        <li>Favorites/Wishlist feature</li>
        <li>Responsive design for all devices</li>
      </ul>

      <h2>Our Vision</h2>
      <p>
        We aim to make online shopping simple, fast, and accessible while
        continuously improving the user experience through modern web
        development practices.
      </p>
    </div>
  );
}

export default About;