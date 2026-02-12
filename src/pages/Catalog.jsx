import React, { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import ProductCard from '../components/UI/Card';
import Button from '../components/UI/Button';
import { useProduct } from '../context/ProductContext';
import { categories } from '../data/mockData';
import './Catalog.css';

const Catalog = () => {
    const { products } = useProduct();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [products, searchTerm, selectedCategory]);

    return (
        <div className="container catalog-page">
            <div className="catalog-header">
                <h1 className="page-title">Product Catalog</h1>
                <div className="catalog-controls">
                    <div className="search-bar">
                        <Search size={20} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search parts..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    <div className="category-filter">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="category-select"
                        >
                            <option value="all">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="products-grid">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <div className="no-results">
                        <p>No products found matching your criteria.</p>
                        <Button variant="ghost" onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}>
                            Clear Filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Catalog;
