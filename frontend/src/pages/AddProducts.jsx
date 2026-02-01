import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProductForm from '../components/ProductForm';

const AddProducts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};
  const initialData = state.initialData || {};
  const isEditing = !!state.editing;

  const submitHandler = (data) => {
    const saved = localStorage.getItem('neostock_products');
    const products = saved ? JSON.parse(saved) : [];

    if (isEditing && initialData.id) {
      const updated = products.map(p => p.id === initialData.id ? { ...p, ...data, updatedAt: new Date().toISOString(), status: data.quantity < 10 ? 'low' : 'active' } : p);
      localStorage.setItem('neostock_products', JSON.stringify(updated));
    } else {
      const newProduct = {
        ...data,
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: data.quantity < 10 ? 'low' : 'active'
      };
      localStorage.setItem('neostock_products', JSON.stringify([...products, newProduct]));
    }

    navigate('/products');
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
