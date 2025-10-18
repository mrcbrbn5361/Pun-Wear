import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export const AccountPage: React.FC = () => {
    const { currentUser, orders, logout } = useApp();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'orders' | 'addresses'>('orders');

    const handleLogout = () => {
        logout();
        navigate('/');
    };
    
    if (!currentUser) {
        return <p>Yükleniyor...</p>;
    }

    const userOrders = orders.filter(o => o.userId === currentUser.id);

    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-4xl font-poppins font-bold mb-8 text-storm-blue">Hesabım</h1>
            <div className="flex flex-col md:flex-row gap-12">
                <aside className="md:w-1/4">
                    <h2 className="text-xl font-semibold mb-4">{currentUser.name}</h2>
                    <nav className="flex flex-col space-y-2">
                        <button onClick={() => setActiveTab('orders')} className={`text-left p-2 rounded ${activeTab === 'orders' ? 'bg-wood-beige' : 'hover:bg-gray-100'}`}>Siparişlerim</button>
                        <button onClick={() => setActiveTab('addresses')} className={`text-left p-2 rounded ${activeTab === 'addresses' ? 'bg-wood-beige' : 'hover:bg-gray-100'}`}>Adreslerim</button>
                        <button onClick={handleLogout} className="text-left p-2 rounded text-rusty-orange hover:bg-gray-100">Çıkış Yap</button>
                    </nav>
                </aside>
                <main className="flex-1">
                    {activeTab === 'orders' && (
                        <div>
                            <h3 className="text-2xl font-semibold mb-6">Sipariş Geçmişi</h3>
                            {userOrders.length > 0 ? (
                                <div className="space-y-6">
                                    {userOrders.map(order => (
                                        <div key={order.id} className="bg-white p-6 rounded-lg shadow">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <p className="font-bold">Sipariş #{order.id}</p>
                                                    <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString('tr-TR')}</p>
                                                </div>
                                                <span className="bg-teal-accent text-white text-sm font-semibold px-3 py-1 rounded-full">{order.status}</span>
                                            </div>
                                            <ul>
                                                {order.items.map(item => <li key={item.id} className="text-sm">{item.quantity} x {item.name}</li>)}
                                            </ul>
                                            <p className="text-right font-bold mt-4">{order.total.toLocaleString('tr-TR')} TL</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>Henüz sipariş vermediniz.</p>
                            )}
                        </div>
                    )}
                     {activeTab === 'addresses' && (
                        <div>
                            <h3 className="text-2xl font-semibold mb-6">Adreslerim</h3>
                            {currentUser.addresses.length > 0 ? (
                                <div>
                                    {currentUser.addresses.map((address, i) => (
                                        <div key={i} className="bg-white p-4 rounded-lg shadow">
                                            <p>{address.street}, {address.city}, {address.zip}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>Kayıtlı adresiniz bulunmuyor.</p>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};
