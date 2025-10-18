

import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const CartPage: React.FC = () => {
  const { cart, cartTotal, updateCartQuantity, removeFromCart } = useApp();

  return (
    <div className="bg-foam-white py-12 min-h-screen">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-poppins font-bold text-center mb-10 text-storm-blue">Sepetim</h1>
        {cart.length === 0 ? (
          <div className="text-center">
            <p className="text-xl text-gray-700 mb-6">Sepetinizde henüz ürün bulunmuyor.</p>
            <Link to="/products" className="inline-block bg-forest-green text-white font-bold py-3 px-8 rounded-md hover:bg-opacity-90 transition-all duration-300">
              Alışverişe Başla
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <ul className="space-y-6">
                {cart.map(item => (
                  <li key={`${item.id}-${item.selectedSize}`} className="flex flex-col sm:flex-row items-center bg-white p-4 rounded-lg shadow">
                    <img src={item.images[0]} alt={item.name} className="w-24 h-24 object-cover rounded-md mb-4 sm:mb-0 sm:mr-6" />
                    <div className="flex-grow text-center sm:text-left">
                      <h2 className="text-lg font-semibold text-storm-blue">{item.name}</h2>
                      <p className="text-gray-600">Beden: {item.selectedSize}</p>
                      <p className="text-gray-800 font-bold">{item.price.toLocaleString('tr-TR')} TL</p>
                    </div>
                    <div className="flex items-center mt-4 sm:mt-0 space-x-4">
                      <div className="flex items-center border rounded">
                        <button onClick={() => updateCartQuantity(item.id, item.selectedSize, item.quantity - 1)} className="px-3 py-1 text-gray-600 hover:bg-gray-100">-</button>
                        <span className="px-4 text-gray-800">{item.quantity}</span>
                        <button onClick={() => updateCartQuantity(item.id, item.selectedSize, item.quantity + 1)} className="px-3 py-1 text-gray-600 hover:bg-gray-100">+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.id, item.selectedSize)} className="text-red-500 hover:text-red-700 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow h-fit">
              <h2 className="text-2xl font-poppins font-bold text-storm-blue border-b pb-4 mb-4">Sipariş Özeti</h2>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Ara Toplam</span>
                <span className="font-semibold">{cartTotal.toLocaleString('tr-TR')} TL</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Kargo</span>
                <span className="font-semibold">Ücretsiz</span>
              </div>
              <div className="flex justify-between font-bold text-xl border-t pt-4">
                <span>Toplam</span>
                <span>{cartTotal.toLocaleString('tr-TR')} TL</span>
              </div>
              <button className="w-full mt-6 bg-forest-green text-white font-bold py-3 rounded-md hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105">
                Ödemeye Devam Et
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};