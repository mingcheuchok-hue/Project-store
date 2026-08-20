import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setAllProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === '') {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    setIsLoading(true);
    const filtered = allProducts.filter((product) =>
      product.title.toLowerCase().includes(value.toLowerCase()) ||
      product.category.toLowerCase().includes(value.toLowerCase())
    );
    
    setSuggestions(filtered.slice(0, 5));
    setShowDropdown(true);
    setIsLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
      setSuggestions([]);
      setShowDropdown(false);
      setIsMobileMenuOpen(false);
    }
  };

  const handleSuggestionClick = (product) => {
    navigate(`/product/${product.id}`);
    setSearchTerm('');
    setSuggestions([]);
    setShowDropdown(false);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 font-['Inter',sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link to="/" className="text-xl font-bold tracking-tight text-gray-900 hover:opacity-80 transition-opacity">
              CStore<span className="text-blue-600">.</span>
            </Link>
          </div>

          {/* Navigation Links - Center (Desktop) */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
              About
            </Link>
            <Link 
              to="/products" 
              className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
              Products
            </Link>
            <Link 
              to="/contact" 
              className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            
            {/* Desktop Search Bar with Dropdown */}
            <div className="hidden md:flex items-center relative" ref={dropdownRef}>
              <form onSubmit={handleSearch} className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={() => {
                    if (searchTerm.trim() !== '' && suggestions.length > 0) {
                      setShowDropdown(true);
                    }
                  }}
                  className="w-48 lg:w-64 bg-gray-50 text-gray-900 text-xs rounded-full pl-9 pr-4 py-2 border border-gray-200 focus:outline-none focus:border-blue-500 focus:bg-white transition-all placeholder:text-gray-400"
                />
                <button 
                  type="submit" 
                  className="absolute left-3 top-2.5 text-gray-400 hover:text-blue-600 transition-colors"
                  aria-label="Search"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>

              {/* Dropdown Suggestions */}
              {showDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50 max-h-96 overflow-y-auto">
                  {isLoading ? (
                    <div className="px-4 py-3 text-sm text-gray-500 text-center">
                      <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                      Searching...
                    </div>
                  ) : suggestions.length > 0 ? (
                    <div>
                      {suggestions.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => handleSuggestionClick(product)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                        >
                          <img 
                            src={product.image} 
                            alt={product.title} 
                            className="w-10 h-10 object-contain mix-blend-multiply"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {product.title}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span>{product.category}</span>
                              <span className="text-blue-600 font-semibold">${product.price.toFixed(2)}</span>
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/product/${product.id}`);
                              setShowDropdown(false);
                              setSearchTerm('');
                            }}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            View
                          </button>
                        </div>
                      ))}
                      <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
                        <button
                          onClick={() => {
                            navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
                            setShowDropdown(false);
                            setSearchTerm('');
                          }}
                          className="text-sm text-blue-600 hover:text-blue-800 font-medium w-full text-center"
                        >
                          See all results for "{searchTerm}"
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="px-4 py-6 text-center text-gray-500">
                      <svg className="w-8 h-8 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <p className="text-sm">No products found</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Cart Button with Dynamic Count */}
            <Link
              to="/cart"
              aria-label="Shopping Cart"
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              aria-label="Toggle Menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 space-y-3">
            <form onSubmit={handleSearch} className="relative mb-3">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-50 text-gray-900 text-xs rounded-lg pl-9 pr-4 py-2 border border-gray-200 focus:outline-none focus:border-blue-500"
              />
              <button 
                type="submit" 
                className="absolute left-3 top-2.5 text-gray-400 hover:text-blue-600 transition-colors"
                aria-label="Search"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
            
            <Link 
              to="/" 
              onClick={handleLinkClick}
              className="block px-2 py-1 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-md"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              onClick={handleLinkClick}
              className="block px-2 py-1 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md"
            >
              About
            </Link>
            <Link 
              to="/products" 
              onClick={handleLinkClick}
              className="block px-2 py-1 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md"
            >
              Products
            </Link>
            <Link 
              to="/contact" 
              onClick={handleLinkClick}
              className="block px-2 py-1 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md"
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;