import React from 'react';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/UI/Button';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrder } from '../context/OrderContext';
import './Cart.css';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const { createOrder } = useOrder();
    const navigate = useNavigate();

    const handleCheckout = () => {
        if (!user) {
            navigate('/login');
            return;
        }

        const orderId = createOrder(cartItems, cartTotal * 1.08, user);
        clearCart();
        navigate(`/invoice/${orderId}`);
    };

    if (cartItems.length === 0) {
        return (
            <div className="container cart-empty">
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added any spare parts yet.</p>
                <Link to="/catalog">
                    <Button variant="primary" className="mt-lg">Browse Catalog</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container cart-page">
            <h1 className="page-title">Shopping Cart</h1>

            <div className="cart-layout">
                <div className="cart-items glass-panel">
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                            <div className="cart-item-image">
                                <img src={item.image} alt={item.name} />
                            </div>

                            <div className="cart-item-details">
                                <h3>{item.name}</h3>
                                <p className="item-sku">SKU: {item.id.toString().padStart(6, '0')}</p>
                                <p className="item-price">${item.price.toFixed(2)}</p>
                            </div>

                            <div className="cart-item-actions">
                                <div className="quantity-controls">
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity">
                                        <Minus size={16} />
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity">
                                        <Plus size={16} />
                                    </button>
                                </div>

                                <button
                                    className="remove-btn"
                                    onClick={() => removeFromCart(item.id)}
                                    aria-label="Remove item"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="cart-actions">
                        <Button variant="ghost" onClick={clearCart}>Clear Cart</Button>
                    </div>
                </div>

                <div className="cart-summary glass-panel">
                    <h2>Order Summary</h2>

                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>

                    <div className="summary-row">
                        <span>Shipping</span>
                        <span>Calculated at checkout</span>
                    </div>

                    <div className="summary-row">
                        <span>Tax</span>
                        <span>${(cartTotal * 0.08).toFixed(2)}</span>
                    </div>

                    <div className="summary-divider"></div>

                    <div className="summary-row total">
                        <span>Total</span>
                        <span>${(cartTotal * 1.08).toFixed(2)}</span>
                    </div>

                    <Button variant="primary" className="width-full mt-lg" onClick={handleCheckout}>
                        {user ? 'Complete Order' : 'Login to Checkout'} <ArrowRight size={20} />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
