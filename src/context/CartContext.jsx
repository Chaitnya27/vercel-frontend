import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);

  // Load userId and load their cart
  useEffect(() => {
    const id = sessionStorage.getItem("userId");
    setUserId(id);
  }, []);

  // Load correct cart when userId changes
  useEffect(() => {
    if (userId) {
      const storedCart = JSON.parse(sessionStorage.getItem(`cart_${userId}`)) || [];
      setCartItems(storedCart);
    } else {
      setCartItems([]); // logout: clear cart
    }
  }, [userId]);

  // Save cart per user
  useEffect(() => {
    if (userId) {
      sessionStorage.setItem(`cart_${userId}`, JSON.stringify(cartItems));
    }
  }, [cartItems, userId]);

  // Add to cart
  const addToCart = (product) => {
    const exists = cartItems.find(item => item._id === product._id);
    if (exists) {
      alert("Item already in cart!");
    } else {
      const updated = [...cartItems, { ...product, quantity: 1 }];
      setCartItems(updated);
      alert("Added to cart!");
    }
  };

  const removeFromCart = (id) => {
    const updated = cartItems.filter(item => item._id !== id);
    setCartItems(updated);
  };

  const updateQuantity = (id, delta) => {
    const updated = cartItems.map(item =>
      item._id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setCartItems(updated);
  };

  const clearCart = () => {
    setCartItems([]);
    if (userId) {
      sessionStorage.removeItem(`cart_${userId}`);
    }
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      setUserId
    }}>
      {children}
    </CartContext.Provider>
  );
};
