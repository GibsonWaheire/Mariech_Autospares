const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Mariech Autospare</h3>
            <p className="text-gray-400">
              Your trusted partner for quality auto parts and accessories.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Location</h4>
            <p className="text-gray-400">
              Kirinyaga Road, MSK Building<br />
              First Floor<br />
              Nairobi, Kenya
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/products" className="hover:text-white">Products</a></li>
              <li><a href="/about" className="hover:text-white">About Us</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Mariech Autospare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

