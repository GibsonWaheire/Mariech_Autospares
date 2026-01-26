import { useState, useEffect } from 'react';

const TrustSection = () => {
  const [stats, setStats] = useState({
    products: 0,
    customers: 0,
    years: 0,
    satisfaction: 0
  });

  // Animate counters on mount
  useEffect(() => {
    const targetStats = {
      products: 150,
      customers: 5000,
      years: 10,
      satisfaction: 98
    };

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setStats({
        products: Math.floor(targetStats.products * progress),
        customers: Math.floor(targetStats.customers * progress),
        years: Math.floor(targetStats.years * progress),
        satisfaction: Math.floor(targetStats.satisfaction * progress)
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setStats(targetStats);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: "John Mwangi",
      role: "Car Owner",
      location: "Nairobi",
      text: "Excellent quality LED headlights! The installation was easy and the brightness is amazing. Great customer service too.",
      rating: 5
    },
    {
      name: "Sarah Wanjiku",
      role: "Auto Shop Owner",
      location: "Mombasa",
      text: "We've been ordering wholesale parts from Mariech Autospare for 2 years. Always reliable, quality products, and fast delivery.",
      rating: 5
    },
    {
      name: "David Ochieng",
      role: "Mechanic",
      location: "Kisumu",
      text: "Best prices in Kenya for auto parts. The body parts fit perfectly and the quality is top-notch. Highly recommended!",
      rating: 5
    }
  ];

  const trustBadges = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Quality Guaranteed",
      description: "All products tested and verified"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      ),
      title: "Countrywide Delivery",
      description: "Fast and reliable shipping"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Best Prices",
      description: "Wholesale & retail rates"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "Expert Support",
      description: "24/7 customer assistance"
    }
  ];

  return (
    <section className="py-16 lg:py-20 bg-white" aria-label="Trust and social proof">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Counter */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-[#FF6B35] mb-2">
              {stats.products}+
            </div>
            <div className="text-gray-600 font-medium">Products</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-[#FF6B35] mb-2">
              {stats.customers.toLocaleString()}+
            </div>
            <div className="text-gray-600 font-medium">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-[#FF6B35] mb-2">
              {stats.years}+
            </div>
            <div className="text-gray-600 font-medium">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-[#FF6B35] mb-2">
              {stats.satisfaction}%
            </div>
            <div className="text-gray-600 font-medium">Satisfaction Rate</div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {trustBadges.map((badge, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200 hover:border-[#FF6B35] transition-colors"
            >
              <div className="text-[#FF6B35] mb-3 flex justify-center">
                {badge.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{badge.title}</h3>
              <p className="text-sm text-gray-600">{badge.description}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            What Our <span className="text-[#FF6B35]">Customers</span> Say
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Don't just take our word for it - hear from satisfied customers across Kenya
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role} • {testimonial.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
