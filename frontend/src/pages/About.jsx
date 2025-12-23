const About = () => {
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About Mariech Autospare</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6 leading-relaxed">
              Welcome to Mariech Autospare, your trusted partner for quality auto parts and accessories. 
              We have been serving the automotive community with dedication and excellence, providing 
              reliable solutions for all your vehicle needs.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Our mission is to provide high-quality auto parts and exceptional customer service at 
              competitive prices. We are committed to helping our customers keep their vehicles running 
              smoothly and safely.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">What We Offer</h2>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Wide range of auto parts and accessories</li>
              <li>Quality products from trusted manufacturers</li>
              <li>Competitive pricing</li>
              <li>Expert advice and customer support</li>
              <li>Fast and reliable service</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Location</h2>
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <p className="text-gray-700 font-semibold mb-2">Mariech Autospare</p>
              <p className="text-gray-700">Kirinyaga Road, MSK Building</p>
              <p className="text-gray-700">First Floor</p>
              <p className="text-gray-700">Nairobi, Kenya</p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Quality Assurance</h3>
                <p className="text-gray-700 text-sm">
                  We stock only the highest quality parts from reputable manufacturers, ensuring 
                  reliability and durability for your vehicle.
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Expert Knowledge</h3>
                <p className="text-gray-700 text-sm">
                  Our team has extensive knowledge of automotive parts and can help you find 
                  exactly what you need for your vehicle.
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Customer Service</h3>
                <p className="text-gray-700 text-sm">
                  We prioritize customer satisfaction and are always ready to assist you with 
                  any questions or concerns.
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Competitive Prices</h3>
                <p className="text-gray-700 text-sm">
                  We offer the best prices in the market without compromising on quality, 
                  making auto parts accessible to everyone.
                </p>
              </div>
            </div>

            <p className="text-gray-700 mt-8 leading-relaxed">
              Thank you for choosing Mariech Autospare. We look forward to serving you and 
              helping you keep your vehicle in excellent condition.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

