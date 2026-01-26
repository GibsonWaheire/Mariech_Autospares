import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { filterProducts } from '../utils/products';

const FeaturedProducts = ({ limit = 12 }) => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    // Get bestseller products
    const featured = filterProducts({ bestseller: true, sort: 'popularity' });
    setProducts(featured.slice(0, limit));
  }, [limit]);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || products.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(products.length / 4));
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, products.length]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(products.length / 4)) % Math.ceil(products.length / 4));
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(products.length / 4));
  };

  const handleDotClick = (index) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  if (products.length === 0) {
    return null;
  }

  const itemsPerPage = 4;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = currentIndex * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleProducts = products.slice(startIndex, endIndex);

  return (
    <section className="py-16 lg:py-20 bg-gray-50" aria-label="Featured products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Featured <span className="text-[#FF6B35]">Products</span>
            </h2>
            <p className="text-lg text-gray-600">
              Our most popular and best-selling auto parts
            </p>
          </div>
          <Link
            to="/shop?bestseller=true"
            className="hidden md:flex items-center gap-2 px-6 py-3 bg-[#FF6B35] text-white rounded-lg font-semibold hover:bg-[#e55a2b] transition-colors"
            aria-label="View all featured products"
          >
            <span>View All</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Products Grid */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {Array.from({ length: totalPages }).map((_, pageIndex) => {
                const pageProducts = products.slice(
                  pageIndex * itemsPerPage,
                  pageIndex * itemsPerPage + itemsPerPage
                );
                return (
                  <div
                    key={pageIndex}
                    className="min-w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                  >
                    {pageProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Arrows */}
          {totalPages > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] min-w-[44px] min-h-[44px] hidden md:flex items-center justify-center"
                aria-label="Previous products"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] min-w-[44px] min-h-[44px] hidden md:flex items-center justify-center"
                aria-label="Next products"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Mobile Swipe Indicators */}
          {totalPages > 1 && (
            <div className="md:hidden flex justify-center gap-2 mt-4">
              <button
                onClick={handlePrev}
                className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Previous products"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Next products"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          {/* Dots Indicator */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-[#FF6B35] w-8'
                      : 'bg-gray-300 w-2 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center md:hidden">
          <Link
            to="/shop?bestseller=true"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF6B35] text-white rounded-lg font-semibold hover:bg-[#e55a2b] transition-colors"
          >
            <span>View All Featured Products</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
