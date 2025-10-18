import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Size } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';

const StarRating: React.FC<{ rating: number, size?: 'sm' | 'md' }> = ({ rating, size = 'md' }) => {
  const starSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`${starSize} ${i < Math.round(rating) ? 'text-rusty-orange' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.448a1 1 0 00-1.175 0l-3.368 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
        </svg>
      ))}
    </div>
  );
};


export const ProductDetailPage: React.FC = () => {
  const { productSlug } = useParams<{ productSlug: string }>();
  const { products, addToCart, showToast } = useApp();
  const product = products.find(p => p.slug === productSlug);

  const [mainImage, setMainImage] = useState(product?.images[0]);
  const [selectedSize, setSelectedSize] = useState<Size | null>(product?.sizes[0] || null);
  
  if (!product) {
    return <div className="text-center py-20">Ürün bulunamadı.</div>;
  }
  
  const averageRating = product.reviews.length > 0
    ? product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length
    : 0;

  const handleAddToCart = () => {
    if (!selectedSize) {
      showToast('Lütfen bir beden seçin.', 'error');
      return;
    }
    addToCart(product, selectedSize);
  };

  const handleNotifyMe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showToast('Stok geldiğinde size haber vereceğiz!', 'success');
  }

  return (
    <div className="bg-foam-white">
      <div className="container mx-auto px-6 py-12">
        <Breadcrumbs paths={[
          { name: "Ana Sayfa", path: "/" }, 
          { name: "Ürünler", path: "/products" },
          { name: product.name }
        ]} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-6">
          {/* Image Gallery */}
          <div>
            <div className="aspect-square bg-wood-beige mb-4 rounded-lg overflow-hidden">
              <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex space-x-4">
              {product.images.map((img, index) => (
                <button key={index} onClick={() => setMainImage(img)} className={`w-24 h-24 bg-wood-beige p-1 rounded-md ${mainImage === img ? 'ring-2 ring-teal-accent' : ''}`}>
                  <img src={img} alt={`${product.name} - ${index + 1}`} className="w-full h-full object-cover rounded" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl font-poppins font-bold text-storm-blue">{product.name}</h1>
            {averageRating > 0 && (
              <div className="flex items-center space-x-2 my-3">
                <StarRating rating={averageRating} />
                <a href="#reviews" className="text-gray-600 hover:text-teal-accent">({product.reviews.length} değerlendirme)</a>
              </div>
            )}
            <p className="text-3xl font-lato font-bold text-gray-800 my-4">{product.price.toLocaleString('tr-TR')} TL</p>
            <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-storm-blue">Beden</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md transition-colors duration-200 ${
                      selectedSize === size
                        ? 'bg-storm-blue text-white border-storm-blue'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            <p className={`text-sm mb-6 ${product.stock > 5 ? 'text-gray-600' : 'text-rusty-orange font-semibold'}`}>
              Stok: {product.stock > 0 ? (product.stock > 5 ? `${product.stock} adet` : `Sadece ${product.stock} adet kaldı!`) : "Tükendi"}
            </p>

            {product.stock > 0 ? (
                <button
                onClick={handleAddToCart}
                className="w-full bg-forest-green text-white font-bold py-4 px-8 rounded-md text-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
              >
                Sepete Ekle
              </button>
            ) : (
              <div className="border p-4 rounded-lg bg-gray-50">
                  <p className="font-semibold text-center text-storm-blue mb-2">Stokta Olunca Haber Ver</p>
                  <form onSubmit={handleNotifyMe} className="flex flex-col sm:flex-row gap-2">
                    <input type="email" placeholder="E-posta adresiniz" required className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-accent"/>
                    <button type="submit" className="bg-storm-blue text-white font-semibold py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors">
                      Gönder
                    </button>
                  </form>
              </div>
            )}


            <div className="mt-8 border-t pt-6">
              <h3 className="font-poppins font-semibold text-storm-blue mb-2">Malzeme & Bakım</h3>
              <p className="text-gray-600"><span className="font-semibold">Malzeme:</span> {product.material}</p>
              <p className="text-gray-600"><span className="font-semibold">Bakım:</span> {product.care}</p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div id="reviews" className="mt-20 scroll-mt-24">
          <h2 className="text-3xl font-poppins font-bold text-storm-blue border-b pb-4 mb-6">Müşteri Yorumları</h2>
          {product.reviews.length > 0 ? (
            <div className="space-y-8">
              {product.reviews.map(review => (
                <div key={review.id} className="border-b pb-6">
                  <div className="flex items-center mb-2">
                    <StarRating rating={review.rating} size="sm" />
                    <p className="ml-4 font-bold text-storm-blue">{review.author}</p>
                  </div>
                  <p className="text-gray-500 text-sm mb-3">{new Date(review.date).toLocaleDateString('tr-TR')}</p>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">Bu ürün için henüz yorum yapılmamış.</p>
          )}
        </div>

      </div>
    </div>
  );
};