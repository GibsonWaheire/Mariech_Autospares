const API_BASE_URL = 'http://localhost:5001';

export const getProducts = async (filters = {}) => {
  const params = new URLSearchParams();
  
  if (filters.category) params.append('category', filters.category);
  if (filters.subcategory) params.append('subcategory', filters.subcategory);
  if (filters.car_make) params.append('car_make', filters.car_make);
  if (filters.car_model) params.append('car_model', filters.car_model);
  if (filters.size) params.append('size', filters.size);
  if (filters.min_price) params.append('min_price', filters.min_price);
  if (filters.max_price) params.append('max_price', filters.max_price);
  if (filters.in_stock) params.append('in_stock', filters.in_stock);
  if (filters.bestseller) params.append('bestseller', filters.bestseller);
  if (filters.featured) params.append('featured', filters.featured);
  if (filters.new) params.append('new', filters.new);
  if (filters.search) params.append('search', filters.search);
  if (filters.sort) params.append('sort', filters.sort);
  
  const url = `${API_BASE_URL}/products${params.toString() ? '?' + params.toString() : ''}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

export const getProduct = async (id) => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  return response.json();
};

export const getCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categories`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
};

export const getSubcategories = async (category = null) => {
  const url = category
    ? `${API_BASE_URL}/subcategories?category=${encodeURIComponent(category)}`
    : `${API_BASE_URL}/subcategories`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch subcategories');
  }
  return response.json();
};

export const getCarMakes = async () => {
  const response = await fetch(`${API_BASE_URL}/car-makes`);
  if (!response.ok) {
    throw new Error('Failed to fetch car makes');
  }
  return response.json();
};

export const getCarModels = async (make = null) => {
  const url = make
    ? `${API_BASE_URL}/car-models?make=${encodeURIComponent(make)}`
    : `${API_BASE_URL}/car-models`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch car models');
  }
  return response.json();
};

export const getSizes = async () => {
  const response = await fetch(`${API_BASE_URL}/sizes`);
  if (!response.ok) {
    throw new Error('Failed to fetch sizes');
  }
  return response.json();
};

export const submitContact = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to submit contact form');
  }
  return response.json();
};

