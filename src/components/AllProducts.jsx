import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../services/api';

const AllProducts = () => {
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [notification, setNotification] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState({});

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await api.products.getAll();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await api.products.getCategories();
        setCategories(['all', ...data]);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: size
    }));
  };

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  const formatPrice = (price) => `$${price.toFixed(2)}`;

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (!product || !product.id) {
      console.error('❌ Invalid product');
      return;
    }

    const selectedSize = selectedSizes[product.id] || 'M';
    addToCart(product, 1, selectedSize);
    
    setNotification({
      message: `✅ "${product.title}" (${selectedSize}) added to cart!`,
      type: 'success'
    });
    setTimeout(() => setNotification(null), 3000);
  };

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 px-4 py-1.5 rounded-full">
            Collection
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mt-3">
            All Products
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl p-4 animate-pulse">
              <div className="bg-gray-200 rounded-xl h-48 w-full"></div>
              <div className="mt-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <p className="text-red-600 font-medium">Error loading products</p>
          <p className="text-sm text-red-500 mt-2">{error}</p>
          <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2 bg-red-600 text-white text-sm rounded-full hover:bg-red-700 transition-colors">
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {notification && (
        <div className="fixed top-20 right-4 z-50 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg animate-slide-up">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-medium">{notification.message}</span>
          </div>
        </div>
      )}

      <div className="text-center mb-8">
        <span className="text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 px-4 py-1.5 rounded-full">
          Collection
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mt-3">
          All Products
        </h2>
        <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
          Discover our complete collection of premium products
        </p>
        <p className="text-xs text-gray-400 mt-1">
          {filteredProducts.length} products available
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-gray-900 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category === 'all' ? 'All' : category}
          </button>
        ))}
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const selectedSize = selectedSizes[product.id] || 'M';
            const isInCart = cart.some(item => item.id === product.id);
            
            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 cursor-pointer"
                onClick={() => handleProductClick(product.id)}
              >
                {/* ✅ Product Image - FIXED */}
                <div className="relative bg-gray-100 h-56 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain p-4"  
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                    }}
                  />
                  
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-medium px-4 py-2 rounded-full shadow-sm">
                      Quick View
                    </span>
                  </div>
                  
                  <div className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-semibold px-2 py-1 rounded-full">
                    {product.category.split(' ').slice(0, 2).join(' ')}
                  </div>

                  {isInCart && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                      In Cart
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider truncate">
                    {product.category}
                  </p>
                  <h3 className="text-sm font-semibold text-gray-900 tracking-tight truncate mt-1">
                    {product.title}
                  </h3>
                  
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 mb-1.5">Select Size:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {availableSizes.map((size) => (
                        <button
                          key={size}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSizeSelect(product.id, size);
                          }}
                          className={`w-8 h-8 text-xs font-medium rounded-full transition-all duration-200 ${
                            selectedSizes[product.id] === size
                              ? 'bg-gray-900 text-white shadow-lg'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleAddToCart(e, product);
                      }}
                      className={`flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 ${
                        isInCart
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-gray-900 text-white hover:bg-blue-600 hover:scale-110'
                      }`}
                      aria-label="Add to cart"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 mt-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    <span className="text-[10px] text-gray-400">In Stock</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-sm text-gray-500">Try selecting a different category</p>
          <button onClick={() => setSelectedCategory('all')} className="mt-4 px-6 py-2 bg-gray-900 text-white text-sm rounded-full hover:bg-blue-600 transition-colors">
            View All Products
          </button>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slideUp 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default AllProducts;