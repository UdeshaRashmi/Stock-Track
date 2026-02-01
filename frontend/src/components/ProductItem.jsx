import React from 'react';
import { Edit2, Trash2, Package, DollarSign, Hash, AlertCircle } from 'lucide-react';

const ProductItem = ({ product, onEdit, onDelete, viewMode = 'grid' }) => {
  const isLowStock = product.quantity < 10;
  const totalValue = (product.price * product.quantity).toFixed(2);

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-lightGray hover:shadow-md transition-shadow">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-primary" />
              </div>
              
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-gray-800">{product.name}</h3>
                  {isLowStock && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Low Stock
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                  {product.description || 'No description'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-8">
              <div className="text-right">
                <div className="flex items-center text-gray-600">
                  <DollarSign className="h-4 w-4 mr-1" />
                  <span className="font-medium text-gray-800">${product.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center text-gray-600 mt-1">
                  <Hash className="h-4 w-4 mr-1" />
                    <span className={`font-medium ${isLowStock ? 'text-amber-600' : 'text-gray-800'}`}>
                      {product.quantity} products items available
                    </span>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-500">Total Value</p>
                <p className="text-lg font-bold text-primary">${totalValue}</p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onEdit(product)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  className="p-2 text-danger hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View
  return (
    <div className="bg-white rounded-xl shadow-sm border border-lightGray hover:shadow-md transition-all duration-200 overflow-hidden group">
      {/* Status Indicator */}
      <div className={`h-1 w-full ${isLowStock ? 'bg-amber-500' : 'bg-green-500'}`} />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
              {isLowStock && (
                <span className="flex-shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 ml-2">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Low Stock
                </span>
              )}
            </div>
            <p className="text-gray-500 text-sm mt-2 line-clamp-2 h-10">
              {product.description || 'No description provided'}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">Unit Price</span>
            </div>
            <span className="text-lg font-bold text-gray-800">${product.price.toFixed(2)}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Hash className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">products items available</span>
            </div>
            <span className={`text-lg font-bold ${isLowStock ? 'text-amber-600' : 'text-gray-800'}`}>
              {product.quantity}
            </span>
          </div>
        </div>

        {/* Total Value */}
        <div className="mt-4 pt-4 border-t border-lightGray">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Value</p>
              <p className="text-2xl font-bold text-primary mt-1">${totalValue}</p>
            </div>
            
            {/* Actions */}
            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onEdit(product)}
                className="flex items-center px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
              >
                <Edit2 className="h-4 w-4 mr-1" />
                Edit
              </button>
              <button
                onClick={() => onDelete(product.id)}
                className="flex items-center px-3 py-1.5 bg-red-50 text-danger rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Default Actions */}
        <div className="mt-4 flex items-center justify-between opacity-100 group-hover:opacity-0 transition-opacity">
          <div className="text-xs text-gray-400">Last updated</div>
          <div className="text-xs text-gray-400">Click to view details</div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;