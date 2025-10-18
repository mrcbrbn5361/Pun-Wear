import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate, Link } from 'react-router-dom';

export const RegisterPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useApp();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (password.length < 6) {
            setError('Şifre en az 6 karakter olmalıdır.');
            return;
        }
        const success = register(name, email, password);
        if (success) {
            navigate('/account');
        } else {
            setError('Bu e-posta adresi zaten kullanılıyor.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-wood-beige">
            <div className="p-8 bg-white rounded-lg shadow-xl w-full max-w-md m-4">
                <Link to="/" className="text-3xl font-poppins font-extrabold text-storm-blue block text-center mb-6">
                  Pun Wear
                </Link>
                <h2 className="text-2xl font-bold text-center text-storm-blue mb-6">Kayıt Ol</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 mb-1" htmlFor="name">Ad Soyad</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-accent"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1" htmlFor="email">E-posta</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-accent"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1" htmlFor="password">Şifre</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-accent"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <button type="submit" className="w-full bg-storm-blue text-white py-3 rounded-md hover:bg-opacity-90 transition-colors font-semibold">
                        Kayıt Ol
                    </button>
                    <p className="text-center text-gray-600">
                        Zaten bir hesabın var mı? <Link to="/login" className="text-teal-accent hover:underline">Giriş Yap</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};
