import React, { createContext, useContext, useState } from 'react';


const CartContext = createContext();


export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  
  const cartTotal = cart.reduce((total, item) => {
    const price = typeof item.price === 'number' ? item.price : 0;
    return total + price * item.quantity;
  }, 0);

 
  const addToCart = (product, quantity = 1, size = 'M') => {
    setCart((prevCart) => {
      
      const existingItem = prevCart.find(
        (item) => item.id === product.id && item.size === size
      );
      
      if (existingItem) {
        
        return prevCart.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
       
        return [...prevCart, { ...product, quantity, size }];
      }
    });
  };

  
  const updateQuantity = (id, newQuantity, size) => {
    if (newQuantity < 1) return; 
    
    setCart((prevCart) => 
      prevCart.map((item) => 
        
        item.id === id && (!size || item.size === size)
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  
  const removeFromCart = (id, size) => {
    setCart((prevCart) => 
      prevCart.filter((item) => 
       
        !(item.id === id && (!size || item.size === size))
      )
    );
  };


  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      cartCount, 
      cartTotal, 
      addToCart, 
      removeFromCart, 
      updateQuantity, // 
      clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};