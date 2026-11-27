import { Link } from "react-router-dom";
import "../styles/about.css";

function About() {
  const features = [
    {
      icon: "🛍️",
      title: "Product Discovery",
      description:
        "Browse products, explore categories, search items and sort products to find exactly what you need.",
    },
    {
      icon: "❤️",
      title: "Favourites",
      description:
        "Save your favourite products and easily access them whenever you return.",
    },
    {
      icon: "🛒",
      title: "Shopping Cart",
      description:
        "Add products, update quantities, remove items and manage your shopping cart.",
    },
    {
      icon: "📦",
      title: "Order Management",
      description:
        "Complete the checkout process, view order history and track order statuses.",
    },
    {
      icon: "⚙️",
      title: "Admin Dashboard",
      description:
        "Explore administrative features for managing orders and monitoring store activity.",
    },
    {
      icon: "📱",
      title: "Responsive Experience",
      description:
        "Enjoy a clean and accessible shopping experience across desktop, tablet and mobile devices.",
    },
  ];

  const technologies = [
    "React.js",
    "JavaScript",
    "React Router",
    "Context API",
    "HTML5",
    "CSS3",
    "Axios",
    "LocalStorage",
    "REST API",
    "Git & GitHub",
  ];

  return (
    <div className="about-page">
      {/* Introduction section */}
      <section className="about-hero">
        <span className="about-label">GET TO KNOW OUR PROJECT</span>

        <h1>
          About <span>BinodShopZone</span>
        </h1>

        <p>
          A modern React-based e-commerce application designed to deliver a
          simple, convenient and enjoyable online shopping experience.
        </p>

        <Link to="/products" className="about-button">
          Explore Products →
        </Link>
      </section>

      {/* Project introduction */}
      <section className="about-introduction">
        <div>
          <span className="about-section-label">OUR PROJECT</span>
          <h2>Shopping Made Simple</h2>

          <p>
            BinodShopZone is a full-featured e-commerce demonstration
            application built to explore modern front-end development
            practices.
          </p>

          <p>
            Customers can discover products, search and filter collections,
            view product details, manage shopping carts, save favourites and
            place simulated orders.
          </p>

          <p>
            The application also includes an administrative dashboard
            demonstrating product and order management capabilities.
          </p>
        </div>

        <div className="about-highlight">
          <span>💻</span>
          <h3>Built with Modern Web Technologies</h3>
          <p>
            Focused on reusable components, application state management,
            routing and persistent data.
          </p>
        </div>
      </section>

      {/* Application features */}
      <section className="about-features">
        <div className="about-section-heading">
          <span className="about-section-label">APPLICATION FEATURES</span>
          <h2>What You Can Explore</h2>
          <p>Discover the main features available in BinodShopZone.</p>
        </div>

        <div className="about-feature-grid">
          {features.map((feature) => (
            <div className="about-feature-card" key={feature.title}>
              <span>{feature.icon}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technologies used */}
      <section className="about-technologies">
        <div className="about-section-heading">
          <span className="about-section-label">TECHNOLOGY STACK</span>
          <h2>Technologies Behind the Project</h2>
          <p>
            Built using modern tools and technologies for front-end
            development.
          </p>
        </div>

        <div className="technology-list">
          {technologies.map((technology) => (
            <span className="technology-badge" key={technology}>
              {technology}
            </span>
          ))}
        </div>
      </section>

      {/* Closing section */}
      <section className="about-vision">
        <h2>Our Vision</h2>

        <p>
          Our goal is to continuously improve the shopping experience while
          exploring modern web technologies, clean code practices and
          scalable application architecture.
        </p>

        <Link to="/categories" className="about-button">
          Explore Categories →
        </Link>
      </section>
    </div>
  );
}

export default About;