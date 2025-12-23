import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const formatPrice = (price) => {
    if (price === null || price === undefined) return null;
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getCompatibleCarsDisplay = () => {
    if (!product.compatible_cars || product.compatible_cars.length === 0) return 'Universal';
    if (product.compatible_cars.includes('All Models')) return 'Universal';
    if (product.compatible_cars.length <= 2) {
      return product.compatible_cars.join(', ');
    }
    return product.compatible_cars[0];
  };

  // Determine badges from product data
  const getBadges = () => {
    const badges = [];
    
    if (product.is_bestseller) badges.push({ type: 'bestseller', label: 'Bestseller', color: 'bg-[#FF6B35]' });
    if (product.is_new) badges.push({ type: 'new', label: 'New', color: 'bg-blue-500' });
    if (product.discount_percent && product.discount_percent > 0) {
      badges.push({ type: 'discount', label: `-${product.discount_percent}%`, color: 'bg-red-500' });
    }
    if (product.stock > 0) {
      badges.push({ type: 'stock', label: '✓ In Stock', color: 'bg-green-500' });
    }
    return badges;
  };

  const badges = getBadges();
  const originalPrice = product.original_price || null;

  // Get bulb types for LED headlights
  const getBulbTypes = () => {
    if (product.subcategory === 'LED Headlights' && product.size) {
      const allSizes = ['H1', 'H3', 'H4', 'H7', 'H11', '9005', '9006'];
      const currentIndex = allSizes.indexOf(product.size);
      if (currentIndex !== -1) {
        const relatedSizes = allSizes.filter((_, idx) => idx !== currentIndex).slice(0, 4);
        return [product.size, ...relatedSizes];
      }
      return [product.size];
    }
    return [];
  };

  const bulbTypes = getBulbTypes();
  const productImage = product.images && product.images.length > 0 ? product.images[0] : (product.image || null);

  return (
    <Link
      to={`/products/${product.id}`}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full group"
    >
      {/* Image Section with Badges */}
      <div className="relative bg-gray-100 h-48 flex items-center justify-center overflow-hidden">
        {productImage ? (
          <img
            src={productImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 ${productImage ? 'hidden' : ''}`}>
          <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2 z-10">
          {badges.filter(b => b.type !== 'stock').map((badge, idx) => (
            <span
              key={idx}
              className={`${badge.color} text-white text-xs font-bold px-2 py-1 rounded`}
            >
              {badge.label}
            </span>
          ))}
        </div>
        
        {/* Stock Badge */}
        {product.stock > 0 && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
            ✓ In Stock
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 flex-grow flex flex-col">
        {/* Category/Type */}
        <div className="text-xs text-gray-500 mb-1 uppercase">
          {product.subcategory || product.category}
        </div>
        
        {/* Product Name */}
        <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Compatibility */}
        <div className="text-xs text-gray-600 mb-3">
          <span className="font-medium">Fits:</span> {getCompatibleCarsDisplay()}
        </div>

        {/* Bulb Types */}
        {bulbTypes.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {bulbTypes.slice(0, 4).map((size, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-[#FF6B35] hover:text-white hover:border-[#FF6B35] transition-colors"
              >
                {size}
              </button>
            ))}
            {bulbTypes.length > 4 && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-[#FF6B35] hover:text-white hover:border-[#FF6B35] transition-colors"
              >
                +{bulbTypes.length - 4}
              </button>
            )}
          </div>
        )}

        {/* Price */}
        <div className="mt-auto pt-3 border-t">
          {product.price_varies || product.price === null ? (
            <div className="text-[#FF6B35] font-bold text-sm">
              Price varies by model
            </div>
          ) : (
            <div>
              {originalPrice && (
                <div className="text-xs text-gray-400 line-through mb-1">
                  {formatPrice(originalPrice)}
                </div>
              )}
              <div className={`font-bold text-gray-900 ${originalPrice ? 'text-base' : 'text-lg'}`}>
                {formatPrice(product.price)}
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
