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
    if (!product.compatible_cars || product.compatible_cars.length === 0) return null;
    if (product.compatible_cars.includes('All Models')) return 'Universal';
    if (product.compatible_cars.length <= 2) {
      return product.compatible_cars.join(', ');
    }
    return `${product.compatible_cars[0]} +${product.compatible_cars.length - 1} more`;
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      <div className="h-48 bg-gray-200 flex items-center justify-center relative">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
            }}
          />
        ) : product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
            }}
          />
        ) : (
          <div className="text-gray-400 text-center p-4">
            <svg
              className="w-16 h-16 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm">No Image</p>
          </div>
        )}
        {product.stock > 0 && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
            In Stock
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            Out of Stock
          </div>
        )}
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="mb-2 flex flex-wrap gap-1">
          <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">
            {product.category}
          </span>
          {product.subcategory && (
            <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded">
              {product.subcategory}
            </span>
          )}
          {product.size && (
            <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded">
              {product.size}
            </span>
          )}
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-grow">
          {product.description}
        </p>

        {product.sku && (
          <p className="text-xs text-gray-500 mb-2">SKU: {product.sku}</p>
        )}

        {getCompatibleCarsDisplay() && (
          <div className="mb-3">
            <p className="text-xs text-gray-600">
              <span className="font-semibold">Fits:</span> {getCompatibleCarsDisplay()}
            </p>
          </div>
        )}

        <div className="mt-auto pt-3 border-t">
          <div className="flex justify-between items-center">
            <div>
              {product.price_varies || product.price === null ? (
                <span className="text-lg font-bold text-gray-900">Price varies by car model</span>
              ) : (
                <span className="text-xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            {product.stock > 0 && !product.price_varies && product.price !== null && (
              <span className="text-sm text-green-600 font-semibold">
                {product.stock} available
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
