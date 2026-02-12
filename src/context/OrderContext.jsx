import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState(() => {
        const savedOrders = localStorage.getItem('orders');
        return savedOrders ? JSON.parse(savedOrders) : [];
    });

    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);

    const createOrder = (items, total, user) => {
        const newOrder = {
            id: Math.random().toString(36).substr(2, 9).toUpperCase(),
            date: new Date().toISOString(),
            user: user,
            items: items,
            total: total,
            status: 'Processing', // Processing, Packed, Shipped, Delivered
            paymentStatue: 'Paid'
        };
        setOrders(prev => [newOrder, ...prev]);
        return newOrder.id;
    };

    const updateOrderStatus = (orderId, status) => {
        setOrders(prev => prev.map(order =>
            order.id === orderId ? { ...order, status } : order
        ));
    };

    const getOrderById = (orderId) => {
        return orders.find(o => o.id === orderId);
    };

    const getUserOrders = (userId) => {
        return orders.filter(o => o.user.id === userId);
    };

    return (
        <OrderContext.Provider value={{ orders, createOrder, updateOrderStatus, getOrderById, getUserOrders }}>
            {children}
        </OrderContext.Provider>
    );
};
