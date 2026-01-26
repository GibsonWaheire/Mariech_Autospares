import { Link } from 'react-router-dom';
import { filterProducts, getCategories } from '../utils/products';
import { useEffect, useState } from 'react';
import { getImagePath } from '../utils/imageUtils';

const CategoryShowcase = () => {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const categories = getCategories();
    const data = categories.map(category => {
      const products = filterProducts({ category });
      // Get a representative image from products in this category
      const imageProduct = products.find(p => p.images && p.images.length > 0);
      
      return {
        name: category,
        count: products.length,
        image: imageProduct?.images?.[0] ? getImagePath(imageProduct.images[0]) : null,
        link: `/shop?category=${encodeURIComponent(category)}`
      };
    });
    setCategoryData(data);
  }, []);

  // Category icons mapping
  const getCategoryIcon = (categoryName) => {
    const icons = {
      'Lighting & Electrical': (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      'Body Parts': (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      'Accessories': (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      'Performance & Styling': (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    };
    return icons[categoryName] || (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    );
  };

  return (
    <section className="py-16 lg:py-20 bg-white" aria-label="Product categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by <span className="text-[#FF6B35]">Category</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our extensive collection of auto parts organized by category
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryData.map((category, index) => (
            <Link
              key={category.name}
              to={category.link}
              className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-[#FF6B35] transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
              aria-label={`Browse ${category.name} products`}
            >
              {/* Image Background */}
              {category.image ? (
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                </div>
              ) : (
                <div className="h-48 bg-gradient-to-br from-[#1a1f3a] to-[#2d3561] flex items-center justify-center">
                  <div className="text-white opacity-80">
                    {getCategoryIcon(category.name)}
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#FF6B35] transition-colors">
                    {category.name}
                  </h3>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-[#FF6B35] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  {category.count} {category.count === 1 ? 'product' : 'products'} available
                </p>
                <div className="flex items-center text-[#FF6B35] font-semibold text-sm">
                  <span>Shop Now</span>
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-[#FF6B35] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
