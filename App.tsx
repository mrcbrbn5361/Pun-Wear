import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate, Link } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CartPage } from './pages/CartPage';
import { AdminPage } from './pages/AdminPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AccountPage } from './pages/AccountPage';
import { WishlistPage } from './pages/WishlistPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { AppProvider, useApp } from './context/AppContext';

const Toast: React.FC = () => {
    const { toast } = useApp();
    if (!toast) return null;

    const bgColor = toast.type === 'success' ? 'bg-forest-green' : 'bg-rusty-orange';

    return (
        <div className={`fixed top-24 right-5 ${bgColor} text-white py-2 px-6 rounded-lg shadow-lg z-[100] animate-fade-in-out`}>
            {toast.message}
        </div>
    );
};

const MiniCart: React.FC = () => {
    const { cart, cartTotal, isMiniCartOpen, closeMiniCart, removeFromCart } = useApp();
    const [shouldRender, setShouldRender] = React.useState(isMiniCartOpen);

    useEffect(() => {
        if (isMiniCartOpen) {
            setShouldRender(true);
        }
    }, [isMiniCartOpen]);

    const onAnimationEnd = () => {
        if (!isMiniCartOpen) {
            setShouldRender(false);
        }
    };
    
    if(!shouldRender) return null;

    return (
        <>
            <div
                className={`fixed inset-0 bg-black z-50 transition-opacity duration-300 ${isMiniCartOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}
                onClick={closeMiniCart}
            />
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-sm bg-foam-white z-[60] shadow-2xl flex flex-col transform ${isMiniCartOpen ? 'animate-slide-in-right' : 'animate-slide-out-right'}`}
                onAnimationEnd={onAnimationEnd}
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-poppins font-bold text-storm-blue">Sepetim</h2>
                    <button onClick={closeMiniCart} className="text-gray-500 hover:text-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                {cart.length > 0 ? (
                    <>
                        <div className="flex-grow overflow-y-auto p-4 space-y-4">
                            {cart.map(item => (
                                <div key={`${item.id}-${item.selectedSize}`} className="flex items-center">
                                    <img src={item.images[0]} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                                    <div className="flex-grow">
                                        <p className="font-semibold text-storm-blue">{item.name}</p>
                                        <p className="text-sm text-gray-600">{item.selectedSize} / {item.price.toLocaleString('tr-TR')} TL</p>
                                        <p className="text-sm text-gray-600">Adet: {item.quantity}</p>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id, item.selectedSize)} className="text-red-500 text-sm hover:underline">Kaldır</button>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 border-t">
                             <div className="flex justify-between font-bold text-lg mb-4">
                                <span>Toplam</span>
                                <span>{cartTotal.toLocaleString('tr-TR')} TL</span>
                            </div>
                            <Link to="/cart" onClick={closeMiniCart} className="block text-center w-full bg-storm-blue text-white font-bold py-3 rounded-md hover:bg-opacity-90 transition-colors mb-2">Sepete Git</Link>
                            <button className="w-full bg-forest-green text-white font-bold py-3 rounded-md hover:bg-opacity-90 transition-colors">Ödemeye Geç</button>
                        </div>
                    </>
                ) : (
                    <div className="flex-grow flex flex-col items-center justify-center p-4">
                        <p className="text-lg text-gray-700 mb-4">Sepetiniz boş.</p>
                        <Link to="/products" onClick={closeMiniCart} className="bg-forest-green text-white font-bold py-2 px-6 rounded-md hover:bg-opacity-90 transition-colors">Alışverişe Başla</Link>
                    </div>
                )}
            </div>
        </>
    );
};


const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="flex flex-col min-h-screen bg-foam-white">
      {!isAdminPage && !isAuthPage && <Header />}
      <main className="flex-grow">
        {children}
      </main>
      {!isAdminPage && !isAuthPage && <Footer />}
    </div>
  );
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useApp();
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
    return (
        <PageLayout>
            <Toast />
            <MiniCart />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:productSlug" element={<ProductDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:postSlug" element={<BlogPostPage />} />
              <Route path="/account" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />
              <Route path="/wishlist" element={<ProtectedRoute><WishlistPage /></ProtectedRoute>} />
            </Routes>
        </PageLayout>
    )
}

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </HashRouter>
  );
};

export default App;