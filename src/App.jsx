import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import DealerDashboard from './pages/Dashboard/DealerDashboard';
import CustomerDashboard from './pages/Dashboard/CustomerDashboard';
import Invoice from './pages/Invoice';
import About from './pages/About';
import './App.css';

function App() {
  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/dealer-dashboard" element={<DealerDashboard />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/invoice/:id" element={<Invoice />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
