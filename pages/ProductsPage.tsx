import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { Product, Size, Color } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';

type SortOption = "newest" | "price-asc" | "price-desc";

export const ProductsPage: React.FC = () => {
  const { products, categories } = useApp();
  const [filters, setFilters] = useState<{ category: string; size: Size | 'all'; color: Color | 'all' }>({
    category: 'all',
    size: 'all',
    color: 'all',
  });
  const [sort, setSort] = useState<SortOption>('newest');

  const handleFilterChange = (filterType: 'category' | 'size' | 'color', value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    if (filters.category !== 'all') {
      filtered = filtered.filter(p => p.category === filters.category);
    }
    if (filters.size !== 'all') {
      filtered = filtered.filter(p => p.sizes.includes(filters.size as Size));
    }
    if (filters.color !== 'all') {
      filtered = filtered.filter(p => p.color === filters.color);
    }

    switch (sort) {
      case 'price-asc':
        return [...filtered].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...filtered].sort((a, b) => b.price - a.price);
      case 'newest':
      default:
        return [...filtered].sort((a, b) => b.id - a.id);
    }
  }, [products, filters, sort]);

  const sizes: Size[] = ["S", "M", "L", "XL"];
  const colors: Color[] = ["Fırtına Mavisi", "Yeşilova Yeşili", "Ahşap Beji", "Köpük Beyazı", "Paslı Turuncu"];

  const FilterSelect: React.FC<{
    label: string;
    value: string;
    options: string[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  }> = ({ label, value, options, onChange }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-accent focus:border-teal-accent sm:text-sm rounded-md"
      >
        <option value="all">Tümü</option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );

  return (
    <div className="bg-foam-white">
      <div className="container mx-auto px-6 py-12">
        <Breadcrumbs paths={[{ name: "Ana Sayfa", path: "/" }, { name: "Ürünler" }]} />
        <h1 className="text-4xl font-poppins font-bold text-center mb-10 text-storm-blue">Tüm Ürünler</h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters */}
          <aside className="w-full md:w-1/4 lg:w-1/5 space-y-6">
            <h2 className="text-xl font-poppins font-semibold text-storm-blue border-b pb-2">Filtrele</h2>
            <FilterSelect label="Kategori" value={filters.category} options={categories} onChange={e => handleFilterChange('category', e.target.value)} />
            <FilterSelect label="Beden" value={filters.size} options={sizes} onChange={e => handleFilterChange('size', e.target.value)} />
            <FilterSelect label="Renk" value={filters.color} options={colors} onChange={e => handleFilterChange('color', e.target.value)} />
          </aside>

          {/* Products Grid */}
          <main className="w-full md:w-3/4 lg:w-4/5">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">{filteredAndSortedProducts.length} ürün bulundu</p>
              <div>
                <label className="text-sm font-medium text-gray-700 mr-2">Sırala:</label>
                <select value={sort} onChange={e => setSort(e.target.value as SortOption)} className="text-base border-gray-300 focus:outline-none focus:ring-teal-accent focus:border-teal-accent sm:text-sm rounded-md">
                  <option value="newest">Yeniden Eskiye</option>
                  <option value="price-asc">Fiyata Göre (Artan)</option>
                  <option value="price-desc">Fiyata Göre (Azalan)</option>
                </select>
              </div>
            </div>
            {filteredAndSortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredAndSortedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-xl text-gray-600">Bu kriterlere uygun ürün bulunamadı.</p>
                </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};