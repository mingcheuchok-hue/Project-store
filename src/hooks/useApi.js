// src/hooks/useApi.js
import { useState, useEffect, useCallback, useMemo } from 'react';
import api from '../services/api';

// ============================================
// GENERIC API HOOK
// ============================================

export const useApi = (apiFunction, options = {}) => {
  const { immediate = true, initialData = null, onSuccess, onError } = options;
  
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction(...args);
      setData(result);
      if (onSuccess) onSuccess(result);
      return result;
    } catch (err) {
      const errorMessage = err.message || 'An error occurred';
      setError(errorMessage);
      if (onError) onError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction, onSuccess, onError]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { data, loading, error, execute, setData };
};

// ============================================
// PRODUCTS HOOKS
// ============================================

// Hook: Get all products
export const useProducts = (params = {}) => {
  return useApi(() => api.products.getAll(params), {
    initialData: [],
    ...params
  });
};

// Hook: Get single product
export const useProduct = (id) => {
  return useApi(() => api.products.getById(id), {
    immediate: !!id,
    initialData: null
  });
};

// Hook: Get products by category
export const useProductsByCategory = (category) => {
  return useApi(() => api.products.getByCategory(category), {
    immediate: !!category,
    initialData: []
  });
};

// Hook: Get categories
export const useCategories = () => {
  return useApi(api.products.getCategories, {
    initialData: []
  });
};

// Hook: Get limited products
export const useLimitedProducts = (limit = 10) => {
  return useApi(() => api.products.getLimited(limit), {
    initialData: []
  });
};

// Hook: Get sorted products
export const useSortedProducts = (sort = 'asc') => {
  return useApi(() => api.products.getSorted(sort), {
    initialData: []
  });
};

// ============================================
// CART HOOKS
// ============================================

// Hook: Get all carts
export const useCarts = () => {
  return useApi(api.carts.getAll, {
    initialData: []
  });
};

// Hook: Get single cart
export const useCart = (id) => {
  return useApi(() => api.carts.getById(id), {
    immediate: !!id,
    initialData: null
  });
};

// Hook: Get carts by user
export const useUserCarts = (userId) => {
  return useApi(() => api.carts.getByUser(userId), {
    immediate: !!userId,
    initialData: []
  });
};

// ============================================
// USERS HOOKS
// ============================================

// Hook: Get all users
export const useUsers = () => {
  return useApi(api.users.getAll, {
    initialData: []
  });
};

// Hook: Get single user
export const useUser = (id) => {
  return useApi(() => api.users.getById(id), {
    immediate: !!id,
    initialData: null
  });
};

// Hook: Login user
export const useLogin = () => {
  const { data, loading, error, execute } = useApi(api.auth.login, {
    immediate: false,
    initialData: null
  });

  const login = useCallback(async (username, password) => {
    return await execute(username, password);
  }, [execute]);

  return { login, loading, error, data };
};

// ============================================
// MUTATION HOOKS (POST, PUT, DELETE)
// ============================================

// Hook: Create product
export const useCreateProduct = () => {
  const { data, loading, error, execute } = useApi(api.products.create, {
    immediate: false,
    initialData: null
  });

  const createProduct = useCallback(async (productData) => {
    return await execute(productData);
  }, [execute]);

  return { createProduct, loading, error, data };
};

// Hook: Update product
export const useUpdateProduct = () => {
  const { data, loading, error, execute } = useApi(api.products.update, {
    immediate: false,
    initialData: null
  });

  const updateProduct = useCallback(async (id, productData) => {
    return await execute(id, productData);
  }, [execute]);

  return { updateProduct, loading, error, data };
};

// Hook: Delete product
export const useDeleteProduct = () => {
  const { data, loading, error, execute } = useApi(api.products.delete, {
    immediate: false,
    initialData: null
  });

  const deleteProduct = useCallback(async (id) => {
    return await execute(id);
  }, [execute]);

  return { deleteProduct, loading, error, data };
};

// ============================================
// PAGINATION HOOK
// ============================================

export const usePagination = (items = [], itemsPerPage = 8) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  const goToPage = useCallback((page) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  }, [totalPages]);

  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage, totalPages]);

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  }, [currentPage]);

  const resetPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  return {
    currentItems,
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
    resetPage,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
  };
};

// ============================================
// SEARCH & FILTER HOOKS
// ============================================

// Hook: Search products
export const useSearch = (items = []) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('title');

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return items;
    
    const term = searchTerm.toLowerCase().trim();
    return items.filter(item => {
      const value = item[searchField]?.toLowerCase() || '';
      return value.includes(term);
    });
  }, [items, searchTerm, searchField]);

  return {
    searchTerm,
    setSearchTerm,
    searchField,
    setSearchField,
    filteredItems,
  };
};

// Hook: Filter by category
export const useCategoryFilter = (items = [], allCategories = []) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') return items;
    return items.filter(item => item.category === selectedCategory);
  }, [items, selectedCategory]);

  return {
    selectedCategory,
    setSelectedCategory,
    filteredItems,
    categories: allCategories,
  };
};

// ============================================
// WISHLIST HOOK (Local State)
// ============================================

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = useCallback((product) => {
    setWishlist(prev => {
      if (prev.some(item => item.id === product.id)) return prev;
      return [...prev, product];
    });
  }, []);

  const removeFromWishlist = useCallback((productId) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
  }, []);

  const isInWishlist = useCallback((productId) => {
    return wishlist.some(item => item.id === productId);
  }, [wishlist]);

  const clearWishlist = useCallback(() => {
    setWishlist([]);
  }, []);

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    count: wishlist.length,
  };
};

// ============================================
// CART HOOK (Local State)
// ============================================

export const useCartLocal = () => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(item => item.id !== productId));
    } else {
      setCart(prev =>
        prev.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const totalItems = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [cart]);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isInCart: useCallback((productId) => cart.some(item => item.id === productId), [cart]),
  };
};

// ============================================
// EXPORT ALL HOOKS
// ============================================

export default {
  useApi,
  useProducts,
  useProduct,
  useProductsByCategory,
  useCategories,
  useLimitedProducts,
  useSortedProducts,
  useCarts,
  useCart,
  useUserCarts,
  useUsers,
  useUser,
  useLogin,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
  usePagination,
  useSearch,
  useCategoryFilter,
  useWishlist,
  useCartLocal,
};