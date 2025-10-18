import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Product, Order, CartItem, Size, User, BlogPost, Category, OrderStatus } from '../types';
import { initialProducts, initialOrders, initialUsers, initialBlogPosts, initialCategories, slugify } from '../data/products';

type ToastMessage = {
  message: string;
  type: 'success' | 'error';
} | null;

interface AppContextType {
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'reviews' | 'slug'>) => void;
  updateProduct: (updatedProduct: Product) => void;
  deleteProduct: (productId: number) => void;
  
  // Orders
  orders: Order[];
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size: Size) => void;
  removeFromCart: (productId: number, size: Size) => void;
  updateCartQuantity: (productId: number, size: Size, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  isMiniCartOpen: boolean;
  openMiniCart: () => void;
  closeMiniCart: () => void;
  
  // Auth
  users: User[];
  currentUser: User | null;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  register: (name: string, email: string, pass: string) => boolean;

  // Wishlist
  wishlist: Product[];
  toggleWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  
  // Blog
  blogPosts: BlogPost[];

  // Categories
  categories: Category[];

  // Toast
  toast: ToastMessage;
  showToast: (message: string, type: 'success' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('punwear_user');
    if (storedUser) {
      const foundUser = initialUsers.find(u => u.id === JSON.parse(storedUser).id);
      return foundUser || null;
    }
    return null;
  });
  const [blogPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [categories] = useState<Category[]>(initialCategories);
  const [toast, setToast] = useState<ToastMessage>(null);

  // AUTH
  const login = (email: string, pass: string): boolean => {
    const user = users.find(u => u.email === email && u.password === pass);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('punwear_user', JSON.stringify({id: user.id}));
      return true;
    }
    return false;
  };
  
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('punwear_user');
  };
  
  const register = (name: string, email: string, pass: string): boolean => {
     if (users.some(u => u.email === email)) {
       return false; // User already exists
     }
     const newUser: User = {
       id: Date.now(),
       name,
       email,
       password: pass,
       addresses: [],
       wishlist: [],
     };
     setUsers(prev => [...prev, newUser]);
     setCurrentUser(newUser);
     localStorage.setItem('punwear_user', JSON.stringify({id: newUser.id}));
     return true;
  };

  // PRODUCTS
  const addProduct = (productData: Omit<Product, 'id'|'reviews' | 'slug'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now(),
      slug: slugify(productData.name),
      reviews: [],
    };
    setProducts(prev => [newProduct, ...prev]);
  };
  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? { ...updatedProduct, slug: slugify(updatedProduct.name)} : p));
  };
  const deleteProduct = (productId: number) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  // ORDERS
  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  // CART
  const openMiniCart = () => setIsMiniCartOpen(true);
  const closeMiniCart = () => setIsMiniCartOpen(false);

  const addToCart = (product: Product, size: Size) => {
    if (product.stock === 0) {
      showToast("Bu ürün stokta yok.", "error");
      return;
    }
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize: size }];
    });
    showToast(`${product.name} sepete eklendi!`, 'success');
    openMiniCart();
  };

  const removeFromCart = (productId: number, size: Size) => {
    setCart(prev => prev.filter(item => !(item.id === productId && item.selectedSize === size)));
  };

  const updateCartQuantity = (productId: number, size: Size, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
    } else {
      setCart(prev =>
        prev.map(item =>
          item.id === productId && item.selectedSize === size ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => setCart([]);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // WISHLIST
  const toggleWishlist = (productId: number) => {
    if (!currentUser) {
      showToast("Favorilere eklemek için giriş yapmalısınız.", "error");
      return;
    }
    setCurrentUser(prevUser => {
      if (!prevUser) return null;
      const newWishlist = prevUser.wishlist.includes(productId)
        ? prevUser.wishlist.filter(id => id !== productId)
        : [...prevUser.wishlist, productId];
      const updatedUser = { ...prevUser, wishlist: newWishlist };
      
      // Also update the main users list
      setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));

      return updatedUser;
    });
  };

  const isInWishlist = (productId: number) => currentUser?.wishlist.includes(productId) ?? false;
  const wishlist = products.filter(p => currentUser?.wishlist.includes(p.id));

  // TOAST
  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <AppContext.Provider
      value={{
        products, addProduct, updateProduct, deleteProduct,
        orders, updateOrderStatus,
        cart, addToCart, removeFromCart, updateCartQuantity, clearCart, cartTotal, isMiniCartOpen, openMiniCart, closeMiniCart,
        users, currentUser, login, logout, register,
        wishlist, toggleWishlist, isInWishlist,
        blogPosts,
        categories,
        toast, showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};