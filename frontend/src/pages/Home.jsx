import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductGrid from '../components/ProductGrid';

const Home = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const categoryFilter = searchParams.get('category') || '';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Features Bar */}
        <section className="bg-[#1a1f3a] py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center justify-center gap-2 text-white">
                <svg className="h-4 w-4 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <span className="text-xs sm:text-sm">Countrywide Delivery</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-white">
                <svg className="h-4 w-4 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-xs sm:text-sm">Quality Guaranteed</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-white">
                <svg className="h-4 w-4 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-xs sm:text-sm">Expert Support</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-white">
                <svg className="h-4 w-4 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs sm:text-sm">Wholesale Prices</span>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Section - Compact */}
        <section className="bg-gradient-to-r from-[#1a1f3a] via-[#2d3561] to-[#1a1f3a] py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block bg-[#FF6B35] text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
              150+ Quality Products Available
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
              Your One-Stop <span className="text-[#FF6B35]">Auto Parts</span> Shop
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              LED headlights, body parts, accessories & more. Wholesale & retail prices for all car models.
            </p>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-8 lg:py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ProductGrid searchQuery={searchQuery} initialCategory={categoryFilter} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
