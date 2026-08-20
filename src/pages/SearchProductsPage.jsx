// src/pages/SearchProductsPage.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const SearchProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setAllProducts(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Handle search
  const handleSearch = (text) => {
    setSearchTerm(text);
    
    if (text.trim() === "") {
      setFilteredProducts([]);
    } else {
      const filtered = allProducts.filter((product) =>
        product.title.toLowerCase().includes(text.toLowerCase()) ||
        product.category.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  // Get search query from URL
  useEffect(() => {
    const query = searchParams.get('q') || searchParams.get('search');
    if (query && allProducts.length > 0) {
      setSearchTerm(query);
      handleSearch(query);
    }
  }, [searchParams, allProducts]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">លទ្ធផលស្វែងរក</h1>
          <p className="text-gray-500 mt-1">
            {searchTerm ? `បង្ហាញលទ្ធផលសម្រាប់ "${searchTerm}"` : 'បញ្ចូលពាក្យស្វែងរកដើម្បីស្វែងរកផលិតផល'}
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="relative w-full max-w-2xl">
            <span className="absolute left-4 top-4 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input 
              type="text" 
              placeholder="ស្វែងរកផលិតផល..." 
              value={searchTerm}
              onChange={(e) => {
                const value = e.target.value;
                setSearchTerm(value);
                handleSearch(value);
              }}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-lg"
              autoFocus
            />
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilteredProducts([]);
                }}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {searchTerm && (
          <div className="text-sm text-gray-500 mb-6 text-center">
            រកឃើញ <strong className="text-gray-900">{filteredProducts.length}</strong> ផលិតផល
          </div>
        )}

        {searchTerm && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">រកមិនឃើញផលិតផល</h2>
            <p className="text-gray-500 mb-6">យើងរកមិនឃើញផលិតផលដែលត្រូវនឹង "{searchTerm}"</p>
            <div className="space-x-4">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilteredProducts([]);
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                សម្អាតការស្វែងរក
              </button>
              <Link
                to="/products"
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
              >
                មើលផលិតផលទាំងអស់
              </Link>
            </div>
          </div>
        )}

        {filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Link 
                key={product.id} 
                to={`/product/${product.id}`}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
              >
                <div className="h-56 flex items-center justify-center p-4 bg-gray-50 group-hover:bg-gray-100 transition-colors">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300" 
                  />
                </div>
                <div className="p-4">
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">{product.category}</div>
                  <h3 className="font-semibold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {product.title}
                  </h3>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    <button 
                      className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-700 transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        console.log('Added to cart:', product.id);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!searchTerm && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">search</h2>
            <p className="text-gray-500"></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchProductsPage;