const About = () => {
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About Mariech Autospare</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6 leading-relaxed">
              Welcome to Mariech Autospare, your trusted partner for quality auto parts and accessories. 
              We are a wholesale and retail autospare dealer specializing in body parts, car accessories, 
              lighting systems, and exterior & interior accessories.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Business</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Mariech Autospare is a leading autospare dealer in Nairobi, serving both wholesale and retail customers. 
              We stock a comprehensive range of auto parts and accessories, with a focus on:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li><strong>Body Parts:</strong> Bonnets, Bumpers, Spoilers, Fender parts, and more</li>
              <li><strong>Car Accessories:</strong> Gear knobs, Wind breakers, Mud flaps, Boot shocks, Car mats, Interior trims</li>
              <li><strong>Lighting Systems:</strong> LED Headlights, Projector Headlights, Fog Lights, DRLs, Horns, Alarms</li>
              <li><strong>Exterior & Interior Accessories:</strong> Complete range of styling and functional accessories</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Location</h2>
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <p className="text-gray-700 font-semibold mb-2">Mariech Autospare</p>
              <p className="text-gray-700">Nairobi, MSP Plaza</p>
              <p className="text-gray-700">1st Floor, Room No. 14</p>
              <p className="text-gray-700">Nairobi, Kenya</p>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-gray-700"><strong>Phone:</strong> 0719 101 851 / 0994 382 764</p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Wide Selection</h3>
                <p className="text-gray-700 text-sm">
                  We stock over 150+ products across multiple categories, ensuring you find exactly what you need 
                  for your vehicle.
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Wholesale & Retail</h3>
                <p className="text-gray-700 text-sm">
                  We serve both individual customers and businesses, offering competitive pricing for bulk orders 
                  and retail purchases.
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Expert Knowledge</h3>
                <p className="text-gray-700 text-sm">
                  Our team has extensive knowledge of automotive parts and can help you find the right parts 
                  for your specific car model.
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Quality Assurance</h3>
                <p className="text-gray-700 text-sm">
                  We stock only quality parts from reputable manufacturers, ensuring reliability and durability 
                  for your vehicle.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Our mission is to provide high-quality auto parts and exceptional customer service at competitive prices. 
              We are committed to helping our customers keep their vehicles running smoothly and safely, whether they 
              are individual car owners or businesses in need of wholesale supplies.
            </p>

            <p className="text-gray-700 mt-8 leading-relaxed">
              Thank you for choosing Mariech Autospare. We look forward to serving you and helping you find the 
              perfect parts for your vehicle.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
