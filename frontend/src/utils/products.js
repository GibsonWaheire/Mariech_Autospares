// Client-side product utilities for filtering and searching
// All operations happen in the browser - no API calls needed

import { products } from '../data/products';

/**
 * Get all products
 */
export const getAllProducts = () => {
  return products;
};

/**
 * Get a single product by ID
 */
export const getProductById = (id) => {
  return products.find(p => p.id === parseInt(id));
};

/**
 * Filter products based on filter criteria
 */
export const filterProducts = (filters = {}) => {
  let filtered = [...products];

  // Category filter
  if (filters.category) {
    filtered = filtered.filter(p => 
      p.category?.toLowerCase() === filters.category.toLowerCase()
    );
  }

  // Subcategory filter
  if (filters.subcategory) {
    filtered = filtered.filter(p => 
      p.subcategory?.toLowerCase() === filters.subcategory.toLowerCase()
    );
  }

  // Car make filter
  if (filters.car_make) {
    filtered = filtered.filter(p => 
      p.car_make && p.car_make.toLowerCase().includes(filters.car_make.toLowerCase())
    );
  }

  // Car model filter
  if (filters.car_model) {
    filtered = filtered.filter(p => 
      p.car_model && p.car_model.toLowerCase().includes(filters.car_model.toLowerCase())
    );
  }

  // Size filter
  if (filters.size) {
    filtered = filtered.filter(p => 
      p.size && p.size.toUpperCase().includes(filters.size.toUpperCase())
    );
  }

  // Price range filter
  if (filters.min_price !== undefined && filters.min_price !== null) {
    filtered = filtered.filter(p => 
      p.price !== null && p.price !== undefined && p.price >= filters.min_price
    );
  }

  if (filters.max_price !== undefined && filters.max_price !== null) {
    filtered = filtered.filter(p => 
      p.price !== null && p.price !== undefined && p.price <= filters.max_price
    );
  }

  // In stock filter
  if (filters.in_stock === true) {
    filtered = filtered.filter(p => p.stock > 0);
  }

  // Bestseller filter
  if (filters.bestseller === true || filters.bestseller === 'true') {
    filtered = filtered.filter(p => p.is_bestseller === true);
  }

  // Featured filter (uses bestseller)
  if (filters.featured === true || filters.featured === 'true') {
    filtered = filtered.filter(p => p.is_bestseller === true);
  }

  // New arrivals filter
  if (filters.new === true || filters.new === 'true') {
    filtered = filtered.filter(p => p.is_new === true);
  }

  // Search query - improved search across multiple fields
  if (filters.search && filters.search.trim()) {
    const searchLower = filters.search.toLowerCase().trim();
    const searchTerms = searchLower.split(/\s+/).filter(term => term.length > 0);
    
    filtered = filtered.filter(p => {
      // Search in multiple fields
      const searchableText = [
        p.name,
        p.description,
        p.sku,
        p.category,
        p.subcategory,
        p.car_make,
        p.car_model,
        p.size,
        p.compatible_cars?.join(' '),
        p.variants?.join(' ')
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      
      // Check if all search terms match (AND logic)
      return searchTerms.every(term => searchableText.includes(term));
    });
  }

  // Sorting
  const sortBy = filters.sort || 'name';
  if (sortBy === 'price_low') {
    filtered = filtered.sort((a, b) => {
      if (a.price === null || a.price === undefined) return 1;
      if (b.price === null || b.price === undefined) return -1;
      return a.price - b.price;
    });
  } else if (sortBy === 'price_high') {
    filtered = filtered.sort((a, b) => {
      if (a.price === null || a.price === undefined) return 1;
      if (b.price === null || b.price === undefined) return -1;
      return b.price - a.price;
    });
  } else if (sortBy === 'name') {
    filtered = filtered.sort((a, b) => 
      (a.name || '').localeCompare(b.name || '')
    );
  } else if (sortBy === 'popularity') {
    filtered = filtered.sort((a, b) => {
      // Sort by bestseller first, then by stock
      if (a.is_bestseller && !b.is_bestseller) return -1;
      if (!a.is_bestseller && b.is_bestseller) return 1;
      return (b.stock || 0) - (a.stock || 0);
    });
  }

  return filtered;
};

/**
 * Search products by query string
 */
export const searchProducts = (query) => {
  if (!query) return products;
  
  const queryLower = query.toLowerCase();
  return products.filter(p => 
    p.name?.toLowerCase().includes(queryLower) ||
    p.description?.toLowerCase().includes(queryLower) ||
    p.sku?.toLowerCase().includes(queryLower) ||
    (p.car_model && p.car_model.toLowerCase().includes(queryLower)) ||
    (p.size && p.size.toLowerCase().includes(queryLower))
  );
};

/**
 * Get all unique categories
 */
export const getCategories = () => {
  const categories = new Set();
  products.forEach(p => {
    if (p.category) {
      categories.add(p.category);
    }
  });
  return Array.from(categories).sort();
};

/**
 * Get subcategories for a specific category
 */
export const getSubcategories = (category = null) => {
  const subcategories = new Set();
  products.forEach(p => {
    if (p.subcategory) {
      if (!category || p.category?.toLowerCase() === category.toLowerCase()) {
        subcategories.add(p.subcategory);
      }
    }
  });
  
  const result = Array.from(subcategories).map(name => ({
    name,
    category: category || products.find(p => p.subcategory === name)?.category || ''
  }));
  
  return result.sort((a, b) => a.name.localeCompare(b.name));
};

/**
 * Get all unique car makes
 */
export const getCarMakes = () => {
  const makes = new Set();
  products.forEach(p => {
    if (p.car_make) {
      makes.add(p.car_make);
    }
  });
  return Array.from(makes).sort();
};

/**
 * Get car models for a specific make
 */
export const getCarModels = (make = null) => {
  const models = new Set();
  products.forEach(p => {
    if (p.car_model) {
      if (!make || (p.car_make && p.car_make.toLowerCase().includes(make.toLowerCase()))) {
        models.add(p.car_model);
      }
    }
  });
  return Array.from(models).sort();
};

/**
 * Get all unique sizes
 */
export const getSizes = () => {
  const sizes = new Set();
  products.forEach(p => {
    if (p.size) {
      sizes.add(p.size);
    }
  });
  return Array.from(sizes).sort();
};
