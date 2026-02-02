import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import { useAuth } from '../context/AuthContext';

const AddProducts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};
  const initialData = state.initialData || {};
  const isEditing = !!state.editing;

  const auth = useAuth();

  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const submitHandler = async (data) => {
    try {
      const headers = { 'Content-Type': 'application/json', ...auth.getAuthHeader() };
      if (isEditing && initialData && (initialData._id || initialData.id)) {
        const id = initialData._id || initialData.id;
        const res = await fetch(`${API_BASE}/api/products/${id}`, { method: 'PUT', headers, body: JSON.stringify(data) });
        if (!res.ok) throw new Error('Failed to update product');
      } else {
        const res = await fetch(`${API_BASE}/api/products`, { method: 'POST', headers, body: JSON.stringify(data) });
        if (!res.ok) throw new Error('Failed to create product');
      }
      navigate('/products');
    } catch (err) {
      console.error('API error:', err);
      alert('Failed to save product. See console for details.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ECFEFF] to-white py-10">
      <div className="max-w-3xl mx-auto px-4">
        <ProductForm onSubmit={submitHandler} initialData={initialData} isEditing={isEditing} onCancel={() => navigate('/products')} />
      </div>
    </div>
  );
};

export default AddProducts;
