import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, cartCount, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart</h1>
          <div className="bg-white rounded-2xl p-12 shadow-sm">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Start shopping to add items to your cart</p>
            <Link to="/products" className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart ({cartCount} items)</h1>
        
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {cart.map((item) => (
            <div key={`${item.id}-${item.size}`} className="flex items-center gap-4 p-4 border-b border-gray-100">
              <img src={item.image} alt={item.title} className="w-20 h-20 object-contain" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500">Size: {item.size}</p>
                
                
                <p className="text-sm font-bold text-gray-900">
                  ${typeof item.price === 'number' ? item.price.toFixed(2) : '0.00'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 bg-gray-100 rounded-full hover:bg-gray-200"
                >
                  -
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 bg-gray-100 rounded-full hover:bg-gray-200"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-white rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Total:</span>
            
            
            <span className="text-2xl font-bold text-blue-600">
              ${typeof cartTotal === 'number' ? cartTotal.toFixed(2) : '0.00'}
            </span>
          </div>
          <div className="flex gap-4">
            <button
              onClick={clearCart}
              className="px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600"
            >
              Clear Cart
            </button>
            <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;