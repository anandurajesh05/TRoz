import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useProduct } from '../../context/ProductContext';
import { categories } from '../../data/mockData';
import Button from '../UI/Button';
import './AddProductForm.css';

const AddProductForm = ({ onClose }) => {
    const { addProduct } = useProduct();
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        description: '',
        image: '',
        inStock: true
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate network delay
        setTimeout(() => {
            addProduct({
                ...formData,
                price: parseFloat(formData.price),
                rating: 5.0, // Default rating for new products
            });
            setLoading(false);
            onClose();
            alert('Product added successfully!');
        }, 1000);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content glass-panel">
                <div className="modal-header">
                    <h2>Add New Product</h2>
                    <button onClick={onClose} className="close-btn"><X size={24} /></button>
                </div>

                <form onSubmit={handleSubmit} className="product-form">
                    <div className="form-group">
                        <label>Product Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="e.g. Yamaha RX100 Piston"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Category</label>
                            <select name="category" value={formData.category} onChange={handleChange} required>
                                <option value="">Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Price ($)</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                min="0"
                                step="0.01"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Image URL</label>
                        <input
                            type="url"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            required
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows="3"
                        />
                    </div>

                    <div className="form-group checkbox-group">
                        <input
                            type="checkbox"
                            name="inStock"
                            id="inStock"
                            checked={formData.inStock}
                            onChange={handleChange}
                        />
                        <label htmlFor="inStock">In Stock</label>
                    </div>

                    <Button variant="primary" type="submit" disabled={loading} className="width-full">
                        {loading ? 'Adding...' : 'Add Product'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default AddProductForm;
