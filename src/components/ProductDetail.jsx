import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../services/api';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState('M');
  const [notification, setNotification] = useState(null);
  const topRef = useRef(null);
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const productData = await api.products.getById(id);
        setProduct(productData);
        setSelectedImage(productData.image);
        
        if (productData.category) {
          const related = await api.products.getByCategory(productData.category);
          const filtered = related
            .filter(p => p.id !== productData.id)
            .slice(0, 4);
          setRelatedProducts(filtered);
        }
      } catch (err) {
        setError(err.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [id]);
  const showNotification = (productTitle, size, qty, total) => {
    setNotification({
      message: `✅ "${productTitle}" (Size: ${size}, Qty: ${qty}) added to cart!`,
      total: `$${total.toFixed(2)}`,
      type: 'success'
    });
    setTimeout(() => setNotification(null), 4000);
  };
  const formatPrice = (price) => `$${price.toFixed(2)}`;

 
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 99) {
      setQuantity(value);
    }
  };

  const increaseQuantity = () => {
    if (quantity < 99) setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart(product, quantity, selectedSize);
    const total = product.price * quantity;
    showNotification(product.title, selectedSize, quantity, total);
  };

  
  const handleAddToWishlist = () => {
    if (!product) return;
    console.log('Added to wishlist:', product);
    setNotification({
      message: `❤️ "${product.title}" added to wishlist!`,
      type: 'success'
    });
    setTimeout(() => setNotification(null), 3000);
  };

  
  const handleRelatedProductClick = (productId) => {
    navigate(`/product/${productId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  
  const totalPrice = product ? product.price * quantity : 0;
  if (loading) {
    return (
      <div ref={topRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-['Inter',sans-serif]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div className="bg-gray-100 rounded-2xl h-96 animate-pulse"></div>
          <div className="space-y-6">
            <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
            </div>
            <div className="h-12 bg-gray-200 rounded w-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  
  if (error) {
    return (
      <div ref={topRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-['Inter',sans-serif]">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-semibold text-red-900 mb-2">Product Not Found</h3>
          <p className="text-sm text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-red-600 text-white text-sm font-medium rounded-full hover:bg-red-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div ref={topRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-['Inter',sans-serif]">
        <div className="text-center py-12">
          <p className="text-gray-500">Product not available</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={topRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 font-['Inter',sans-serif]">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-4 z-50 bg-green-600 text-white px-6 py-4 rounded-xl shadow-lg animate-slide-up max-w-md">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="text-sm font-medium">{notification.message}</p>
              {notification.total && (
                <p className="text-xs text-green-100 mt-1">Total: {notification.total}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-6 group"
      >
        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back
      </button>

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
        <a href="/" className="hover:text-blue-600 transition-colors">Home</a>
        <span>/</span>
        <a href="/products" className="hover:text-blue-600 transition-colors">Products</a>
        <span>/</span>
        <span className="text-gray-900 font-medium truncate max-w-[150px]">
          {product.title}
        </span>
      </nav>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        
        {/* Left: Product Images */}
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
            <img
              src={selectedImage}
              alt={product.title}
              className="w-full h-96 object-contain p-8 transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedImage(product.image)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition-all ${
                selectedImage === product.image 
                  ? 'border-blue-600 shadow-md' 
                  : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <img
                src={product.image}
                alt="Product thumbnail"
                className="w-full h-full object-cover p-2"
              />
            </button>
            <button className="flex-shrink-0 w-20 h-20 rounded-lg border-2 border-dashed border-gray-200 hover:border-gray-400 transition-colors flex items-center justify-center text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col">
          {/* Category */}
          <span className="text-xs font-semibold tracking-wider text-blue-600 uppercase mb-2">
            {product.category}
          </span>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mb-3">
            {product.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(4)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
              <svg className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>
            <span className="text-xs text-gray-500">(128 reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.price * 1.3)}
            </span>
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
              Save 30%
            </span>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Size Selector */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-900">Select Size</h3>
              <button className="text-xs text-blue-600 hover:text-blue-700 transition-colors">
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg border-2 transition-all duration-200 ${
                    selectedSize === size
                      ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-sm'
                      : 'border-gray-200 text-gray-600 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Free Shipping
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Secure Payment
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Easy Returns
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              24/7 Support
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-6">
            <label className="text-sm font-medium text-gray-700">Quantity:</label>
            <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
              <button
                onClick={decreaseQuantity}
                className="px-3 py-1.5 text-gray-600 hover:bg-gray-50 transition-colors"
                aria-label="Decrease quantity"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-12 text-center text-sm font-medium text-gray-900 bg-transparent outline-none py-1.5"
                min="1"
                max="99"
              />
              <button
                onClick={increaseQuantity}
                className="px-3 py-1.5 text-gray-600 hover:bg-gray-50 transition-colors"
                aria-label="Increase quantity"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
            <span className="text-xs text-gray-400">In Stock</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-gray-900 text-white text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-blue-600 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 flex items-center justify-between gap-2"
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Add to Cart
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">
                {formatPrice(totalPrice)}
              </span>
            </button>
            <button
              onClick={handleAddToWishlist}
              className="px-6 py-3.5 rounded-full border border-gray-200 text-gray-700 hover:border-red-400 hover:text-red-500 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Wishlist
            </button>
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2 text-xs text-gray-500 border-t border-gray-100 pt-4">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              In Stock
            </span>
            <span className="w-px h-3 bg-gray-300"></span>
            <span>Free delivery on orders over $50</span>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 pt-8 border-t border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-semibold tracking-wider text-blue-600 uppercase">
                You May Also Like
              </span>
              <h3 className="text-xl font-bold tracking-tight text-gray-900 mt-1">
                Related Products
              </h3>
            </div>
            <button 
              onClick={() => navigate('/products')}
              className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
            >
              View All →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedProducts.map((related) => (
              <div
                key={related.id}
                onClick={() => handleRelatedProductClick(related.id)}
                className="group bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <div className="bg-gray-50 h-40 overflow-hidden">
                  <img
                    src={related.image}
                    alt={related.title}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider truncate">
                    {related.category}
                  </p>
                  <h4 className="text-sm font-semibold text-gray-900 tracking-tight truncate mt-1">
                    {related.title}
                  </h4>
                  <p className="text-sm font-bold text-gray-900 mt-2">
                    {formatPrice(related.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CSS for notification */}
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slideUp 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ProductDetail;