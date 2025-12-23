import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600">
            Mariech Autospare
          </Link>
          <nav className="space-x-6">
            <Link to="/" className="text-gray-600 hover:text-gray-900 font-medium">
              Home
            </Link>
            <Link to="/products" className="text-gray-600 hover:text-gray-900 font-medium">
              Products
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900 font-medium">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900 font-medium">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

