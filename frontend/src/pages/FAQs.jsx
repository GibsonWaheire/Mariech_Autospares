import { useState } from 'react';

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Do you offer both wholesale and retail services?",
      answer: "Yes, Mariech Autospare serves both wholesale and retail customers. We offer competitive pricing for bulk orders and individual purchases. Contact us for wholesale pricing."
    },
    {
      question: "How do I know if a part fits my car?",
      answer: "Each product listing includes compatible car models. You can also use our search and filter features to find parts by car make, model, and year. If you're unsure, feel free to contact us with your car details."
    },
    {
      question: "Why do some products show 'Price varies by car model'?",
      answer: "Some parts have different prices depending on the specific car model due to variations in size, complexity, or availability. Contact us with your car model for an accurate quote."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept cash, mobile money (M-Pesa, Airtel Money), and bank transfers. Payment terms for wholesale orders can be discussed based on your account status."
    },
    {
      question: "Do you deliver products?",
      answer: "Yes, we offer delivery services within Nairobi and surrounding areas. Delivery charges may apply depending on location and order size. Contact us for delivery options and pricing."
    },
    {
      question: "What are your business hours?",
      answer: "We are open Monday to Friday from 8:00 AM to 6:00 PM, and Saturday from 9:00 AM to 4:00 PM. We are closed on Sundays."
    },
    {
      question: "Can I visit your store to see products?",
      answer: "Absolutely! We welcome walk-in customers at our location: Nairobi, MSP Plaza, 1st Floor, Room No. 14. Our team is available to help you find the right parts for your vehicle."
    },
    {
      question: "Do you offer installation services?",
      answer: "We specialize in parts supply. However, we can recommend trusted mechanics and installation centers in Nairobi. Contact us for recommendations."
    },
    {
      question: "What if a product is out of stock?",
      answer: "If a product is out of stock, we can place a special order for you. Contact us with the product details and we'll check availability and provide an estimated delivery time."
    },
    {
      question: "Do you offer warranties on products?",
      answer: "Warranty terms vary by product type and manufacturer. Most products come with manufacturer warranties. Please ask about specific warranty information when making a purchase."
    },
    {
      question: "How can I contact you for inquiries?",
      answer: "You can reach us by phone at 0719 101 851 or 0994 382 764, via WhatsApp, or by visiting our store. You can also use the contact form on our website."
    },
    {
      question: "Do you stock parts for all car models?",
      answer: "We stock parts for a wide range of car models, with a focus on popular models in Kenya including Toyota, Mazda, Honda, and Nissan. If you need parts for a specific model, contact us and we'll check availability."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-600">Find answers to common questions about our products and services</p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 last:border-b-0">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Still have questions?</h2>
          <p className="text-gray-700 mb-4">Contact us and we'll be happy to help!</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+254719101851"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              0719 101 851
            </a>
            <a
              href="tel:+254994382764"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              0994 382 764
            </a>
            <a
              href="/contact"
              className="inline-flex items-center px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Contact Form
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;

