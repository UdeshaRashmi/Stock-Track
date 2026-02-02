import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Package, 
  Plus, 
  Download, 
  Upload, 
  TrendingUp,
  AlertCircle,
  Zap,
  BarChart3,
  Sparkles,
  Filter,
  Search,
  Layers,
  Database
} from 'lucide-react';

// initialProducts fallback empty
const initialProducts = [];

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const auth = useAuth();

  const safeParse = async (res) => {
    const ct = res.headers.get('content-type') || '';
    const text = await res.text();
    if (ct.includes('application/json')) {
      try { return JSON.parse(text); }
      catch (e) { throw new Error('Invalid JSON response: ' + text.slice(0,200)); }
    }
    throw new Error(text || res.statusText || 'Non-JSON response from server');
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';
        const headers = { 'Content-Type': 'application/json', ...(auth?.getAuthHeader ? auth.getAuthHeader() : {}) };
        const res = await fetch(`${API_BASE}/api/products`, { headers });
        const data = await safeParse(res);
        if (!res.ok) throw new Error(data.error || 'Failed to fetch products');
        setProducts(data);
      } catch (err) {
        console.error('Fetch products error:', err);
        setProducts(initialProducts);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [auth]);

  const handleAddProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: productData.quantity < 10 ? 'low' : 'active'
    };
    setProducts([...products, newProduct]);
    showToast('Product added successfully!', 'success');
  };

  // Note: product add/edit handled on the separate /add-products page

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const id = productId._id || productId.id || productId;
      const headers = { ...(auth?.getAuthHeader ? auth.getAuthHeader() : {}) };
      const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const res = await fetch(`${API_BASE}/api/products/${id}`, { method: 'DELETE', headers });
      if (!res.ok) throw new Error('Delete failed');
      setProducts(products.filter(p => (p._id || p.id) !== id));
      showToast('Product deleted successfully!', 'success');
    } catch (err) {
      console.error('Delete error:', err);
      showToast('Failed to delete product', 'error');
    }
  };

  const handleExport = () => {
    const csv = [
      ['ID', 'Name', 'Price', 'Quantity', 'Description', 'Category', 'Status'],
      ...products.map(p => [p.id, p.name, p.price, p.quantity, p.description, p.category, p.status])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'neostock-products.csv';
    a.click();
    showToast('Products exported to CSV!', 'success');
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const text = e.target.result;
        const lines = text.split('\n');
        const headers = lines[0].split(',');
        
        const importedProducts = lines.slice(1)
          .filter(line => line.trim())
          .map(line => {
            const values = line.split(',');
            const product = {};
            headers.forEach((header, index) => {
              product[header.toLowerCase()] = values[index];
            });
            return {
              ...product,
              price: parseFloat(product.price),
              quantity: parseInt(product.quantity),
              status: parseInt(product.quantity) < 10 ? 'low' : 'active',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
          });
        // POST imported products to backend
        try {
          const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';
          const headers = { 'Content-Type': 'application/json', ...(auth?.getAuthHeader ? auth.getAuthHeader() : {}) };
          const promises = importedProducts.map(p => fetch(`${API_BASE}/api/products`, {
            method: 'POST', headers, body: JSON.stringify(p)
          }).then(async (r) => {
            const data = await safeParse(r);
            if (!r.ok) throw new Error(data.error || 'Create failed');
            return data;
          }));
          const created = await Promise.all(promises);
          setProducts([...products, ...created]);
          showToast(`${created.length} products imported!`, 'success');
        } catch (err) {
          console.error('Import error:', err);
          showToast('Error importing products to server', 'error');
        }
      } catch (error) {
        showToast('Error importing CSV file', 'error');
      }
    };
    reader.readAsText(file);
  };

  const showToast = (message, type = 'info') => {
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-xl shadow-2xl flex items-center space-x-3 animate-slide-in backdrop-blur-sm ${
      type === 'success' ? 'bg-gradient-to-r from-[#2DD4BF] to-[#22D3EE] text-white' :
      type === 'error' ? 'bg-gradient-to-r from-[#FB7185] to-[#FF6B6B] text-white' :
      'bg-gradient-to-r from-[#0F172A] to-[#334155] text-white'
    }`;
    
    toast.innerHTML = `
      ${type === 'success' ? '<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>' : ''}
      ${type === 'error' ? '<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>' : ''}
      <span class="font-medium">${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('animate-slide-out');
      setTimeout(() => {
        if (toast.parentNode) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 3000);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' ? true : 
                         activeFilter === 'low' ? product.quantity < 10 :
                         product.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: products.length,
    lowStock: products.filter(p => p.quantity < 10).length,
    totalValue: products.reduce((sum, p) => sum + (p.price * p.quantity), 0).toFixed(2),
    averagePrice: products.length > 0 ? (products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2) : 0,
  };

  const categories = ['all', ...new Set(products.map(p => p.category))];

  // navbar triggers now navigate to /add-products

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ECFEFF] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#2DD4BF] to-[#22D3EE] shadow-xl flex items-center justify-center">
                <Layers className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#0F172A]">Product Hub</h1>
                <p className="text-[#334155] mt-1">
                  Smart inventory management with real-time insights
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center px-4 py-2.5 rounded-xl bg-white/80 backdrop-blur-sm border border-[#2DD4BF]/30 text-[#334155] hover:bg-white hover:border-[#2DD4BF]/50 hover:shadow-lg transition-all duration-200 cursor-pointer">
                <Upload className="h-4 w-4 mr-2" />
                Import
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>
              <button
                onClick={handleExport}
                className="flex items-center px-4 py-2.5 rounded-xl bg-white/80 backdrop-blur-sm border border-[#2DD4BF]/30 text-[#334155] hover:bg-white hover:border-[#2DD4BF]/50 hover:shadow-lg transition-all duration-200"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
              <button
                onClick={() => navigate('/add-products')}
                className="group flex items-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#2DD4BF] to-[#22D3EE] text-white font-semibold hover:shadow-2xl hover:shadow-[#2DD4BF]/30 transform hover:-translate-y-0.5 transition-all duration-300"
              >
                <Plus className="h-5 w-5 mr-2" />
                New Product
                <Sparkles className="h-4 w-4 ml-2 group-hover:rotate-12 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#ECFEFF] p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#334155]">Total Products</p>
                <p className="text-3xl font-bold text-[#0F172A] mt-2">{stats.total}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#2DD4BF]/20 to-[#22D3EE]/20 flex items-center justify-center">
                <Package className="h-6 w-6 text-[#2DD4BF]" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#ECFEFF] p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#334155]">Low Stock</p>
                <p className="text-3xl font-bold text-[#FB7185] mt-2">{stats.lowStock}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#FB7185]/20 to-[#FF6B6B]/20 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-[#FB7185]" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#ECFEFF] p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#334155]">Total Value</p>
                <p className="text-3xl font-bold text-[#0F172A] mt-2">${stats.totalValue}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#0F172A]/20 to-[#334155]/20 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-[#0F172A]" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#ECFEFF] p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#334155]">Avg. Price</p>
                <p className="text-3xl font-bold text-[#2DD4BF] mt-2">${stats.averagePrice}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#2DD4BF]/20 to-[#22D3EE]/20 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-[#2DD4BF]" />
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#ECFEFF] p-6 mb-8 shadow-xl">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#334155]" />
                <input
                  type="text"
                  placeholder="Search products by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[#ECFEFF] bg-white/50 focus:border-[#2DD4BF] focus:ring-2 focus:ring-[#2DD4BF]/20 focus:outline-none transition-all duration-300 text-[#0F172A] placeholder-[#334155]/50"
                />
              </div>
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeFilter === category
                      ? 'bg-gradient-to-r from-[#2DD4BF] to-[#22D3EE] text-white shadow-lg'
                      : 'bg-white/50 border border-[#ECFEFF] text-[#334155] hover:border-[#2DD4BF]/30 hover:shadow-md'
                  }`}
                >
                  {category === 'all' ? 'All Products' : category}
                  {category !== 'all' && (
                    <span className="ml-2 text-xs bg-[#ECFEFF] text-[#334155] px-2 py-0.5 rounded-full">
                      {products.filter(p => p.category === category).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Form */}
        {/* Product form moved to separate page */}

        {/* Products List */}
        {isLoading ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#ECFEFF] p-16 shadow-xl">
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 rounded-full border-4 border-[#ECFEFF] border-t-[#2DD4BF] animate-spin"></div>
              <p className="mt-6 text-lg font-medium text-[#0F172A]">Loading your products...</p>
              <p className="text-sm text-[#334155] mt-2">Fetching the latest inventory data</p>
            </div>
          </div>
        ) : (
          <ProductList
            products={filteredProducts}
            onEdit={(product) => {
              navigate('/add-products', { state: { editing: true, initialData: product } });
            }}
            onDelete={handleDeleteProduct}
          />
        )}

        {/* Empty State */}
        {!isLoading && filteredProducts.length === 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#ECFEFF] p-16 shadow-xl text-center">
            <div className="max-w-md mx-auto">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-[#2DD4BF]/20 to-[#22D3EE]/20 flex items-center justify-center mx-auto">
                <Database className="h-10 w-10 text-[#2DD4BF]" />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-[#0F172A]">No products found</h3>
              <p className="mt-3 text-[#334155]">
                {searchTerm || activeFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria' 
                  : 'Get started by adding your first product'}
              </p>
              <button
                onClick={() => navigate('/add-products')}
                className="mt-8 group inline-flex items-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#2DD4BF] to-[#22D3EE] text-white font-semibold hover:shadow-2xl hover:shadow-[#2DD4BF]/30 transform hover:-translate-y-0.5 transition-all duration-300"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Your First Product
                <Zap className="h-4 w-4 ml-2 group-hover:rotate-12 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* Import/Export Mobile Buttons */}
        <div className="md:hidden flex items-center justify-center space-x-3 mt-8">
          <label className="flex items-center px-4 py-2.5 rounded-xl bg-white/80 backdrop-blur-sm border border-[#2DD4BF]/30 text-[#334155] hover:bg-white hover:border-[#2DD4BF]/50 transition-all duration-200 cursor-pointer">
            <Upload className="h-4 w-4 mr-2" />
            Import CSV
            <input
              type="file"
              accept=".csv"
              onChange={handleImport}
              className="hidden"
            />
          </label>
          <button
            onClick={handleExport}
            className="flex items-center px-4 py-2.5 rounded-xl bg-white/80 backdrop-blur-sm border border-[#2DD4BF]/30 text-[#334155] hover:bg-white hover:border-[#2DD4BF]/50 transition-all duration-200"
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </button>
        </div>

        {/* Stats Summary */}
        {!isLoading && filteredProducts.length > 0 && (
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-[#0F172A] to-[#334155] text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-lg font-semibold">Inventory Summary</h4>
                <p className="text-sm text-[#ECFEFF]/70">
                  Showing {filteredProducts.length} of {products.length} products
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="text-center">
                  <p className="text-sm text-[#ECFEFF]/70">Total Value</p>
                  <p className="text-2xl font-bold text-[#2DD4BF]">
                    ${filteredProducts.reduce((sum, p) => sum + (p.price * p.quantity), 0).toFixed(2)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-[#ECFEFF]/70">Avg. Stock</p>
                  <p className="text-2xl font-bold text-[#22D3EE]">
                    {filteredProducts.length > 0 
                      ? Math.round(filteredProducts.reduce((sum, p) => sum + p.quantity, 0) / filteredProducts.length)
                      : 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;