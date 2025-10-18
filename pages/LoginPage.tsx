import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate, Link } from 'react-router-dom';

export const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('zeynep@example.com');
    const [password, setPassword] = useState('password123');
    const [error, setError] = useState('');
    const { login } = useApp();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const success = login(email, password);
        if (success) {
            navigate('/account');
        } else {
            setError('Geçersiz e-posta veya şifre.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-wood-beige">
            <div className="p-8 bg-white rounded-lg shadow-xl w-full max-w-md m-4">
                <Link to="/" className="text-3xl font-poppins font-extrabold text-storm-blue block text-center mb-6">
                  Pun Wear
                </Link>
                <h2 className="text-2xl font-bold text-center text-storm-blue mb-6">Giriş Yap</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
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
                        Giriş Yap
                    </button>
                    <p className="text-center text-gray-600">
                        Hesabın yok mu? <Link to="/register" className="text-teal-accent hover:underline">Kayıt Ol</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};
