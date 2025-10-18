import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Product, Order, Category, Size, Color, User, OrderStatus } from '../types';
import { Link } from 'react-router-dom';

// Using a mock authentication state for the prototype
let isAuthenticated = false;

const AdminLogin: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple mock password
      isAuthenticated = true;
      onLogin();
      setError('');
    } else {
      setError('Geçersiz şifre.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-wood-beige">
      <form onSubmit={handleLogin} className="p-8 bg-white rounded-lg shadow-xl w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-storm-blue mb-6">Admin Girişi</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">Şifre</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-accent"
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button type="submit" className="w-full bg-storm-blue text-white py-2 rounded-md hover:bg-opacity-90 transition-colors">
          Giriş Yap
        </button>
      </form>
    </div>
  );
};


const Dashboard: React.FC = () => {
    const { orders, products } = useApp();
    const recentOrders = useMemo(() => orders.slice(0, 5), [orders]);
    const totalRevenue = useMemo(() => orders.reduce((sum, order) => sum + order.total, 0), [orders]);
    const topSellers = useMemo(() => {
        const sales = new Map<string, number>();
        orders.forEach(order => {
            order.items.forEach(item => {
                sales.set(item.name, (sales.get(item.name) || 0) + item.quantity);
            });
        });
        return [...sales.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3);
    }, [orders]);
    const lowStockProducts = useMemo(() => products.filter(p => p.stock > 0 && p.stock <= 5), [products]);

    const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({ title, value, icon }) => (
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <div className="text-3xl text-teal-accent">{icon}</div>
            <div>
                <p className="text-gray-500 text-sm">{title}</p>
                <p className="text-2xl font-bold text-storm-blue">{value}</p>
            </div>
        </div>
    );

    return (
        <div>
            <h3 className="text-3xl font-poppins font-semibold mb-6">Kontrol Paneli</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Toplam Gelir" value={`${totalRevenue.toLocaleString('tr-TR')} TL`} icon={'💰'} />
                <StatCard title="Toplam Sipariş" value={orders.length.toString()} icon={'📦'} />
                <StatCard title="Yeni Siparişler" value={orders.filter(o => o.status === 'Yeni').length.toString()} icon={'✨'} />
                <StatCard title="Düşük Stok" value={lowStockProducts.length.toString()} icon={'⚠️'} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h4 className="font-semibold mb-4">Son Siparişler</h4>
                    <ul className="space-y-2 text-sm">
                        {recentOrders.map(o => <li key={o.id} className="flex justify-between"><span>#{o.id} - {o.customerName}</span> <span>{o.total} TL</span></li>)}
                    </ul>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h4 className="font-semibold mb-4">En Çok Satanlar</h4>
                    <ul className="space-y-2 text-sm">
                        {topSellers.map(([name, count]) => <li key={name} className="flex justify-between"><span>{name}</span> <span>({count} adet)</span></li>)}
                    </ul>
                </div>
            </div>
        </div>
    );
};


const ProductManager: React.FC = () => {
    const { products, categories, addProduct, updateProduct, deleteProduct, showToast } = useApp();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const openModalForNew = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const openModalForEdit = (product: Product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };
    
    const handleDelete = (product: Product) => {
        if (window.confirm(`'${product.name}' ürününü silmek istediğinizden emin misiniz?`)) {
            deleteProduct(product.id);
            showToast("Ürün başarıyla silindi.", "success");
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-poppins font-semibold">Ürün Yönetimi</h3>
                <button onClick={openModalForNew} className="bg-forest-green text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors">Yeni Ürün Ekle</button>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left text-sm font-semibold text-gray-600">Ürün Adı</th>
                            <th className="p-3 text-left text-sm font-semibold text-gray-600">Kategori</th>
                            <th className="p-3 text-left text-sm font-semibold text-gray-600">Fiyat</th>
                            <th className="p-3 text-left text-sm font-semibold text-gray-600">Stok</th>
                            <th className="p-3 text-sm font-semibold text-gray-600">Eylemler</th>
                        </tr>
                    </thead>
                    <tbody>
                    {products.map(p => (
                        <tr key={p.id} className="border-b hover:bg-gray-50">
                            <td className="p-3">{p.name}</td>
                            <td className="p-3">{p.category}</td>
                            <td className="p-3">{p.price} TL</td>
                            <td className="p-3">{p.stock}</td>
                            <td className="p-3 text-center">
                                <button onClick={() => openModalForEdit(p)} className="text-teal-accent hover:underline mr-4">Düzenle</button>
                                <button onClick={() => handleDelete(p)} className="text-rusty-orange hover:underline">Sil</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {isModalOpen && <ProductForm product={editingProduct} onClose={closeModal} />}
        </div>
    );
};

const ProductForm: React.FC<{ product: Product | null; onClose: () => void }> = ({ product, onClose }) => {
    const { categories, addProduct, updateProduct, showToast } = useApp();
    const isEditing = !!product;
    
    const [formData, setFormData] = useState({
        name: product?.name || '',
        price: product?.price || 0,
        description: product?.description || '',
        category: product?.category || categories[0],
        images: product?.images.join(', ') || '',
        sizes: product?.sizes || [],
        color: product?.color || 'Fırtına Mavisi',
        stock: product?.stock || 0,
        material: product?.material || '',
        care: product?.care || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: name === 'price' || name === 'stock' ? Number(value) : value }));
    };

    const handleSizeChange = (size: Size) => {
        setFormData(prev => {
            const newSizes = prev.sizes.includes(size)
                ? prev.sizes.filter(s => s !== size)
                : [...prev.sizes, size];
            return { ...prev, sizes: newSizes };
        });
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const productData = {
            ...formData,
            images: formData.images.split(',').map(img => img.trim()),
        };

        if (isEditing) {
            updateProduct({ ...product, ...productData });
            showToast("Ürün başarıyla güncellendi.", "success");
        } else {
            addProduct(productData);
            showToast("Ürün başarıyla eklendi.", "success");
        }
        onClose();
    };

    const allSizes: Size[] = ["S", "M", "L", "XL"];
    const allColors: Color[] = ["Fırtına Mavisi", "Yeşilova Yeşili", "Ahşap Beji", "Köpük Beyazı", "Paslı Turuncu"];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-full overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-storm-blue mb-4">{isEditing ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="md:col-span-2"><label className="block text-sm font-medium">Ürün Adı</label><input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border rounded p-2" required /></div>
                           <div><label className="block text-sm font-medium">Fiyat</label><input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full border rounded p-2" required /></div>
                           <div><label className="block text-sm font-medium">Stok</label><input type="number" name="stock" value={formData.stock} onChange={handleChange} className="w-full border rounded p-2" required /></div>
                           <div className="md:col-span-2"><label className="block text-sm font-medium">Açıklama</label><textarea name="description" value={formData.description} onChange={handleChange} className="w-full border rounded p-2" rows={3}></textarea></div>
                           <div><label className="block text-sm font-medium">Kategori</label><select name="category" value={formData.category} onChange={handleChange} className="w-full border rounded p-2">{categories.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                           <div><label className="block text-sm font-medium">Renk</label><select name="color" value={formData.color} onChange={handleChange} className="w-full border rounded p-2">{allColors.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                           <div className="md:col-span-2"><label className="block text-sm font-medium">Görseller (URL, virgülle ayırın)</label><input type="text" name="images" value={formData.images} onChange={handleChange} className="w-full border rounded p-2" /></div>
                           <div className="md:col-span-2"><label className="block text-sm font-medium">Bedenler</label><div className="flex gap-4">{allSizes.map(s => <label key={s} className="flex items-center"><input type="checkbox" checked={formData.sizes.includes(s)} onChange={() => handleSizeChange(s)} className="mr-1"/>{s}</label>)}</div></div>
                           <div><label className="block text-sm font-medium">Materyal</label><input type="text" name="material" value={formData.material} onChange={handleChange} className="w-full border rounded p-2" /></div>
                           <div><label className="block text-sm font-medium">Bakım</label><input type="text" name="care" value={formData.care} onChange={handleChange} className="w-full border rounded p-2" /></div>
                        </div>
                    </div>
                    <div className="bg-gray-100 p-4 flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="bg-gray-200 py-2 px-4 rounded hover:bg-gray-300">İptal</button>
                        <button type="submit" className="bg-forest-green text-white py-2 px-4 rounded hover:bg-opacity-90">{isEditing ? 'Kaydet' : 'Oluştur'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const OrderManager: React.FC = () => {
    const { orders, updateOrderStatus } = useApp();
    const orderStatuses: OrderStatus[] = ["Yeni", "Hazırlanıyor", "Kargoya Verildi", "Tamamlandı", "İptal"];
    return (
        <div>
             <h3 className="text-2xl font-poppins font-semibold mb-4">Sipariş Yönetimi</h3>
             <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left text-sm font-semibold text-gray-600">Sipariş ID</th>
                            <th className="p-3 text-left text-sm font-semibold text-gray-600">Müşteri</th>
                            <th className="p-3 text-left text-sm font-semibold text-gray-600">Tarih</th>
                            <th className="p-3 text-left text-sm font-semibold text-gray-600">Tutar</th>
                            <th className="p-3 text-left text-sm font-semibold text-gray-600">Durum</th>
                        </tr>
                    </thead>
                     <tbody>
                        {orders.map(o => (
                            <tr key={o.id} className="border-b hover:bg-gray-50">
                                <td className="p-3 font-mono">{o.id}</td>
                                <td className="p-3">{o.customerName}</td>
                                <td className="p-3">{o.date}</td>
                                <td className="p-3">{o.total.toLocaleString('tr-TR')} TL</td>
                                <td className="p-3">
                                   <select
                                        value={o.status}
                                        onChange={(e) => updateOrderStatus(o.id, e.target.value as OrderStatus)}
                                        className="border rounded-md p-1 focus:ring-teal-accent focus:border-teal-accent">
                                       {orderStatuses.map(s => <option key={s}>{s}</option>)}
                                   </select>
                                </td>
                            </tr>
                        ))}
                     </tbody>
                 </table>
             </div>
        </div>
    );
};

const UserManager: React.FC = () => {
    const { users } = useApp();
    return (
        <div>
            <h3 className="text-2xl font-poppins font-semibold mb-4">Kullanıcı Yönetimi</h3>
            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                 <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left text-sm font-semibold text-gray-600">ID</th>
                            <th className="p-3 text-left text-sm font-semibold text-gray-600">Ad</th>
                            <th className="p-3 text-left text-sm font-semibold text-gray-600">E-posta</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u.id} className="border-b hover:bg-gray-50">
                                <td className="p-3">{u.id}</td>
                                <td className="p-3">{u.name}</td>
                                <td className="p-3">{u.email}</td>
                            </tr>
                        ))}
                    </tbody>
                 </table>
            </div>
        </div>
    );
};

export const AdminPage: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(isAuthenticated);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'users' | 'blog'>('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  if (!loggedIn) {
    return <AdminLogin onLogin={() => setLoggedIn(true)} />;
  }

  const handleTabClick = (tabName: typeof activeTab) => {
    setActiveTab(tabName);
    if(window.innerWidth < 768) { // md breakpoint
        setSidebarOpen(false);
    }
  };

  const TabButton: React.FC<{ tabName: typeof activeTab; label: string; }> = ({ tabName, label }) => (
      <button onClick={() => handleTabClick(tabName)} className={`w-full text-left p-3 rounded-lg transition-colors ${activeTab === tabName ? 'bg-teal-accent' : 'hover:bg-storm-blue/50'}`}>
          {label}
      </button>
  );
  
  const SidebarContent = () => (
    <>
      <Link to="/" className="text-2xl font-poppins font-bold mb-8 block">Pun Wear Admin</Link>
      <nav className="space-y-2">
        <TabButton tabName="dashboard" label="Kontrol Paneli" />
        <TabButton tabName="products" label="Ürün Yönetimi" />
        <TabButton tabName="orders" label="Sipariş Yönetimi" />
        <TabButton tabName="users" label="Kullanıcılar" />
        <TabButton tabName="blog" label="Blog Yönetimi" />
      </nav>
    </>
  )

  return (
    <div className="flex min-h-screen bg-wood-beige font-lato">
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 bg-storm-blue text-foam-white p-4 flex justify-between items-center z-40">
        <h2 className="text-lg font-bold">Admin Paneli</h2>
        <button onClick={() => setSidebarOpen(!isSidebarOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
        </button>
      </header>

      {/* Sidebar */}
      <aside className={`fixed md:relative inset-y-0 left-0 bg-storm-blue text-foam-white p-6 z-30 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out w-64`}>
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 mt-16 md:mt-0">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'products' && <ProductManager />}
        {activeTab === 'orders' && <OrderManager />}
        {activeTab === 'users' && <UserManager />}
        {activeTab === 'blog' && <div><h3 className="text-2xl font-poppins font-semibold mb-4">Blog Yönetimi</h3><p>Blog yazıları burada yönetilecektir.</p></div>}
      </main>
    </div>
  );
};