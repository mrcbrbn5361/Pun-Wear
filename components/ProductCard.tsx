import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex justify-center">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < rating ? 'text-rusty-orange' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.448a1 1 0 00-1.175 0l-3.368 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
        </svg>
      ))}
    </div>
  );
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleWishlist, isInWishlist } = useApp();
  const isFavorited = isInWishlist(product.id);
  const averageRating = product.reviews.length > 0
    ? product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length
    : 0;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to product page
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div className="group block overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl rounded-lg">
      <div className="relative h-[400px] sm:h-[450px] bg-wood-beige overflow-hidden rounded-t-lg">
        <Link to={`/products/${product.slug}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0 transition-opacity duration-500"
            loading="lazy"
          />
          <img
            src={product.images[1] || product.images[0]}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            loading="lazy"
          />
        </Link>
        <button
          onClick={handleWishlistClick}
          className="absolute top-4 right-4 bg-white/70 backdrop-blur-sm rounded-full p-2 text-storm-blue hover:text-rusty-orange transition-all duration-300 z-10 scale-100 hover:scale-110"
          aria-label="Favorilere ekle"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isFavorited ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.5} className="w-6 h-6 text-rusty-orange">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        </button>
      </div>
      <div className="relative bg-foam-white pt-4 pb-4 text-center rounded-b-lg">
        {averageRating > 0 && (
          <div className="mb-2">
            <StarRating rating={averageRating} />
          </div>
        )}
        <h3 className="text-lg font-poppins text-storm-blue">
          <Link to={`/products/${product.slug}`} className="hover:text-teal-accent transition-colors duration-300">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1.5 text-lg font-lato font-bold text-gray-800">{product.price.toLocaleString('tr-TR')} TL</p>
      </div>
    </div>
  );
};