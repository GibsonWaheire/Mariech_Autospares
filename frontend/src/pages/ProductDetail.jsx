import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../utils/products';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Product Image Gallery Component
const ProductImageGallery = ({ images, productName }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const productImages = images && images.length > 0 ? images : [];

  if (productImages.length === 0) {
    return (
      <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-gray-400 text-center p-4">
          <svg
            className="w-32 h-32 mx-auto mb-4"
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
          <p className="text-lg">No Image Available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="bg-gray-200 rounded-lg h-[600px] flex items-center justify-center overflow-hidden">
        <img
          src={productImages[selectedImageIndex]}
          alt={`${productName} - Image ${selectedImageIndex + 1}`}
          className="w-full h-full object-contain"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/600x400?text=No+Image';
          }}
        />
      </div>
      
      {/* Thumbnail Gallery */}
      {productImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {productImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all flex items-center justify-center bg-gray-100 ${
                selectedImageIndex === index
                  ? 'border-[#FF6B35] ring-2 ring-[#FF6B35] ring-opacity-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <img
                src={img}
                alt={`${productName} thumbnail ${index + 1}`}
                className="max-w-full max-h-full w-auto h-auto"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get product from local data (instant, no API call)
    const productData = getProductById(id);
    if (productData) {
      setProduct(productData);
    } else {
      setError('Product not found');
    }
  }, [id]);

  const formatPrice = (price) => {
    if (price === null || price === undefined) return null;
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
              <Link to="/shop" className="text-[#FF6B35] hover:text-[#e55a2b] font-semibold">
                ← Back to Shop
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const whatsappNumbers = [
    { number: '254719101851', display: '0719 101 851' },
    { number: '254794382764', display: '0794 382 764' }
  ];

  const productImages = product.images && product.images.length > 0 ? product.images : [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/shop" className="text-[#FF6B35] hover:text-[#e55a2b] mb-4 inline-block font-semibold">
          ← Back to Shop
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-6">
              <ProductImageGallery images={productImages} productName={product.name} />
            </div>
            <div className="md:w-1/2 p-8">
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="text-sm font-semibold text-[#FF6B35] bg-orange-100 px-3 py-1 rounded">
                  {product.category}
                </span>
                {product.subcategory && (
                  <span className="text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded">
                    {product.subcategory}
                  </span>
                )}
                {product.size && (
                  <span className="text-sm font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded">
                    Size: {product.size}
                  </span>
                )}
                {product.is_bestseller && (
                  <span className="text-sm font-semibold text-white bg-[#FF6B35] px-3 py-1 rounded">
                    Bestseller
                  </span>
                )}
                {product.is_new && (
                  <span className="text-sm font-semibold text-white bg-blue-500 px-3 py-1 rounded">
                    New
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              {product.sku && (
                <div className="mb-4">
                  <span className="text-sm text-gray-600">SKU: </span>
                  <span className="text-sm font-semibold text-gray-900">{product.sku}</span>
                </div>
              )}

              <div className="mb-6">
                {product.price_varies || product.price === null ? (
                  <div>
                    <span className="text-4xl font-bold text-[#FF6B35]">Price varies by car model</span>
                    <p className="text-gray-600 mt-2">Contact us for pricing based on your specific car model</p>
                  </div>
                ) : (
                  <div>
                    {product.original_price && (
                      <div className="text-xl text-gray-400 line-through mb-2">
                        {formatPrice(product.original_price)}
                      </div>
                    )}
                    <span className="text-4xl font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                    {product.discount_percent && product.discount_percent > 0 && (
                      <span className="ml-3 text-lg font-semibold text-red-500">
                        Save {product.discount_percent}%
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              {/* Compatibility Information */}
              {product.compatible_cars && product.compatible_cars.length > 0 && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Compatible Cars:</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.compatible_cars.map((car, idx) => (
                      <span key={idx} className="text-sm bg-white px-3 py-1 rounded border border-blue-200">
                        {car}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Product Info */}
              <div className="mb-6 space-y-2">
                {product.car_make && (
                  <div>
                    <span className="text-sm font-semibold text-gray-700">Car Make: </span>
                    <span className="text-sm text-gray-600">{product.car_make}</span>
                  </div>
                )}
                {product.car_model && (
                  <div>
                    <span className="text-sm font-semibold text-gray-700">Car Model: </span>
                    <span className="text-sm text-gray-600">{product.car_model}</span>
                  </div>
                )}
                {product.year_range && (
                  <div>
                    <span className="text-sm font-semibold text-gray-700">Year Range: </span>
                    <span className="text-sm text-gray-600">{product.year_range}</span>
                  </div>
                )}
                {product.variants && product.variants.length > 0 && (
                  <div>
                    <span className="text-sm font-semibold text-gray-700">Variants: </span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {product.variants.map((variant, idx) => (
                        <span key={idx} className="text-sm bg-gray-100 px-3 py-1 rounded">
                          {variant}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <span className="text-sm font-semibold text-gray-700">Available Sizes: </span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {product.sizes.map((size, idx) => (
                        <span key={idx} className="text-sm bg-gray-100 px-3 py-1 rounded">
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <div className="flex items-center space-x-4">
                  <span className={`text-lg font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex space-x-4">
                  <button
                    className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-colors ${
                      product.stock > 0
                        ? 'bg-[#FF6B35] text-white hover:bg-[#e55a2b]'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={product.stock === 0}
                  >
                    {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                  <Link
                    to="/contact"
                    className="px-6 py-3 border-2 border-[#FF6B35] text-[#FF6B35] rounded-lg font-semibold hover:bg-orange-50 transition-colors text-center"
                  >
                    Inquire
                  </Link>
                </div>
                
                {/* WhatsApp Quick Contact */}
                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-600 mb-2">Quick contact via WhatsApp:</p>
                  <div className="flex flex-wrap gap-2">
                    {whatsappNumbers.map((item, idx) => (
                      <a
                        key={idx}
                        href={`https://wa.me/${item.number}?text=Hello, I'm interested in: ${encodeURIComponent(product.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-4 py-2 bg-[#25D366] text-white rounded-lg font-semibold hover:bg-[#20BA5A] transition-colors"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.239-.375a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                        {item.display}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
