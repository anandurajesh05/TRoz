import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, Package, User, LogOut, LayoutDashboard } from 'lucide-react';
import Button from '../UI/Button';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
    const { cartCount } = useCart();
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const getDashboardLink = () => {
        if (!user) return '/';
        if (user.role === 'admin') return '/admin-dashboard';
        if (user.role === 'dealer') return '/dealer-dashboard';
        return '/customer-dashboard';
    };

    return (
        <header className="header glass-panel">
            <div className="container header-content">
                <Link to="/" className="logo">
                    <Package size={28} className="logo-icon" />
                    <span className="logo-text">TRoz<span className="text-accent">.</span></span>
                </Link>

                <nav className="main-nav">
                    <ul className="nav-list">
                        <li><NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink></li>
                        <li><NavLink to="/catalog" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Catalog</NavLink></li>
                        <li><NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>About</NavLink></li>
                    </ul>
                </nav>

                <div className="header-actions">
                    <button className="icon-btn" aria-label="Search">
                        <Search size={20} />
                    </button>

                    <Link to="/cart" className="cart-btn" aria-label="Cart">
                        <ShoppingCart size={20} />
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </Link>

                    {user ? (
                        <div className="user-menu" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Link to={getDashboardLink()}>
                                <Button size="sm" variant="ghost" aria-label="Dashboard">
                                    <LayoutDashboard size={18} />
                                    <span style={{ marginLeft: '4px' }}>Dashboard</span>
                                </Button>
                            </Link>
                            <div className="user-divider" style={{ width: '1px', height: '24px', background: 'var(--color-border)' }}></div>
                            <span className="user-name" style={{ fontWeight: '500', fontSize: '0.9rem' }}>{user.name}</span>
                            <Button size="sm" variant="ghost" onClick={handleLogout} aria-label="Logout">
                                <LogOut size={18} />
                            </Button>
                        </div>
                    ) : (
                        <Link to="/login">
                            <Button size="sm" variant="primary">Login</Button>
                        </Link>
                    )}

                    <button className="mobile-menu-btn">
                        <Menu size={24} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
