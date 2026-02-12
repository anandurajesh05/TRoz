import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const login = (email, password) => {
        // Mock login logic with roles
        let role = 'customer';
        let name = email.split('@')[0];

        // Simple mock logic for roles based on email
        if (email.toLowerCase().includes('admin')) role = 'admin';
        else if (email.toLowerCase().includes('dealer')) role = 'dealer';

        const mockUser = {
            id: '1',
            name: name.charAt(0).toUpperCase() + name.slice(1),
            email: email,
            role: role,
            avatar: `https://ui-avatars.com/api/?name=${name}&background=random`
        };
        setUser(mockUser);
        return true;
    };

    const signup = (name, email, password) => {
        // Mock signup - default to customer
        const mockUser = {
            id: Date.now().toString(),
            name,
            email,
            role: 'customer',
            avatar: `https://ui-avatars.com/api/?name=${name}&background=random`
        };
        setUser(mockUser);
        return true;
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};
