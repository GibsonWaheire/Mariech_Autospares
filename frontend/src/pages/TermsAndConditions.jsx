import Header from '../components/Header';
import Footer from '../components/Footer';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms and Conditions</h1>
            <p className="text-sm text-gray-500 mb-8">Last updated: May 2025</p>

            <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Agreement to Terms</h2>
                <p>By accessing or using the Mariech Autospare website and services (collectively, the "Service"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, you may not access or use the Service. These Terms apply to all visitors, customers, and others who access or use the Service.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Business Information</h2>
                <p>Mariech Autospare ("we", "us", "our") is a registered autospare dealer operating from MSP Plaza, 1st Floor, Room No. 14, Nairobi, Kenya. We deal in the wholesale and retail of automotive spare parts, body parts, lighting equipment, and related accessories.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Products and Pricing</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>All prices displayed on the website are in Kenyan Shillings (KES) and are subject to change without prior notice.</li>
                  <li>Product images are for illustration purposes only. Actual products may vary slightly in appearance.</li>
                  <li>We reserve the right to limit the quantity of any product sold per customer.</li>
                  <li>Wholesale prices are available upon request and may differ from the listed retail prices.</li>
                  <li>We make every effort to ensure product descriptions and specifications are accurate; however, we do not warrant that descriptions are error-free.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Orders and Payment</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Placing an order constitutes an offer to purchase a product at the listed price. We reserve the right to accept or decline any order at our sole discretion.</li>
                  <li>An order is confirmed only upon receipt of full payment or a mutually agreed deposit.</li>
                  <li>We accept payment via M-Pesa, bank transfer, and cash. Payment details will be provided upon order confirmation.</li>
                  <li>We are not liable for any payment errors made by the customer during the transaction process.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Delivery</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>We offer countrywide delivery across Kenya. Delivery timelines and charges vary by location and will be communicated at time of order.</li>
                  <li>We are not responsible for delays caused by third-party courier services, natural disasters, or other circumstances beyond our control.</li>
                  <li>Risk of loss and title for items pass to you upon delivery to the courier or upon collection from our premises.</li>
                  <li>Customers are responsible for inspecting goods upon delivery and must report any visible damage or discrepancy within 24 hours of receipt.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Compatibility and Fitment</h2>
                <p>It is the customer's responsibility to verify that any part or accessory is compatible with their specific vehicle before placing an order. While we provide compatibility information to the best of our knowledge, we strongly recommend confirming fitment with a qualified mechanic. Mariech Autospare shall not be liable for any damage resulting from the installation of an incompatible product.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Warranty</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Products are sold with a manufacturer's warranty where applicable. Warranty periods vary by product and supplier.</li>
                  <li>Warranty claims must be submitted with proof of purchase and are subject to assessment by our team.</li>
                  <li>Warranty does not cover damage resulting from improper installation, misuse, accidents, or normal wear and tear.</li>
                  <li>We do not offer warranty on electrical components once they have been installed, unless the defect is identified as a manufacturing fault.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Limitation of Liability</h2>
                <p>To the maximum extent permitted by applicable law, Mariech Autospare shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profit, data, or goodwill, arising out of or in connection with your use of the Service or any products purchased. Our total liability in any matter arising out of or related to these Terms shall not exceed the amount paid by you for the specific product giving rise to the claim.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Intellectual Property</h2>
                <p>All content on this website, including text, images, logos, graphics, and software, is the property of Mariech Autospare or its content suppliers and is protected under applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written consent.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Governing Law</h2>
                <p>These Terms shall be governed by and construed in accordance with the laws of the Republic of Kenya. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of Nairobi, Kenya.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Changes to Terms</h2>
                <p>We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the Service after any changes constitutes your acceptance of the new Terms.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Contact</h2>
                <p>For any questions regarding these Terms and Conditions, please contact us at:</p>
                <div className="mt-2 pl-4 border-l-4 border-[#FF6B35]">
                  <p className="font-medium">Mariech Autospare</p>
                  <p>MSP Plaza, 1st Floor, Room No. 14, Nairobi, Kenya</p>
                  <p>Phone: 0719 101 851 / 0794 382 764</p>
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsAndConditions;
