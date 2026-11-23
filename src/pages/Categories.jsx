
import "../styles/categories.css"
function Categories() {
  const categoriesList = [
    {
      name: "Jewellery",
      description:
        "Discover elegant rings, necklaces, bracelets, and accessories for every occasion.",
      icon: "💎",
    },
    {
      name: "Men's Clothing",
      description:
        "Explore stylish shirts, jackets, jeans, and fashion essentials for men.",
      icon: "👔",
    },
    {
      name: "Electronics",
      description:
        "Browse the latest gadgets, smartphones, laptops, and electronic accessories.",
      icon: "💻",
    },
    {
      name: "Women's Clothing",
      description:
        "Find trendy dresses, tops, footwear, and fashion collections for women.",
      icon: "👗",
    },
  ];

  return (
    <div className="category-container">
      <h1>Shop by Category</h1>
      <p>Explore our wide range of product categories.</p>

      <div className="category-grid">
        {categoriesList.map((category) => (
          <div className="category-card" key={category.name}>
            <span className="category-icon">{category.icon}</span>
            <h2>{category.name}</h2>
            <p>{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;