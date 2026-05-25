import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
            <p className="text-sm text-gray-500 mb-8">Last updated: May 2025</p>

            <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Introduction</h2>
                <p>Mariech Autospare ("we", "us", "our") is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or interact with our business. Please read this policy carefully. By using our Service, you consent to the practices described herein.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Information We Collect</h2>
                <p className="mb-2">We may collect the following categories of information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><span className="font-medium">Personal Identification Information:</span> Name, phone number, and email address provided when you place an order or contact us.</li>
                  <li><span className="font-medium">Transaction Data:</span> Details of products you have purchased or inquired about.</li>
                  <li><span className="font-medium">Communication Data:</span> Messages sent to us via WhatsApp, email, or our contact form.</li>
                  <li><span className="font-medium">Usage Data:</span> Information about how you use our website, including pages visited and time spent (collected through analytics tools).</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">3. How We Use Your Information</h2>
                <p className="mb-2">We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Process and fulfill your orders and inquiries.</li>
                  <li>Communicate with you regarding your order status, delivery, and after-sales support.</li>
                  <li>Improve and optimize our website and product offerings.</li>
                  <li>Comply with legal obligations under Kenyan law.</li>
                  <li>Send promotional communications where you have consented to receive them.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Sharing of Information</h2>
                <p>We do not sell, trade, or rent your personal information to third parties. We may share information with:</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li><span className="font-medium">Delivery Partners:</span> To facilitate countrywide delivery of your orders.</li>
                  <li><span className="font-medium">Payment Processors:</span> To securely process payments.</li>
                  <li><span className="font-medium">Legal Authorities:</span> When required by law or in response to valid legal processes.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Data Retention</h2>
                <p>We retain your personal data for as long as necessary to fulfil the purposes outlined in this policy, or as required by applicable law. Order records are typically retained for a minimum of 5 years for accounting and legal purposes.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Data Security</h2>
                <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, loss, or disclosure. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Your Rights</h2>
                <p className="mb-2">Under applicable Kenyan data protection law (Data Protection Act, 2019), you have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access the personal information we hold about you.</li>
                  <li>Request correction of inaccurate or incomplete data.</li>
                  <li>Request deletion of your personal data where no legal obligation requires us to retain it.</li>
                  <li>Withdraw consent for marketing communications at any time.</li>
                </ul>
                <p className="mt-2">To exercise any of these rights, contact us using the details below.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Cookies</h2>
                <p>Our website may use cookies and similar tracking technologies to enhance your browsing experience and analyse website traffic. You may configure your browser to refuse cookies; however, some features of the website may not function properly as a result.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Third-Party Links</h2>
                <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies before providing any personal information.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Changes to This Policy</h2>
                <p>We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page with an updated effective date. Your continued use of the Service after changes are posted constitutes your acceptance of the revised policy.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Contact Us</h2>
                <p>For any privacy-related concerns or to exercise your rights, please contact us at:</p>
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

export default PrivacyPolicy;
