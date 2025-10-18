import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';

export const HomePage: React.FC = () => {
  const { products } = useApp();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="bg-foam-white font-lato text-storm-blue">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://picsum.photos/id/1019/1920/1080"
        >
          {/* Mock video, replace with actual video source if available */}
          {/* <source src="/path/to/sea_waves.mp4" type="video/mp4" /> */}
        </video>
        <div className="relative z-20 px-4">
          <h1 className="text-5xl md:text-7xl font-poppins font-extrabold tracking-tight">
            Pun Wear
          </h1>
          <p className="mt-4 text-xl md:text-2xl font-lato">
            Karadeniz'in Ruhunu Giy
          </p>
          <Link
            to="/products"
            className="mt-8 inline-block bg-rusty-orange text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
          >
            Koleksiyonu Keşfet
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-poppins font-bold text-center mb-12 text-storm-blue">
            Öne Çıkan Ürünler
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-20 bg-wood-beige">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-poppins font-bold text-center mb-12 text-storm-blue">
            Koleksiyonlar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link to="/products" className="group relative block h-96">
              <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-40 transition-opacity duration-300 z-10"></div>
              <img src="https://picsum.photos/id/10/800/600" alt="Fırtına Koleksiyonu" className="absolute inset-0 w-full h-full object-cover" loading="lazy"/>
              <div className="relative z-20 flex items-end justify-start h-full p-8">
                <h3 className="text-3xl font-poppins font-bold text-white">Fırtına Koleksiyonu</h3>
              </div>
            </Link>
            <Link to="/products" className="group relative block h-96">
              <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-40 transition-opacity duration-300 z-10"></div>
              <img src="https://picsum.photos/id/22/800/600" alt="Yeşilova Serisi" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
              <div className="relative z-20 flex items-end justify-start h-full p-8">
                <h3 className="text-3xl font-poppins font-bold text-white">Yeşilova Serisi</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* About Us Short */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h2 className="text-4xl font-poppins font-bold mb-6 text-storm-blue">
            Doğadan İlham, Modern Dokunuş.
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Pun Wear, Karadeniz'in ham ve otantik estetiğini minimalist, çağdaş bir web tasarımıyla buluşturuyor. Her ürünümüzde tazeliği, dayanıklılığı ve doğallığı hissedeceksiniz.
          </p>
          <Link
            to="/about"
            className="font-bold text-teal-accent hover:text-rusty-orange transition-colors duration-300 text-lg"
          >
            Hikayemizi Oku &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
};