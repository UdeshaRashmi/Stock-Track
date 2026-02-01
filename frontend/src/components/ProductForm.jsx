import React, { useState, useEffect } from 'react';
import { X, Package, DollarSign, Hash, Tag, AlertCircle, Save } from 'lucide-react';

const Input = ({ label, name, type = 'text', Icon, placeholder, maxLength, value, onChange, error, charLimitLabel }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">
      {label}
      {error && <span className="text-red-500 ml-1">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none ${error ? 'text-red-400' : 'text-gray-500'}`}>
          <Icon className="h-5 w-5" />
        </div>
      )}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors ${
          Icon ? 'pl-12' : 'pl-4'
        } ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : 'border-gray-200 focus:border-indigo-500'}`}
      />
      {error && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
          <AlertCircle className="h-5 w-5" />
        </div>
      )}
    </div>
    {error ? (
      <p className="text-sm text-red-600 flex items-center">
        <AlertCircle className="h-4 w-4 mr-1" />
        {error}
      </p>
    ) : (
      <div className="text-xs text-gray-500">
        {charLimitLabel}
      </div>
    )}
  </div>
);

const ProductForm = ({ onSubmit, initialData = {}, isEditing = false, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    sku: '',
    description: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData({
        name: initialData.name || '',
        price: initialData.price !== undefined ? initialData.price.toString() : '',
        quantity: initialData.quantity !== undefined ? initialData.quantity.toString() : '',
        sku: initialData.sku || '',
        description: initialData.description || '',
      });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    else if (formData.name.length > 100) newErrors.name = 'Name must be under 100 characters';

    if (formData.price.trim()) {
      const price = parseFloat(formData.price);
      if (isNaN(price) || price <= 0) newErrors.price = 'Enter a valid price';
      else if (price > 1000000) newErrors.price = 'Price must be less than $1,000,000';
    }

    if (formData.quantity.trim()) {
      const qty = parseInt(formData.quantity, 10);
      if (isNaN(qty) || qty < 0) newErrors.quantity = 'Enter a valid quantity';
      else if (qty > 100000) newErrors.quantity = 'Quantity must be less than 100,000';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for numeric fields
    let processedValue = value;
    
    if (name === 'price') {
      // Allow only numbers and decimal point
      processedValue = value.replace(/[^0-9.]/g, '');
      // Ensure only one decimal point
      const decimalCount = (processedValue.match(/\./g) || []).length;
      if (decimalCount > 1) {
        // Remove extra decimal points
        const parts = processedValue.split('.');
        processedValue = parts[0] + '.' + parts.slice(1).join('');
      }
      // Limit to 2 decimal places
      if (processedValue.includes('.')) {
        const parts = processedValue.split('.');
        if (parts[1].length > 2) {
          processedValue = parts[0] + '.' + parts[1].slice(0, 2);
        }
      }
    } else if (name === 'quantity') {
      // Allow only numbers
      processedValue = value.replace(/[^0-9]/g, '');
    }
    
    setFormData(prev => ({ ...prev, [name]: processedValue }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    try {
      await onSubmit({
        name: formData.name.trim(),
        price: formData.price ? parseFloat(formData.price) : 0,
        quantity: formData.quantity ? parseInt(formData.quantity, 10) : 0,
        sku: formData.sku.trim(),
        description: formData.description.trim(),
      });
      
      if (!isEditing) {
        // Reset form
        setFormData({ 
          name: '', 
          price: '', 
          quantity: '', 
          sku: '', 
          description: '' 
        });
      }
    } catch (err) {
      console.error('Form submission error:', err);
      // Handle submission error
      setErrors(prev => ({
        ...prev,
        submit: 'Failed to save product. Please try again.'
      }));
    } finally {
      setLoading(false);
    }
  };

  const totalValue = (parseFloat(formData.price) || 0) * (parseInt(formData.quantity, 10) || 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
            <Package className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{isEditing ? 'Edit Product' : 'Add Product'}</h3>
            <p className="text-sm text-gray-500">{isEditing ? 'Update your product information' : 'Add a new product to your inventory'}</p>
          </div>
        </div>
        {onCancel && (
          <button 
            type="button"
            onClick={onCancel} 
            className="text-gray-500 hover:text-gray-800 hover:bg-gray-100 p-2 rounded-lg transition-colors"
            disabled={loading}
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input 
          label="Product Name" 
          name="name" 
          placeholder="e.g., Wireless Headphones" 
          Icon={Package} 
          maxLength={100} 
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          charLimitLabel={`${formData.name.length}/100 characters`}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input 
            label="Price ($)" 
            name="price" 
            type="text" 
            placeholder="0.00" 
            Icon={DollarSign} 
            value={formData.price}
            onChange={handleChange}
            error={errors.price}
            charLimitLabel={formData.price && `$${parseFloat(formData.price).toFixed(2)}`}
          />
          <Input 
            label="Quantity" 
            name="quantity" 
            type="text" 
            placeholder="0" 
            Icon={Hash} 
            value={formData.quantity}
            onChange={handleChange}
            error={errors.quantity}
            charLimitLabel={formData.quantity && `${formData.quantity} units`}
          />
          <Input 
            label="SKU (optional)" 
            name="sku" 
            placeholder="PROD-001" 
            Icon={Tag} 
            maxLength={50}
            value={formData.sku}
            onChange={handleChange}
            error={errors.sku}
            charLimitLabel={formData.sku && `${formData.sku.length}/50 characters`}
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Description (optional)</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Optional product description..."
            className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 border-gray-200 focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="text-sm text-gray-600">
            Total value: <span className="font-medium">${totalValue.toFixed(2)}</span>
          </div>
          {errors.submit && (
            <div className="text-sm text-red-600">{errors.submit}</div>
          )}
          <div className="flex items-center space-x-3">
            {onCancel && (
              <button 
                type="button" 
                onClick={onCancel} 
                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
            )}
            <button 
              type="submit" 
              disabled={loading}
              className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              <div className="flex items-center">
                <Save className="h-4 w-4 mr-2" />
                {loading ? (isEditing ? 'Saving...' : 'Creating...') : (isEditing ? 'Save Changes' : 'Create Product')}
              </div>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;