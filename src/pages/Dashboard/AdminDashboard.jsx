import React, { useState } from 'react';
import { Package, ShoppingBag, Users, TrendingUp, Plus } from 'lucide-react';
import { useOrder } from '../../context/OrderContext';
import { useProduct } from '../../context/ProductContext';
import AddProductForm from '../../components/Admin/AddProductForm';
import Button from '../../components/UI/Button';
import './Dashboard.css';

const AdminDashboard = () => {
    const { orders, updateOrderStatus } = useOrder();
    const { products } = useProduct();
    const [showAddProduct, setShowAddProduct] = useState(false);

    const totalSales = orders.reduce((sum, order) => sum + order.total, 0);

    return (
        <div className="container dashboard">
            <div className="flex justify-between items-center mb-lg">
                <h1 className="dashboard-title mb-0">Admin Dashboard</h1>
                <Button variant="primary" onClick={() => setShowAddProduct(true)}>
                    <Plus size={18} /> Add Product
                </Button>
            </div>

            {showAddProduct && <AddProductForm onClose={() => setShowAddProduct(false)} />}

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon bg-primary"><TrendingUp size={24} color="white" /></div>
                    <div className="stat-info">
                        <h3>Total Sales</h3>
                        <p>${totalSales.toFixed(2)}</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon bg-warning"><ShoppingBag size={24} color="white" /></div>
                    <div className="stat-info">
                        <h3>Total Orders</h3>
                        <p>{orders.length}</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon bg-success"><Package size={24} color="white" /></div>
                    <div className="stat-info">
                        <h3>Products</h3>
                        <p>{products.length}</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon bg-info"><Users size={24} color="white" /></div>
                    <div className="stat-info">
                        <h3>Users</h3>
                        <p>12</p>
                    </div>
                </div>
            </div>

            <div className="dashboard-section glass-panel mt-lg">
                <h2>Recent Orders</h2>
                <div className="table-responsive">
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length > 0 ? orders.map(order => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.user.name} ({order.user.role})</td>
                                    <td>{new Date(order.date).toLocaleDateString()}</td>
                                    <td>
                                        <select
                                            value={order.status}
                                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                            className="status-select"
                                        >
                                            <option value="Processing">Processing</option>
                                            <option value="Packed">Packed</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </td>
                                    <td>${order.total.toFixed(2)}</td>
                                    <td>
                                        <a href={`/invoice/${order.id}`} className="btn-link">View Invoice</a>
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

export default AdminDashboard;
