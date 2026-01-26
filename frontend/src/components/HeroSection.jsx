import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { filterProducts } from '../utils/products';
import { getImagePath } from '../utils/imageUtils';

const HeroSection = () => {
  const [productImages, setProductImages] = useState([]);

  useEffect(() => {
    // Get featured/bestseller products with images
    const featuredProducts = filterProducts({ bestseller: true, sort: 'popularity' }).slice(0, 12);
    
    // Extract unique product images
    const images = [];
    featuredProducts.forEach(product => {
      if (product.images && product.images.length > 0) {
        const imagePath = getImagePath(product.images[0]);
        images.push({
          src: imagePath,
          alt: product.name,
          productId: product.id
        });
      }
    });
    
    // If we don't have enough images, add more from all products
    if (images.length < 8) {
      const allProducts = filterProducts({ sort: 'popularity' });
      allProducts.forEach(product => {
        if (images.length >= 12) return;
        if (product.images && product.images.length > 0) {
          const imagePath = getImagePath(product.images[0]);
          // Avoid duplicates
          if (!images.find(img => img.src === imagePath)) {
            images.push({
              src: imagePath,
              alt: product.name,
              productId: product.id
            });
          }
        }
      });
    }
    
    setProductImages(images);
  }, []);

  return (
    <section 
      className="relative bg-gradient-to-br from-[#1a1f3a] via-[#2d3561] to-[#1a1f3a] py-16 lg:py-24 overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Animated Product Images Carousel - Scrolling from right to left */}
      {productImages.length > 0 && (
        <div className="absolute inset-0 overflow-hidden opacity-15 pointer-events-none">
          <div className="flex animate-scroll-left h-full items-center">
            {/* Duplicate images for seamless infinite loop */}
            {[...productImages, ...productImages].map((img, idx) => (
              <div
                key={`${img.productId || 'img'}-${idx}`}
                className="flex-shrink-0 w-48 h-48 mx-6 rounded-xl overflow-hidden shadow-2xl border-2 border-white/20 backdrop-blur-sm"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    // Hide broken images
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#FF6B35] text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg animate-fade-in">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>150+ Quality Products Available</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Your One-Stop{' '}
            <span className="text-[#FF6B35] relative inline-block">
              Auto Parts
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#FF6B35] opacity-50" viewBox="0 0 200 20" preserveAspectRatio="none">
                <path d="M0,10 Q50,0 100,10 T200,10" stroke="currentColor" strokeWidth="3" fill="none" />
              </svg>
            </span>
            {' '}Shop
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Premium LED headlights, body parts, and accessories. Wholesale & retail prices for all car models. 
            <span className="block mt-2 text-[#FF6B35] font-semibold">Countrywide delivery available.</span>
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              to="/shop"
              className="group px-8 py-4 bg-[#FF6B35] text-white rounded-lg font-bold text-lg shadow-lg hover:bg-[#e55a2b] transform hover:scale-105 transition-all duration-300 flex items-center gap-2 min-w-[200px] justify-center"
              aria-label="Shop all products"
            >
              <span>Shop Now</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <a
              href="https://wa.me/254719101851?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20your%20auto%20parts"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 bg-[#25D366] text-white rounded-lg font-bold text-lg shadow-lg hover:bg-[#20BA5A] transform hover:scale-105 transition-all duration-300 flex items-center gap-2 min-w-[200px] justify-center"
              aria-label="Contact us on WhatsApp"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.239-.375a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>WhatsApp Order</span>
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-3xl font-bold text-[#FF6B35] mb-1">150+</div>
              <div className="text-sm text-gray-300">Products</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-3xl font-bold text-[#FF6B35] mb-1">100%</div>
              <div className="text-sm text-gray-300">Quality</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-3xl font-bold text-[#FF6B35] mb-1">24/7</div>
              <div className="text-sm text-gray-300">Support</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-3xl font-bold text-[#FF6B35] mb-1">KE</div>
              <div className="text-sm text-gray-300">Wide Delivery</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10" aria-hidden="true">
        <svg className="w-6 h-6 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
