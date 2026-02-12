import React, { useState } from 'react';
import { ClipboardList, Package, Plus } from 'lucide-react';
import { useOrder } from '../../context/OrderContext';
import { useAuth } from '../../context/AuthContext';
import AddProductForm from '../../components/Admin/AddProductForm';
import Button from '../../components/UI/Button';
import './Dashboard.css';

const DealerDashboard = () => {
    const { user } = useAuth();
    const { getUserOrders } = useOrder();
    const [showAddProduct, setShowAddProduct] = useState(false);
    const myOrders = getUserOrders(user.id);

    return (
        <div className="container dashboard">
            <div className="flex justify-between items-center mb-lg">
                <div>
                    <h1 className="dashboard-title mb-0">Dealer Portal</h1>
                    <p className="welcome-text mb-0">Welcome back, {user.name}. Manage your bulk orders here.</p>
                </div>
                <Button variant="primary" onClick={() => setShowAddProduct(true)}>
                    <Plus size={18} /> Add Product
                </Button>
            </div>

            {showAddProduct && <AddProductForm onClose={() => setShowAddProduct(false)} />}

            <div className="dashboard-section glass-panel mt-md">
                <h2>Quick Order</h2>
                <div className="quick-order-form">
                    <input type="text" placeholder="Enter SKU" className="form-input" />
                    <input type="number" placeholder="Qty" className="form-input" style={{ width: '80px' }} />
                    <button className="btn btn-primary">Add to Order</button>
                </div>
            </div>

            <div className="dashboard-section glass-panel mt-lg">
                <h2>Order History</h2>
                <div className="table-responsive">
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Date</th>
                                <th>Items</th>
                                <th>Status</th>
                                <th>Total</th>
                                <th>Invoice</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myOrders.length > 0 ? myOrders.map(order => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{new Date(order.date).toLocaleDateString()}</td>
                                    <td>{order.items.length} Items</td>
                                    <td><span className={`status-badge status-${order.status.toLowerCase()}`}>{order.status}</span></td>
                                    <td>${order.total.toFixed(2)}</td>
                                    <td>
                                        <a href={`/invoice/${order.id}`} target="_blank" className="btn-link">Print Invoice</a>
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan="6" className="text-center">No orders found</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DealerDashboard;
