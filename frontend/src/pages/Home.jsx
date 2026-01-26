import { lazy, Suspense } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';

// Lazy load components for better performance
const HeroSection = lazy(() => import('../components/HeroSection'));
const CategoryShowcase = lazy(() => import('../components/CategoryShowcase'));
const FeaturedProducts = lazy(() => import('../components/FeaturedProducts'));
const TrustSection = lazy(() => import('../components/TrustSection'));
const WhyChooseUs = lazy(() => import('../components/WhyChooseUs'));

// Loading fallback component
const SectionLoader = () => (
  <div className="py-16 flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B35]"></div>
  </div>
);

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Features Bar - Quick Trust Indicators */}
        <section className="bg-[#1a1f3a] py-3" aria-label="Quick features">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center justify-center gap-2 text-white">
                <svg className="h-4 w-4 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <span className="text-xs sm:text-sm">Countrywide Delivery</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-white">
                <svg className="h-4 w-4 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-xs sm:text-sm">Quality Guaranteed</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-white">
                <svg className="h-4 w-4 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-xs sm:text-sm">Expert Support</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-white">
                <svg className="h-4 w-4 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs sm:text-sm">Wholesale Prices</span>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <Suspense fallback={<SectionLoader />}>
          <HeroSection />
        </Suspense>

        {/* Category Showcase */}
        <Suspense fallback={<SectionLoader />}>
          <CategoryShowcase />
        </Suspense>

        {/* Featured Products */}
        <Suspense fallback={<SectionLoader />}>
          <FeaturedProducts limit={12} />
        </Suspense>

        {/* Why Choose Us */}
        <Suspense fallback={<SectionLoader />}>
          <WhyChooseUs />
        </Suspense>

        {/* Trust Section */}
        <Suspense fallback={<SectionLoader />}>
          <TrustSection />
        </Suspense>

        {/* CTA Section */}
        <section className="py-16 lg:py-20 bg-gradient-to-r from-[#1a1f3a] to-[#2d3561]" aria-label="Call to action">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Find Your Perfect Auto Parts?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Browse our complete catalog of 150+ quality products. Wholesale and retail prices available.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/shop"
                className="px-8 py-4 bg-[#FF6B35] text-white rounded-lg font-bold text-lg shadow-lg hover:bg-[#e55a2b] transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
                aria-label="Browse all products"
              >
                <span>Browse All Products</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="https://wa.me/254719101851?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20your%20auto%20parts"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#25D366] text-white rounded-lg font-bold text-lg shadow-lg hover:bg-[#20BA5A] transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
                aria-label="Contact us on WhatsApp"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.239-.375a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Home;
