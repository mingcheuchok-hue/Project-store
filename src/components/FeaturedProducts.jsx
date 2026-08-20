import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../services/api';

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await api.products.getLimited(12);
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
    
    addToCart(product, 1, 'M');
    setNotification({
      message: `✅ "${product.title}" added to cart!`,
      type: 'success'
    });
    setTimeout(() => setNotification(null), 3000);
  };

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-['Inter',sans-serif]">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 px-4 py-1.5 rounded-full">
            Featured
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mt-3">
            Trending Products
          </h2>
          <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
            Discover our most popular items loved by customers worldwide
          </p>
        </div>
        <div className="flex gap-4 overflow-hidden">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex-shrink-0 w-48 sm:w-56 bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl p-4 animate-pulse">
              <div className="bg-gray-200 rounded-xl h-40 w-full"></div>
              <div className="mt-4 space-y-2">
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-['Inter',sans-serif]">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <p className="text-red-600 font-medium">Error loading featured products</p>
          <p className="text-sm text-red-500 mt-2">{error}</p>
          <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2 bg-red-600 text-white text-sm rounded-full hover:bg-red-700 transition-colors">
            Try Again
          </button>
        </div>
      </section>
    );
  }
  const duplicatedProducts = [...products, ...products, ...products];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-['Inter',sans-serif]">
      
      {/* Notification */}
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

      {/* Section Header */}
      <div className="text-center mb-8">
        <span className="text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 px-4 py-1.5 rounded-full">
          Featured
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mt-3">
          Trending Products
        </h2>
        <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
          Discover our most popular items loved by customers worldwide
        </p>
      </div>
      <div className="relative overflow-hidden rounded-2xl">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        <div 
          className="flex gap-5 py-4 marquee-scroll"
          style={{
            width: 'max-content',
            animationDuration: '40s',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite'
          }}
        >
          {duplicatedProducts.map((product, index) => (
            <div
              key={`${product.id}-${index}`}
              onClick={() => handleProductClick(product.id)}
              className="flex-shrink-0 w-48 sm:w-56 bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
            >
              {/* Product Image */}
              <div className="relative bg-gray-50 h-44 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
                  }}
                />
                <div className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-semibold px-2 py-1 rounded-full">
                  Featured
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-medium px-4 py-2 rounded-full shadow-sm">
                    Quick View
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider truncate">
                  {product.category}
                </p>
                <h3 className="text-sm font-semibold text-gray-900 tracking-tight truncate mt-1">
                  {product.title}
                </h3>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-lg font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      if (product && product.id) {
                        addToCart(product, 1, 'M');
                        setNotification({
                          message: `✅ "${product.title}" added to cart!`,
                          type: 'success'
                        });
                        setTimeout(() => setNotification(null), 3000);
                      }
                    }}
                    aria-label="Add to cart"
                    className="p-1.5 rounded-full bg-gray-900 text-white hover:bg-blue-600 transition-colors duration-200 group-hover:scale-110"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="flex justify-center gap-1.5 mt-6">
        <div className="w-2 h-2 rounded-full bg-blue-600"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
      </div>

      {/* Direction Label */}
      <div className="text-center mt-2">
        <span className="text-[10px] text-gray-400 animate-pulse">
          ← Scroll Left to Right →
        </span>
      </div>

      {/* View All Button */}
      <div className="text-center mt-4">
        <button
          onClick={() => navigate('/products')}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors group"
        >
          View All Products
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>

      {/* ✅ CSS Animation */}
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slideUp 0.3s ease-out forwards;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }

        /* ✅ MARQUEE SCROLL - LEFT TO RIGHT */
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }

        .marquee-scroll {
          animation: marqueeScroll 40s linear infinite;
        }

        /* Pause on hover */
        .marquee-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default FeaturedProducts;