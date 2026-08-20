import React, { useState, useEffect } from 'react';
const allProducts = [
  { id: 1, title: "Fjällraven - Foldsack No. 1 Backpack", price: 109.95, category: "men's clothing", image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" },
  { id: 2, title: "Mens Casual Premium Slim Fit T-Shirts", price: 22.3, category: "men's clothing", image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg" },
  { id: 3, title: "Mens Cotton Jacket", price: 55.99, category: "men's clothing", image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_SY879._SX._UX._SY._UY_.jpg" },
 
];

export default function SearchProducts() {
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  
  const handleSearch = (text) => {
    setSearchTerm(text);
    
    if (text.trim() === "") {
      
      setFilteredProducts(allProducts);
    } else {
      
      const filtered = allProducts.filter((product) =>
        product.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      
      {/* --- YOUR NAVBAR SEARCH BAR --- */}
      {/* We pass 'handleSearch' to the input so when you type, it updates the list */}
      <div className="flex justify-center mb-10">
        <div className="relative w-full max-w-md">
          <span className="absolute left-3 top-3 text-gray-400">
            {/* Search Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>
      </div>

      {/* --- DISPLAYING THE FILTERED PRODUCTS --- */}
      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-500 mt-20 text-xl">
          No products found matching "{searchTerm}"
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              
              {/* Product Image */}
              <div className="h-48 flex items-center justify-center mb-4">
                <img src={product.image} alt={product.title} className="h-full object-contain mix-blend-multiply" />
              </div>

              {/* Product Info */}
              <div className="text-sm text-gray-500 uppercase tracking-wide mb-1">{product.category}</div>
              <h3 className="font-semibold text-gray-800 truncate">{product.title}</h3>
              
              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold text-gray-900">${product.price}</span>
                
                {/* Your Small '+' Button */}
                <button className="bg-gray-900 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black transition-colors">
                  +
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
