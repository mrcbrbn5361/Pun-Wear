import React from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Link } from 'react-router-dom';

export const WishlistPage: React.FC = () => {
    const { wishlist } = useApp();

    return (
        <div className="container mx-auto px-6 py-12">
            <Breadcrumbs paths={[{ name: "Ana Sayfa", path: "/" }, { name: "Favorilerim" }]} />
            <h1 className="text-4xl font-poppins font-bold text-center mb-10 text-storm-blue">Favorilerim</h1>
            {wishlist.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {wishlist.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-xl text-gray-700 mb-6">Favori listenizde henüz ürün bulunmuyor.</p>
                    <Link to="/products" className="bg-forest-green text-white font-bold py-3 px-8 rounded-md hover:bg-opacity-90 transition-all duration-300">
                        Alışverişe Başla
                    </Link>
                </div>
            )}
        </div>
    );
};
