// API utilities for dynamic operations only (contact forms, orders, etc.)
// Product data is now stored in frontend - see src/utils/products.js

const API_BASE_URL = 'http://localhost:5001';

// Contact form submission (still needs backend)
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

