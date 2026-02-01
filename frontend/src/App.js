import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import AddProducts from "./pages/AddProducts";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Auth
import { AuthProvider, RequireAuth } from "./context/AuthContext";

function App() {
  // State for products
  const [products, setProducts] = useState([
    { id: 1, name: "Sample Product", price: 100, quantity: 5 },
  ]);

  // Add product
  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  // Delete product
  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  // Update product
  const updateProduct = (updatedProduct) => {
    setProducts(
      products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <AuthProvider>
          {/* Navbar */}
          <Navbar />

          {/* Page Content */}
          <div className="pt-16 p-6 max-w-6xl mx-auto">
            <Routes>
              {/* Home */}
              <Route path="/" element={<Home />} />

              {/* Public auth routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected routes */}
              <Route path="/products" element={<RequireAuth><Products /></RequireAuth>} />
              <Route path="/add-products" element={<RequireAuth><AddProducts /></RequireAuth>} />
            </Routes>
          </div>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
