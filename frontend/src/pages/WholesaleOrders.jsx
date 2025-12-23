import Header from '../components/Header';
import Footer from '../components/Footer';

const WholesaleOrders = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#1a1f3a] to-[#2d3561] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-[#FF6B35] text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
            Wholesale Partner Program
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Bulk Orders, <span className="text-[#FF6B35]">Better Prices</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Partner with Mariech Autospare for competitive wholesale pricing on quality auto parts. Perfect for garages, dealers, and fleet managers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#FF6B35] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#e55a2b] transition-colors flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>Request Wholesale Pricing</span>
            </button>
            <a
              href="tel:+254719101851"
              className="bg-white text-[#1a1f3a] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Call: 0719 101 851</span>
            </a>
          </div>
        </div>
      </div>

      {/* Why Partner With Us Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Why Partner With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-[#FF6B35] rounded-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Bulk Discounts</h3>
              <p className="text-gray-600">Enjoy significant savings with our tiered wholesale pricing. The more you order, the more you save.</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-[#FF6B35] rounded-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Wide Inventory</h3>
              <p className="text-gray-600">Access our full range of 150+ products including LED headlights, body parts, and accessories.</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-[#FF6B35] rounded-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Reliable Delivery</h3>
              <p className="text-gray-600">Fast and secure delivery across Kenya. Special arrangements for bulk orders.</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-[#FF6B35] rounded-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Dedicated Support</h3>
              <p className="text-gray-600">Get a dedicated account manager for personalized service and faster order processing.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Wholesale Categories */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Wholesale Categories</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Special pricing available across all our product categories. Contact us for a custom quote.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'LED Headlights', discount: 'Up to 25% off' },
              { name: 'Body Parts', discount: 'Up to 20% off' },
              { name: 'Accessories', discount: 'Up to 30% off' },
              { name: 'Performance Parts', discount: 'Up to 15% off' }
            ].map((category, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{category.name}</h3>
                <span className="inline-block bg-[#FF6B35] text-white px-4 py-1 rounded-full text-sm font-semibold">
                  {category.discount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#FF6B35] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Partner?</h2>
          <p className="text-xl text-orange-100 mb-8">
            Join hundreds of businesses already saving with our wholesale program. No minimum order required to get started.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-[#FF6B35] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Contact Sales Team
          </a>
        </div>
      </div>
      </main>
      <Footer />
    </div>
  );
};

export default WholesaleOrders;
