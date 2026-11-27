import { CartContext } from "../context/CartContex";
import { Link } from "react-router-dom";
import { useContext } from "react";
import "../styles/cart.css";

function Cart() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);

  // Calculate the total price of all products in the cart.
  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  // Format prices consistently in New Zealand dollars.
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-NZ", {
      style: "currency",
      currency: "NZD",
    }).format(price);

  // Display an empty-cart message when there are no products.
  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <div className="empty-cart-icon">🛒</div>

        <h1>Your Shopping Cart Is Empty</h1>

        <p>
          Looks like you haven't added anything to your cart yet.
          Explore our collection and find something you love!
        </p>

        <Link to="/products" className="cart-empty-btn">
          Start Shopping →
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      {/* Cart page heading */}
      <div className="cart-heading">
        <div>
          <h1>Your Shopping Cart</h1>
          <p>
            {cart.reduce((total, item) => total + item.quantity, 0)} items
            in your cart
          </p>
        </div>

        <Link to="/products" className="continue-shopping">
          ← Continue Shopping
        </Link>
      </div>

      <div className="cart-layout">
        {/* Shopping cart products */}
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="cart-product-image">
                <img src={item.image} alt={item.title} />
              </div>

              <div className="cart-item-details">
                <h3>{item.title}</h3>

                <p className="cart-item-price">
                  {formatPrice(item.price)}
                </p>

                {/* Product quantity controls */}
                <div className="cart-quantity-control">
                  <button
                    type="button"
                    onClick={() => decreaseQuantity(item.id)}
                    disabled={item.quantity <= 1}
                    aria-label={`Decrease quantity of ${item.title}`}
                  >
                    −
                  </button>

                  <span aria-live="polite">{item.quantity}</span>

                  <button
                    type="button"
                    onClick={() => increaseQuantity(item.id)}
                    aria-label={`Increase quantity of ${item.title}`}
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  className="remove-item-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>

              {/* Individual product subtotal */}
              <div className="cart-item-subtotal">
                <span>Subtotal</span>
                <strong>
                  {formatPrice(item.price * item.quantity)}
                </strong>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <aside className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span className="free-shipping">Free</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-total">
            <span>Total</span>
            <strong>{formatPrice(totalPrice)}</strong>
          </div>

          <p className="shipping-note">
            Shipping is currently free for this demo store.
          </p>

          <Link to="/checkout" className="checkout-btn">
            Proceed to Checkout →
          </Link>

          <div className="secure-checkout">
            🔒 Demo checkout experience
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Cart;