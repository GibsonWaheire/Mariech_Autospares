import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const faqCategories = {
    'Orders & Payments': [
      {
        question: "How do I place an order?",
        answer: "You can place an order by calling us at 0719 101 851 or 0994 382 764, via WhatsApp, or by visiting our store at MSP Plaza, 1st Floor, Room No. 14, Nairobi. For online inquiries, use our contact form."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept cash, mobile money (M-Pesa, Airtel Money), and bank transfers. Payment terms for wholesale orders can be discussed based on your account status."
      },
      {
        question: "Why do some products show 'Price varies by model'?",
        answer: "Some parts have different prices depending on the specific car model due to variations in size, complexity, or availability. Contact us with your car model for an accurate quote."
      },
      {
        question: "Do you offer wholesale pricing?",
        answer: "Yes, we offer competitive wholesale pricing for bulk orders. Contact us to discuss your requirements and get a custom quote. No minimum order required to get started."
      }
    ],
    'Products & Compatibility': [
      {
        question: "How do I know if a part fits my car?",
        answer: "Each product listing includes compatible car models. You can also use our search and filter features to find parts by car make, model, and year. If you're unsure, feel free to contact us with your car details."
      },
      {
        question: "What is the difference between H4, H7, and other headlight sizes?",
        answer: "H4, H7, H1, H3, H11, 9005, and 9006 are different bulb socket types and sizes. H4 is typically used for dual-beam headlights, H7 for single-beam, and the numbers (9005, 9006) refer to specific socket configurations. Check your vehicle's manual or contact us for the correct size for your car."
      },
      {
        question: "Are your products genuine/original?",
        answer: "We stock high-quality aftermarket parts from reputable manufacturers. While we don't sell OEM (Original Equipment Manufacturer) parts, all our products meet quality standards and come with manufacturer warranties where applicable."
      },
      {
        question: "Do you stock parts for all car models?",
        answer: "We stock parts for a wide range of car models, with a focus on popular models in Kenya including Toyota, Mazda, Honda, and Nissan. If you need parts for a specific model, contact us and we'll check availability."
      }
    ],
    'Delivery & Shipping': [
      {
        question: "Do you deliver across Kenya?",
        answer: "Yes, we offer delivery services within Nairobi and surrounding areas. For deliveries outside Nairobi, please contact us to discuss options and pricing."
      },
      {
        question: "How much does delivery cost?",
        answer: "Delivery charges vary depending on location and order size. Contact us with your delivery address and order details for an accurate quote. We offer special arrangements for bulk orders."
      },
      {
        question: "Can I pick up my order from your shop?",
        answer: "Absolutely! You're welcome to pick up your order from our store at MSP Plaza, 1st Floor, Room No. 14, Nairobi. We're open Monday to Saturday, 8:00 AM to 6:00 PM."
      }
    ],
    'Returns & Warranty': [
      {
        question: "What is your return policy?",
        answer: "We accept returns for defective or incorrect items within 7 days of purchase, provided the item is in its original condition and packaging. Please contact us immediately if you need to return an item."
      },
      {
        question: "Do your products come with a warranty?",
        answer: "Warranty terms vary by product type and manufacturer. Most products come with manufacturer warranties. Please ask about specific warranty information when making a purchase."
      },
      {
        question: "What if I receive a defective product?",
        answer: "If you receive a defective product, please contact us immediately. We will arrange for a replacement or refund. Please keep the original packaging and receipt."
      }
    ],
    'Installation & Support': [
      {
        question: "Do you offer installation services?",
        answer: "We specialize in parts supply. However, we can recommend trusted mechanics and installation centers in Nairobi. Contact us for recommendations."
      },
      {
        question: "How do I know if I can install a part myself?",
        answer: "Simple parts like bulbs, filters, and accessories can often be installed by car owners. For complex parts like headlights, body parts, or electrical components, we recommend professional installation. Contact us for guidance on your specific part."
      },
      {
        question: "Do you provide technical support?",
        answer: "Yes, our team has extensive knowledge of automotive parts and can provide technical support and advice. Contact us by phone, WhatsApp, or visit our store for assistance."
      }
    ]
  };

  const toggleFAQ = (category, index) => {
    const key = `${category}-${index}`;
    setOpenIndex(openIndex === key ? null : key);
  };

  const allFAQs = Object.entries(faqCategories).flatMap(([category, faqs]) =>
    faqs.map((faq, index) => ({ ...faq, category, index }))
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-600">Find answers to common questions about our products and services</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === null
                ? 'bg-[#FF6B35] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All
          </button>
          {Object.keys(faqCategories).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-[#FF6B35] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQs by Category */}
        {Object.entries(faqCategories).map(([category, faqs]) => {
          if (selectedCategory && selectedCategory !== category) return null;
          
          return (
            <div key={category} className="mb-8">
              <h2 className="text-2xl font-bold text-[#FF6B35] mb-4">{category}</h2>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {faqs.map((faq, index) => {
                  const key = `${category}-${index}`;
                  return (
                    <div key={index} className="border-b border-gray-200 last:border-b-0">
                      <button
                        onClick={() => toggleFAQ(category, index)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                        <svg
                          className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                            openIndex === key ? 'transform rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {openIndex === key && (
                        <div className="px-6 py-4 bg-gray-50">
                          <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Still Have Questions Section */}
        <div className="mt-12 bg-white border border-gray-200 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Still Have Questions?</h2>
          <p className="text-gray-600 mb-6">Can't find what you're looking for? Our team is here to help!</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/254719101851"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-[#25D366] text-white rounded-lg font-semibold hover:bg-[#20BA5A] transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.239-.375a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Chat on WhatsApp
            </a>
            <a
              href="tel:+254719101851"
              className="inline-flex items-center px-6 py-3 bg-white text-gray-900 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call: 0719 101 851
            </a>
          </div>
        </div>
      </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQs;
