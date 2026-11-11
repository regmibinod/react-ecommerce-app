
import { CartContext } from "../context/CartContex";

import { useContext } from "react";
import "../styles/cart.css"
function Cart() {
  const {cart, removeFromCart,  increaseQuantity, decreaseQuantity} =  useContext(CartContext);


  const totalPrice = cart.reduce((acc, item)=>{
    return  acc + item.price * item.quantity;
  },0);

if(cart.length === 0){
  return <div>
    <h1>Welcome to your shopping cart</h1>
    <p>Your cart is currently empty</p>
  </div>
}
return (
    <div className="cart-container">
      <h1>Your Shopping Cart</h1>

      <div className="cart-items">
        {cart.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.title} />

            <div className="cart-item-details">
              <h3>{item.title}</h3>

              <p>Price: ${item.price.toFixed(2)}</p>

            
              <div>
                <button onClick={()=>decreaseQuantity(item.id)}> 
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={()=>increaseQuantity(item.id)}>
                  +
                </button>
              </div>

              <p>
                Subtotal: $
                {(item.price * item.quantity).toFixed(2)}
              </p>

              <button
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <h2 className="cart-total">
        Total: ${totalPrice.toFixed(2)} USD
      </h2>
    </div>
  );


}

export default Cart;