import React, { useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Printer, Share2, Mail, Download } from 'lucide-react';
import { useOrder } from '../context/OrderContext';
import Button from '../components/UI/Button';
import './Invoice.css';

const Invoice = () => {
    const { id } = useParams();
    const { getOrderById } = useOrder();
    const order = getOrderById(id);

    if (!order) {
        return <div className="container mt-xl text-center">Order not found</div>;
    }

    const handlePrint = () => {
        window.print();
    };

    const handleWhatsApp = () => {
        const text = `Hi, here is the invoice for Order #${order.id}. Total: $${order.total.toFixed(2)}. Track here: ${window.location.href}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    };

    const handleEmail = () => {
        const subject = `Invoice for Order #${order.id}`;
        const body = `Hi, please find the invoice details for Order #${order.id}. Total Amount: $${order.total.toFixed(2)}. View online: ${window.location.href}`;
        window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    };

    return (
        <div className="container invoice-page">
            <div className="invoice-actions no-print">
                <Link to="/" className="btn-link">&larr; Back to Shop</Link>
                <div className="action-buttons">
                    <Button variant="secondary" onClick={handlePrint}>
                        <Printer size={18} /> Print PDF
                    </Button>
                    <Button variant="secondary" onClick={handleWhatsApp}>
                        <Share2 size={18} /> WhatsApp
                    </Button>
                    <Button variant="secondary" onClick={handleEmail}>
                        <Mail size={18} /> Email
                    </Button>
                </div>
            </div>

            <div className="invoice-container glass-panel" id="invoice">
                <div className="invoice-header">
                    <div className="invoice-brand">
                        <h1>TRoz</h1>
                        <p>Premium 2-Stroke Parts</p>
                    </div>
                    <div className="invoice-meta">
                        <h2>INVOICE</h2>
                        <p><strong>Order ID:</strong> {order.id}</p>
                        <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                        <p><strong>Status:</strong> <span className="status-text">{order.status}</span></p>
                    </div>
                </div>

                <div className="invoice-body">
                    <div className="bill-to">
                        <h3>Bill To:</h3>
                        <p>{order.user.name}</p>
                        <p>{order.user.email}</p>
                        <p>{order.user.role === 'dealer' ? 'Authorized Dealer' : 'Customer'}</p>
                    </div>

                    <table className="invoice-table">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Qty</th>
                                <th>Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="3" className="text-right">Subtotal:</td>
                                <td>${(order.total / 1.08).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td colSpan="3" className="text-right">Tax (8%):</td>
                                <td>${(order.total - (order.total / 1.08)).toFixed(2)}</td>
                            </tr>
                            <tr className="grand-total">
                                <td colSpan="3" className="text-right">Total:</td>
                                <td>${order.total.toFixed(2)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <div className="order-tracking">
                    <h3>Order Tracking</h3>
                    <div className="progress-track">
                        {['Processing', 'Packed', 'Shipped', 'Delivered'].map((step, i) => {
                            const statusOrder = ['Processing', 'Packed', 'Shipped', 'Delivered'];
                            const currentIdx = statusOrder.indexOf(order.status) || 0;
                            const isActive = i <= currentIdx;

                            return (
                                <div key={step} className={`track-step ${isActive ? 'active' : ''}`}>
                                    <div className="step-dot"></div>
                                    <div className="step-label">{step}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="invoice-footer">
                    <p>Thank you for your business!</p>
                    <p>For support, contact support@troz.com</p>
                </div>
            </div>
        </div>
    );
};

export default Invoice;
