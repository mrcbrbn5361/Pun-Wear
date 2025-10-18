
import React, { useState } from 'react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock form submission
    console.log('Form submitted:', formData);
    setFormStatus('Mesajınız için teşekkür ederiz! En kısa sürede geri döneceğiz.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-foam-white py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div className="text-storm-blue">
            <h1 className="text-4xl font-poppins font-bold mb-4">Bize Ulaşın</h1>
            <p className="font-lato text-lg text-gray-700 mb-6">
              Soru, öneri veya iş birliği talepleriniz için bizimle iletişime geçmekten çekinmeyin.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">E-posta</h3>
                <a href="mailto:info@punwear.com" className="text-teal-accent hover:text-rusty-orange">info@punwear.com</a>
              </div>
              <div>
                <h3 className="font-semibold">Sosyal Medya</h3>
                <p>Bizi sosyal medyadan da takip edebilirsiniz.</p>
                {/* Social icons here if needed */}
              </div>
            </div>
          </div>
          <div>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Adınız</label>
                <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-accent focus:border-teal-accent"/>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-posta Adresiniz</label>
                <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-accent focus:border-teal-accent"/>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mesajınız</label>
                <textarea name="message" id="message" rows={5} required value={formData.message} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-accent focus:border-teal-accent"></textarea>
              </div>
              <div>
                <button type="submit" className="w-full bg-forest-green text-white font-bold py-3 px-6 rounded-md hover:bg-opacity-90 transition-all duration-300">
                  Gönder
                </button>
              </div>
            </form>
            {formStatus && <p className="mt-4 text-center text-forest-green">{formStatus}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
