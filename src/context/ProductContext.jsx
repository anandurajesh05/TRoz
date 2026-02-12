import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts } from '../data/mockData';

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState(() => {
        const savedProducts = localStorage.getItem('products');
        return savedProducts ? JSON.parse(savedProducts) : initialProducts;
    });

    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    const addProduct = (newProduct) => {
        const productWithId = {
            ...newProduct,
            id: Date.now(), // Simple ID generation
            rating: 0,
            inStock: true
        };
        setProducts(prev => [productWithId, ...prev]);
        return productWithId;
    };

    const getProductById = (id) => {
        return products.find(p => p.id === parseInt(id));
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, getProductById }}>
            {children}
        </ProductContext.Provider>
    );
};
