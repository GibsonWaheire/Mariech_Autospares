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
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      'Body Parts': (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      'Accessories': (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      'Performance & Styling': (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    };
    return icons[categoryName] || (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    );
  };

  return (
    <section className="py-20 lg:py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden" aria-label="Product categories">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23 11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 0c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#FF6B35]/10 text-[#FF6B35] px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span>Browse by Category</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Shop by <span className="text-[#FF6B35]">Category</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our comprehensive range of auto parts. From lighting & electrical to body parts, find everything you need for wholesale and retail.
          </p>
        </div>

        {/* Category Grid */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
          {categoryData.map((category, index) => (
            <Link
              key={category.name}
              to={category.link}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 hover:border-[#FF6B35] transform hover:-translate-y-2 flex flex-col h-full w-full sm:w-[calc(50%-12px)] lg:w-[280px] xl:w-[300px]"
              style={{ animationDelay: `${index * 100}ms` }}
              aria-label={`Browse ${category.name} products`}
            >
              {/* Image Background with Overlay */}
              {category.image ? (
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const fallback = e.target.nextElementSibling;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div className="hidden absolute inset-0 bg-gradient-to-br from-[#1a1f3a] to-[#2d3561] items-center justify-center">
                    <div className="text-white opacity-90">
                      {getCategoryIcon(category.name)}
                    </div>
                  </div>
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-xs font-bold text-gray-900">{category.count} Items</span>
                  </div>
                </div>
              ) : (
                <div className="h-56 bg-gradient-to-br from-[#1a1f3a] via-[#2d3561] to-[#1a1f3a] flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="text-white opacity-90 relative z-10">
                    {getCategoryIcon(category.name)}
                  </div>
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-xs font-bold text-gray-900">{category.count} Items</span>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-6 lg:p-7 flex flex-col flex-grow">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#FF6B35] transition-colors mb-3 leading-tight">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {category.count} {category.count === 1 ? 'product' : 'quality product'} available for wholesale & retail
                  </p>
                </div>
                
                {/* CTA Button */}
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-[#FF6B35] font-bold text-sm uppercase tracking-wide group-hover:translate-x-1 transition-transform duration-300">
                      Explore Category
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#FF6B35]/10 group-hover:bg-[#FF6B35] flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                      <svg className="w-5 h-5 text-[#FF6B35] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#FF6B35]/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </Link>
          ))}
        </div>

        {/* View All Categories Link */}
        <div className="text-center mt-12">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FF6B35] to-[#e55a2b] text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            aria-label="View all categories"
          >
            <span>View All Products</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
