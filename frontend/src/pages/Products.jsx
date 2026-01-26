import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { filterProducts, getCategories, getCarMakes, getCarModels, getSizes, getSubcategories } from '../utils/products';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [carMakes, setCarMakes] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [filters, setFilters] = useState({
    category: '',
    subcategory: '',
    car_make: '',
    car_model: '',
    size: '',
    min_price: 0,
    max_price: 100000,
    in_stock: false,
    sort: 'popularity'
  });
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    carMake: true,
    priceRange: true
  });

  // Update search query when URL params change
  useEffect(() => {
    const searchParam = searchParams.get('search') || '';
    setSearchQuery(searchParam);
  }, [searchParams]);

  // Load filter options from local data (instant, no API call)
  useEffect(() => {
    setCategories(getCategories());
    setCarMakes(getCarMakes());
    setSizes(getSizes());
  }, []);

  // Filter products client-side (instant, no API call)
  useEffect(() => {
    const filterParams = {
      ...filters,
      search: searchQuery || undefined,
    };
    
    // Clean up filter params
    Object.keys(filterParams).forEach(key => {
      if (filterParams[key] === '' || filterParams[key] === false || 
          (key === 'min_price' && filterParams[key] === 0) || 
          (key === 'max_price' && filterParams[key] === 100000)) {
        if (key !== 'min_price' && key !== 'max_price') {
          delete filterParams[key];
        }
      }
    });
    
    if (filterParams.min_price === 0 && filterParams.max_price === 100000) {
      delete filterParams.min_price;
      delete filterParams.max_price;
    }
    
    const filtered = filterProducts(filterParams);
    setProducts(filtered);
  }, [filters, searchQuery]);

  // Get subcategories from local data
  useEffect(() => {
    if (filters.category) {
      const data = getSubcategories(filters.category);
      setSubcategories(data.map(s => s.name));
    } else {
      setSubcategories([]);
    }
  }, [filters.category]);

  // Get car models from local data
  useEffect(() => {
    if (filters.car_make) {
      const data = getCarModels(filters.car_make);
      setCarModels(data);
    } else {
      setCarModels([]);
    }
  }, [filters.car_make]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: value };
      if (key === 'category') {
        newFilters.subcategory = '';
      }
      if (key === 'car_make') {
        newFilters.car_model = '';
      }
      return newFilters;
    });
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar - Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Category Section */}
              <div className="border-b border-gray-200">
                <button
                  onClick={() => toggleSection('category')}
                  className="w-full px-4 py-3 flex items-center justify-between text-left font-semibold text-gray-900 hover:bg-gray-50"
                >
                  <span>Category</span>
                  <svg
                    className={`w-5 h-5 transform transition-transform ${expandedSections.category ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedSections.category && (
                  <div className="px-4 pb-4 space-y-2">
                    <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input
                        type="radio"
                        name="category"
                        value=""
                        checked={filters.category === ''}
                        onChange={(e) => handleFilterChange('category', e.target.value)}
                        className="mr-2 text-[#FF6B35]"
                      />
                      <span className={filters.category === '' ? 'text-[#FF6B35] font-medium' : 'text-gray-700'}>
                        All Categories
                      </span>
                    </label>
                    {categories.map(cat => (
                      <label key={cat} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="radio"
                          name="category"
                          value={cat}
                          checked={filters.category === cat}
                          onChange={(e) => handleFilterChange('category', e.target.value)}
                          className="mr-2 text-[#FF6B35]"
                        />
                        <span className={filters.category === cat ? 'text-[#FF6B35] font-medium' : 'text-gray-700'}>
                          {cat}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Car Make Section */}
              <div className="border-b border-gray-200">
                <button
                  onClick={() => toggleSection('carMake')}
                  className="w-full px-4 py-3 flex items-center justify-between text-left font-semibold text-gray-900 hover:bg-gray-50"
                >
                  <span>Car Make</span>
                  <svg
                    className={`w-5 h-5 transform transition-transform ${expandedSections.carMake ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedSections.carMake && (
                  <div className="px-4 pb-4 max-h-64 overflow-y-auto space-y-2">
                    <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input
                        type="radio"
                        name="carMake"
                        value=""
                        checked={filters.car_make === ''}
                        onChange={(e) => handleFilterChange('car_make', e.target.value)}
                        className="mr-2 text-[#FF6B35]"
                      />
                      <span className={filters.car_make === '' ? 'text-[#FF6B35] font-medium' : 'text-gray-700'}>
                        All Makes
                      </span>
                    </label>
                    {carMakes.map(make => (
                      <label key={make} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="radio"
                          name="carMake"
                          value={make}
                          checked={filters.car_make === make}
                          onChange={(e) => handleFilterChange('car_make', e.target.value)}
                          className="mr-2 text-[#FF6B35]"
                        />
                        <span className={filters.car_make === make ? 'text-[#FF6B35] font-medium' : 'text-gray-700'}>
                          {make}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Range Section */}
              <div>
                <button
                  onClick={() => toggleSection('priceRange')}
                  className="w-full px-4 py-3 flex items-center justify-between text-left font-semibold text-gray-900 hover:bg-gray-50"
                >
                  <span>Price Range</span>
                  <svg
                    className={`w-5 h-5 transform transition-transform ${expandedSections.priceRange ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedSections.priceRange && (
                  <div className="px-4 pb-4 space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{formatPrice(filters.min_price)}</span>
                        <span>{formatPrice(filters.max_price)}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100000"
                        step="1000"
                        value={filters.max_price}
                        onChange={(e) => handleFilterChange('max_price', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FF6B35]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.min_price}
                        onChange={(e) => handleFilterChange('min_price', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.max_price}
                        onChange={(e) => handleFilterChange('max_price', parseInt(e.target.value) || 100000)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.in_stock}
                        onChange={(e) => handleFilterChange('in_stock', e.target.checked)}
                        className="mr-2 text-[#FF6B35]"
                      />
                      <span className="text-sm text-gray-700">In Stock Only</span>
                    </label>
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setSearchParams({ search: searchQuery });
                }}
                className="flex gap-2"
              >
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search by part name, car model, size..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pl-10 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35]"
                  />
                  <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#FF6B35] text-white rounded-lg font-semibold hover:bg-[#e55a2b] transition-colors"
                >
                  Search
                </button>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSearchParams({});
                    }}
                    className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Clear
                  </button>
                )}
              </form>
            </div>

            {/* Top Bar - Product Count and Sort */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 flex items-center justify-between">
              <div className="text-gray-700 font-medium">
                {products.length} products found{searchQuery && ` for "${searchQuery}"`}
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={filters.sort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35]"
                >
                  <option value="popularity">Featured</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="name">Name A-Z</option>
                </select>
                <div className="flex items-center space-x-2">
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-lg shadow-sm">
                <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
              </div>
            )}
          </main>
        </div>
      </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
