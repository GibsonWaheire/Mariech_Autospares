import Header from '../components/Header';
import Footer from '../components/Footer';

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Return & Refund Policy</h1>
            <p className="text-sm text-gray-500 mb-8">Last updated: May 2025</p>

            <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

              <section>
                <div className="bg-orange-50 border border-[#FF6B35] rounded-lg p-4 mb-6">
                  <p className="text-sm font-medium text-[#FF6B35]">Important Notice</p>
                  <p className="text-sm text-gray-700 mt-1">All return and refund requests must be initiated within <span className="font-semibold">7 days</span> of receiving your order. Requests made after this period will not be accepted.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Eligibility for Returns</h2>
                <p className="mb-2">We accept returns under the following conditions:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>The product is defective or damaged upon delivery.</li>
                  <li>The wrong product was delivered (different from what was ordered).</li>
                  <li>The product is significantly not as described on our website or as communicated at the time of order.</li>
                </ul>
                <p className="mt-3 font-medium">The following items are NOT eligible for return:</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Products that have been installed, used, or modified in any way.</li>
                  <li>Electrical components that have been connected to a vehicle's electrical system.</li>
                  <li>Products returned without original packaging, documentation, or proof of purchase.</li>
                  <li>Products returned due to incompatibility where the customer did not verify fitment before purchase.</li>
                  <li>Special-order or custom items.</li>
                  <li>Products with damage caused by improper installation or misuse.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">2. How to Initiate a Return</h2>
                <p className="mb-2">To initiate a return, please follow these steps:</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Contact us via WhatsApp on <span className="font-medium">0719 101 851</span> or call <span className="font-medium">0794 382 764</span> within 7 days of receiving your order.</li>
                  <li>Provide your order details, a description of the issue, and clear photographs of the product and any defects.</li>
                  <li>Our team will assess your request and respond within 2 business days.</li>
                  <li>If approved, we will advise you on how to return the product. Do not ship or bring in the product before receiving approval.</li>
                  <li>The product must be returned in its original packaging with all accessories and documentation included.</li>
                </ol>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Return Shipping</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>If the return is due to our error (wrong or defective product), Mariech Autospare will cover the return shipping costs.</li>
                  <li>In all other approved cases, the customer is responsible for return shipping costs.</li>
                  <li>We recommend using a trackable shipping service. We are not responsible for items lost in transit during the return process.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Refunds</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Once we receive and inspect the returned product, we will notify you of the outcome of your refund request.</li>
                  <li>Approved refunds will be processed within <span className="font-medium">5–7 business days</span> via the original payment method (M-Pesa or bank transfer).</li>
                  <li>Partial refunds may be issued in cases where only part of an order is returned or where a restocking fee applies.</li>
                  <li>Original delivery charges are non-refundable unless the return is due to our error.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Exchanges</h2>
                <p>We offer exchanges for defective or incorrectly supplied products, subject to stock availability. If the desired replacement is unavailable, a refund will be issued instead. Exchange requests follow the same process as returns outlined in Section 2.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Wholesale Orders</h2>
                <p>Wholesale and bulk orders are subject to separate return terms agreed upon at the time of purchase. Please contact our team directly for wholesale return queries.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Contact Us</h2>
                <p>For all return and refund enquiries, please contact us at:</p>
                <div className="mt-2 pl-4 border-l-4 border-[#FF6B35]">
                  <p className="font-medium">Mariech Autospare</p>
                  <p>MSP Plaza, 1st Floor, Room No. 14, Nairobi, Kenya</p>
                  <p>WhatsApp / Phone: 0719 101 851</p>
                  <p>Phone: 0794 382 764</p>
                  <p>Hours: Mon–Fri 8AM–7PM | Sat 8AM–5PM</p>
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

export default ReturnPolicy;
