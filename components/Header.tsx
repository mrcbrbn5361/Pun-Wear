import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Product } from '../types';

export const Header: React.FC = () => {
  const { cart, currentUser, logout, products } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const navigate = useNavigate();

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 1) {
      setSearchResults(
        products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
      );
    } else {
      setSearchResults([]);
    }
  };

  const handleResultClick = (productSlug: string) => {
    setSearchQuery('');
    setSearchResults([]);
    navigate(`/products/${productSlug}`);
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }): string =>
    `block py-2 md:py-0 relative text-lg font-semibold transition-colors duration-300 ${
      isActive ? 'text-rusty-orange' : 'text-storm-blue hover:text-teal-accent'
    }`;
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-foam-white/80 backdrop-blur-md shadow-md">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-poppins font-extrabold text-storm-blue">
          Pun Wear
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" className={navLinkClass}>Ana Sayfa</NavLink>
          <NavLink to="/products" className={navLinkClass}>Ürünler</NavLink>
          <NavLink to="/blog" className={navLinkClass}>Hikayeler</NavLink>
          <NavLink to="/about" className={navLinkClass}>Hakkımızda</NavLink>
          <NavLink to="/contact" className={navLinkClass}>İletişim</NavLink>
        </nav>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Search */}
          <div className="relative hidden sm:block">
            <input 
              type="text" 
              placeholder="Ürün ara..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-40 lg:w-56 px-3 py-1.5 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-teal-accent" 
            />
            {searchResults.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-md shadow-lg border z-10 max-h-80 overflow-y-auto">
                {searchResults.map(p => (
                  <div key={p.id} onClick={() => handleResultClick(p.slug)} className="p-2 hover:bg-gray-100 cursor-pointer text-sm">
                    {p.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Icons */}
          {currentUser && (
             <NavLink to="/wishlist" className="text-storm-blue hover:text-teal-accent transition-colors duration-300">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
               </svg>
            </NavLink>
          )}

          <NavLink to="/cart" className="relative text-storm-blue hover:text-teal-accent transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-rusty-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </NavLink>
          
          {currentUser ? (
             <NavLink to="/account" className="text-storm-blue hover:text-teal-accent transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
             </NavLink>
          ) : (
            <NavLink to="/login" className="hidden md:block bg-storm-blue text-white px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-opacity-90">
              Giriş Yap
            </NavLink>
          )}

          {/* Hamburger Menu Button */}
          <button className="md:hidden text-storm-blue" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-foam-white py-4 px-6 space-y-4">
          <nav className="flex flex-col space-y-4">
            <NavLink to="/" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>Ana Sayfa</NavLink>
            <NavLink to="/products" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>Ürünler</NavLink>
            <NavLink to="/blog" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>Hikayeler</NavLink>
            <NavLink to="/about" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>Hakkımızda</NavLink>
            <NavLink to="/contact" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>İletişim</NavLink>
            <hr/>
            {currentUser ? (
              <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="text-left text-lg font-semibold text-storm-blue hover:text-teal-accent">Çıkış Yap</button>
            ) : (
              <>
                <NavLink to="/login" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>Giriş Yap</NavLink>
                <NavLink to="/register" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>Kayıt Ol</NavLink>
              </>
            )}
            <NavLink to="/admin" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>Admin</NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};