import React from 'react';
import { Package, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    {/* Brand Column */}
                    <div className="footer-col">
                        <div className="footer-logo">
                            <Package size={24} className="text-primary" />
                            <span>TRoz</span>
                        </div>
                        <p className="footer-desc">
                            The ultimate destination for 2-stroke legends.
                            Keeping the smoke alive with premium spare parts.
                        </p>
                        <div className="social-links">
                            <a href="#" className="social-link"><Facebook size={18} /></a>
                            <a href="#" className="social-link"><Twitter size={18} /></a>
                            <a href="#" className="social-link"><Instagram size={18} /></a>
                            <a href="#" className="social-link"><Linkedin size={18} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-col">
                        <h3 className="footer-title">Quick Links</h3>
                        <ul className="footer-links">
                            <li><a href="/">Home</a></li>
                            <li><a href="/catalog">Catalog</a></li>
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/contact">Contact</a></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div className="footer-col">
                        <h3 className="footer-title">Categories</h3>
                        <ul className="footer-links">
                            <li><a href="/catalog?cat=engine">Engine Parts</a></li>
                            <li><a href="/catalog?cat=body">Body Kits</a></li>
                            <li><a href="/catalog?cat=electronics">Electronics</a></li>
                            <li><a href="/catalog?cat=wheels">Wheels & Tires</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer-col">
                        <h3 className="footer-title">Contact Us</h3>
                        <ul className="footer-contact">
                            <li><MapPin size={16} /> 123 Tech Avenue, Innovation City</li>
                            <li><Phone size={16} /> +1 (555) 123-4567</li>
                            <li><Mail size={16} /> support@sparehub.com</li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} TRoz. All rights reserved.</p>
                    <div className="footer-legal">
                        <a href="/privacy">Privacy Policy</a>
                        <a href="/terms">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
