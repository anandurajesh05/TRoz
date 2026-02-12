import React from 'react';
import { useOrder } from '../../context/OrderContext';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';

const CustomerDashboard = () => {
    const { user } = useAuth();
    const { getUserOrders } = useOrder();
    const myOrders = getUserOrders(user.id);

    return (
        <div className="container dashboard">
            <h1 className="dashboard-title">My Orders</h1>

            <div className="dashboard-section glass-panel mt-lg">
                <div className="table-responsive">
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>Order #</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Total</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myOrders.length > 0 ? myOrders.map(order => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{new Date(order.date).toLocaleDateString()}</td>
                                    <td><span className={`status-badge status-${order.status.toLowerCase()}`}>{order.status}</span></td>
                                    <td>${order.total.toFixed(2)}</td>
                                    <td>
                                        <a href={`/invoice/${order.id}`} className="btn-link">Track & Invoice</a>
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan="5" className="text-center">You haven't placed any orders yet.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CustomerDashboard;
