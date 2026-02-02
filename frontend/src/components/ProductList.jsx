import React, { useState } from 'react';
import { Search, Filter, SortAsc, SortDesc, Download, Grid, List } from 'lucide-react';
import ProductItem from './ProductItem';

const ProductList = ({ products, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState('grid');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  const stats = {
    total: products.length,
    lowStock: products.filter(p => p.quantity < 10).length,
    totalValue: products.reduce((sum, p) => sum + (p.price * p.quantity), 0).toFixed(2),
  };

  const SortButton = ({ field, label }) => (
    <button
      onClick={() => {
        if (sortBy === field) {
          setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
          setSortBy(field);
          setSortOrder('asc');
        }
      }}
      className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
        sortBy === field
          ? 'bg-primary text-white'
          : 'text-gray-600 hover:text-primary hover:bg-gray-50'
      }`}
    >
      {label}
      {sortBy === field && (
        sortOrder === 'asc' 
          ? <SortAsc className="h-4 w-4 ml-1" />
          : <SortDesc className="h-4 w-4 ml-1" />
      )}
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-lightGray p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Product List</h1>
            <p className="text-gray-500 mt-1">Entered data list</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="flex items-center px-4 py-2 border border-lightGray rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <p className="text-sm text-blue-700 font-medium">Total Products</p>
            <p className="text-2xl font-bold text-blue-900 mt-1">{stats.total}</p>
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
            <p className="text-sm text-amber-700 font-medium">Low Stock Items</p>
            <p className="text-2xl font-bold text-amber-900 mt-1">{stats.lowStock}</p>
          </div>
          <div className="bg-green-50 border border-green-100 rounded-lg p-4">
            <p className="text-sm text-green-700 font-medium">Total Value</p>
            <p className="text-2xl font-bold text-green-900 mt-1">${stats.totalValue}</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-lightGray p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-lightGray rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Sort & View */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 bg-gray-50 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
              >
                <Grid className={`h-5 w-5 ${viewMode === 'grid' ? 'text-primary' : 'text-gray-400'}`} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
              >
                <List className={`h-5 w-5 ${viewMode === 'list' ? 'text-primary' : 'text-gray-400'}`} />
              </button>
            </div>

            <div className="hidden md:flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <SortButton field="name" label="Name" />
              <SortButton field="price" label="Price" />
              <SortButton field="quantity" label="Quantity" />
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid/List */}
      {sortedProducts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-lightGray p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-800">No products found</h3>
            <p className="mt-2 text-gray-500">
              {searchTerm ? 'Try adjusting your search criteria' : 'Add your first product to get started'}
            </p>
          </div>
        </div>
      ) : (
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'space-y-4'
        }>
          {sortedProducts.map((product) => (
            <ProductItem
              key={product._id || product.id}
              product={product}
              onEdit={onEdit}
              onDelete={onDelete}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}

      {/* Summary */}
      {sortedProducts.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-lightGray p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing {sortedProducts.length} of {products.length} products
            </p>
            <p className="text-sm font-medium text-gray-700">
              Total value: <span className="text-primary">${stats.totalValue}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;