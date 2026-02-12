import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import Button from './Button';
import { useCart } from '../../context/CartContext';
import './Card.css';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <div className="product-card glass-panel card-hover">
            <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
                <span className={`stock-badge ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
            </div>

            <div className="product-content">
                <div className="product-category">{product.category}</div>
                <h3 className="product-title">{product.name}</h3>

                <div className="product-rating">
                    <Star size={14} fill="#f59e0b" color="#f59e0b" />
                    <span>{product.rating}</span>
                </div>

                <div className="product-footer">
                    <div className="product-price">${product.price.toFixed(2)}</div>
                    <Button
                        size="sm"
                        variant="primary"
                        disabled={!product.inStock}
                        onClick={() => addToCart(product)}
                        aria-label="Add to Cart"
                    >
                        <ShoppingCart size={16} />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
