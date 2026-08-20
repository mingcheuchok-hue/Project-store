import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductGride = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error('Error:', err);
        setProducts(getMockProducts());
        setError(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json();
        setCategories(['all', ...data]);
      } catch (err) {
        setCategories(['all', 'electronics', 'jewelery', "men's clothing", "women's clothing"]);
      }
    };
    fetchCategories();
  }, []);


  const getMockProducts = () => {
    return [
      {
        id: 1,
        title: 'Fjallraven - Foldsack No. 1 Backpack',
        price: 109.95,
        description: 'Your perfect pack for everyday use and walks in the forest.',
        category: "men's clothing",
        image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
        rating: { rate: 3.9, count: 120 }
      },
      {
        id: 2,
        title: 'Mens Casual Premium Slim Fit T-Shirts',
        price: 22.3,
        description: 'Slim-fitting style, contrast raglan long sleeve.',
        category: "men's clothing",
        image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
        rating: { rate: 4.1, count: 259 }
      },
      {
        id: 3,
        title: 'Mens Cotton Jacket',
        price: 55.99,
        description: 'Great outerwear jackets for Spring/Autumn/Winter.',
        category: "men's clothing",
        image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
        rating: { rate: 4.7, count: 500 }
      },
      {
        id: 4,
        title: 'Mens Casual Slim Fit',
        price: 15.99,
        description: 'The color could be slightly different between on the screen.',
        category: "men's clothing",
        image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
        rating: { rate: 2.1, count: 430 }
      },
      {
        id: 5,
        title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
        price: 695,
        description: "From our Legends Collection, the Naga was inspired by the mythical water dragon.",
        category: 'jewelery',
        image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
        rating: { rate: 4.6, count: 400 }
      },
      {
        id: 6,
        title: 'Solid Gold Petite Micropave',
        price: 168,
        description: 'Satisfaction Guaranteed. Return or exchange any order within 30 days.',
        category: 'jewelery',
        image: 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg',
        rating: { rate: 3.9, count: 70 }
      },
      {
        id: 7,
        title: 'White Gold Plated Princess',
        price: 9.99,
        description: 'Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her.',
        category: 'jewelery',
        image: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg',
        rating: { rate: 3, count: 400 }
      },
      {
        id: 8,
        title: 'Pierced Owl Rose Gold Plated Stainless Steel Double',
        price: 10.99,
        description: 'Rose Gold Plated Double Flared Tunnel Plug Earrings.',
        category: 'jewelery',
        image: 'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg',
        rating: { rate: 1.9, count: 100 }
      },
      {
        id: 9,
        title: 'WD 2TB Elements Portable External Hard Drive - USB 3.0',
        price: 64,
        description: 'USB 3.0 and USB 2.0 Compatibility Fast data transfers.',
        category: 'electronics',
        image: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg',
        rating: { rate: 3.3, count: 203 }
      },
      {
        id: 10,
        title: 'SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s',
        price: 109,
        description: 'Easy upgrade for faster boot up, shutdown, application load and response.',
        category: 'electronics',
        image: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg',
        rating: { rate: 4.8, count: 319 }
      },
      {
        id: 11,
        title: 'Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost',
        price: 109,
        description: '3D NAND flash are applied to deliver high transfer speeds.',
        category: 'electronics',
        image: 'https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg',
        rating: { rate: 4.8, count: 319 }
      },
      {
        id: 12,
        title: 'WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive',
        price: 114,
        description: 'Expand your PS4 gaming experience, Play anywhere.',
        category: 'electronics',
        image: 'https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg',
        rating: { rate: 4.8, count: 400 }
      }
    ];
  };

 
  const filteredProducts = products.filter(product => {
  
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      return product.title.toLowerCase().includes(term) ||
             product.description.toLowerCase().includes(term) ||
             product.category.toLowerCase().includes(term);
    }
    return true;
  });
  const formatPrice = (price) => `$${price.toFixed(2)}`;
  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    console.log('Added to cart:', product);
    alert(`Added "${product.title}" to cart!`);
  };
  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-['Inter',sans-serif]">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 px-4 py-1.5 rounded-full">
            Shop by Category
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mt-3">
            Browse our curated collections
          </h2>
          <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
            for every style and occasion
          </p>
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

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-['Inter',sans-serif]">
      {/* Section Header */}
      <div className="text-center mb-8">
        <span className="text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 px-4 py-1.5 rounded-full">
          Shop by Category
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mt-3">
          Browse our curated collections
        </h2>
        <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
          for every style and occasion
        </p>
        <p className="text-xs text-gray-400 mt-1">
          {filteredProducts.length} products found
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 text-gray-900 text-sm rounded-full pl-10 pr-4 py-2.5 border border-gray-200 focus:outline-none focus:border-blue-500 focus:bg-white transition-all placeholder:text-gray-400"
          />
          <svg
            className="w-4 h-4 text-gray-400 absolute left-3 top-3 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category === 'all' ? 'All' : category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              className="group bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 cursor-pointer"
            >
              {/* Product Image */}
              <div className="relative bg-gray-50 h-56 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x300?text=Product';
                  }}
                />
                {/* Quick view overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-medium px-4 py-2 rounded-full shadow-sm">
                    Quick View
                  </span>
                </div>
                {/* Category Badge */}
                <div className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-semibold px-2 py-1 rounded-full">
                  {product.category.split(' ').slice(0, 2).join(' ')}
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
                    onClick={(e) => handleAddToCart(e, product)}
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
      ) : (
        <div className="text-center py-16">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-sm text-gray-500">Try adjusting your search or filter criteria</p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
            className="mt-4 px-6 py-2 bg-gray-900 text-white text-sm rounded-full hover:bg-blue-600 transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductGride;