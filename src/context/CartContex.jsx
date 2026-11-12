import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {

  // Retrieve the previously saved cart from locan storage
  // If no saved cart exists , initialize with an empty array
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Automatically save cart data whenever the cart state changes.

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);



  //  adding product to cart function

  const addToCart = (product) => {
    setCart((prevCartItem) => {
      const isProductExist = prevCartItem.some(
        (item) => item.id === product.id,
      );
      if (isProductExist) {
        return prevCartItem.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCartItem, { ...product, quantity: 1 }];
    });
  };
  // end of function adding product to cart function

  // start of function remove from the cart
  const removeFromCart = (productID) => {
    setCart((prevCart) => {
      return prevCart.filter((item) => item.id !== productID);
    });
  };
  // end of function remove from the cart

  // Start of add increase quantity functionality

  const increaseQuantity = (productID) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productID ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  // End of add increase quantity functionality

  //   Start of function decrement of the cart
  const decreaseQuantity = (productID) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productID
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  //   End  of function decrement of the cart

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
