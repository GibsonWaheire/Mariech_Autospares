import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { getProducts, getCategories, getCarMakes, getSizes } from '../utils/api';

const ProductGrid = ({ searchQuery = '', initialCategory = '' }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [carMakes, setCarMakes] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: initialCategory,
    car_make: '',
    size: '',
    in_stock: false,
    sort: 'popularity'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, makesData, sizesData] = await Promise.all([
          getCategories(),
          getCarMakes(),
          getSizes()
        ]);
        setCategories(categoriesData);
        setCarMakes(makesData);
        setSizes(sizesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const filterParams = {
          ...filters,
          search: searchQuery || undefined,
        };
        Object.keys(filterParams).forEach(key => {
          if (filterParams[key] === '' || filterParams[key] === false) {
            delete filterParams[key];
          }
        });
        const data = await getProducts(filterParams);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters, searchQuery]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Sidebar Filters */}
      <aside className="lg:w-64 flex-shrink-0">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35]"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Car Make */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Car Make</label>
            <select
              value={filters.car_make}
              onChange={(e) => handleFilterChange('car_make', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35]"
            >
              <option value="">All Makes</option>
              {carMakes.map(make => (
                <option key={make} value={make}>{make}</option>
              ))}
            </select>
          </div>

          {/* Size */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
            <select
              value={filters.size}
              onChange={(e) => handleFilterChange('size', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35]"
            >
              <option value="">All Sizes</option>
              {sizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              value={filters.sort}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35]"
            >
              <option value="popularity">Featured</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>

          {/* In Stock Only */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.in_stock}
                onChange={(e) => handleFilterChange('in_stock', e.target.checked)}
                className="mr-2 text-[#FF6B35]"
              />
              <span className="text-sm text-gray-700">In Stock Only</span>
            </label>
          </div>
        </div>
      </aside>

      {/* Products Grid */}
      <main className="flex-1">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#FF6B35] border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="mb-4 text-gray-700 font-medium">
              {products.length} products found
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm">
            <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductGrid;

