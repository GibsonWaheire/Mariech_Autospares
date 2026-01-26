import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
      {/* Stats Section */}
      <div className="bg-white py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white border border-gray-200 rounded-lg">
              <div className="w-16 h-16 bg-[#FF6B35] rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">5000+</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>

            <div className="text-center p-6 bg-white border border-gray-200 rounded-lg">
              <div className="w-16 h-16 bg-[#FF6B35] rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">150+</div>
              <div className="text-sm text-gray-600">Quality Products</div>
            </div>

            <div className="text-center p-6 bg-white border border-gray-200 rounded-lg">
              <div className="w-16 h-16 bg-[#FF6B35] rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">10+</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>

            <div className="text-center p-6 bg-white border border-gray-200 rounded-lg">
              <div className="w-16 h-16 bg-[#FF6B35] rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">100%</div>
              <div className="text-sm text-gray-600">Quality Guaranteed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  At Mariech Autospare, we are committed to providing high-quality auto spare parts at competitive prices to customers across Kenya. What started as a small shop has grown into a trusted wholesale and retail destination for auto parts.
                </p>
                <p>
                  Located in the heart of Nairobi at MSP Plaza, we have built our reputation on quality, reliability, and excellent customer service. Our team has years of experience in the automotive industry and understands the importance of finding the right parts for your vehicle.
                </p>
                <p>
                  We serve thousands of satisfied customers, including car owners, garage owners, and fleet managers who trust us for their auto parts needs. Our commitment to quality and customer satisfaction has made us a leading name in the autospare industry.
                </p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg p-12 text-center">
              <div className="flex items-center justify-center mx-auto mb-6">
                <img 
                  src="/logo.png" 
                  alt="Mariech Autospare Logo" 
                  className="h-48 w-auto object-contain"
                />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-2">Mariech Autospare</div>
              <div className="text-gray-600">Quality Parts, Trusted Service</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Quality First',
                description: 'We source only high-quality auto parts from trusted manufacturers to ensure durability and performance.',
                icon: '✓'
              },
              {
                title: 'Customer Focus',
                description: 'Your satisfaction is our priority. We provide expert advice to help you find the right parts for your vehicle.',
                icon: '✓'
              },
              {
                title: 'Competitive Pricing',
                description: 'As a wholesale and retail dealer, we offer the best prices without compromising on quality.',
                icon: '✓'
              },
              {
                title: 'Wide Selection',
                description: 'From LED headlights to body parts, we stock a comprehensive range of accessories for all car models.',
                icon: '✓'
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="w-12 h-12 bg-[#FF6B35] rounded-full flex items-center justify-center mb-4">
                  <span className="text-white text-xl font-bold">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-[#FF6B35] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-600">MSP Plaza, 1st Floor<br />Room No. 14, Nairobi</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-[#FF6B35] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600">0719 101 851<br />0794 382 764</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-[#FF6B35] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Business Hours</h3>
              <p className="text-gray-600">Monday - Friday: 8:00 AM - 7:00 PM<br />Saturday: 8:00 AM - 5:00 PM</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <a
              href="/contact"
              className="inline-block bg-[#FF6B35] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#e55a2b] transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
