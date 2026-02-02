import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  Home, 
  Package, 
  Plus, 
  Zap, 
  Menu,
  X,
  Bell,
  Sparkles,
  User,
  LogOut,
  Settings,
  BarChart3,
  ShoppingCart
} from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const auth = useAuth();

  const navItems = [
    { 
      path: "/", 
      label: "Home", 
      icon: <Home className="w-4 h-4" />,
      badge: null
    },
    { 
      path: "/products", 
      label: "Product List", 
      icon: <Package className="w-4 h-4" />,
      badge: null
    },
    
    { 
      path: "/add-products",
      label: "Add products", 
      icon: <Plus className="w-4 h-4" />,
      highlight: true,
      badge: <Sparkles className="w-3 h-3" />
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Modern Floating Navbar - Original Style */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-[#ECFEFF]/50">
          <div className="px-6 py-3">
            <div className="flex items-center justify-between">
              {/* Logo - Original Style */}
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2DD4BF] to-[#22D3EE] shadow-lg group-hover:shadow-2xl transition-all duration-300 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#FB7185] rounded-full animate-pulse"></div>
                </div>
                <div>
                  <span className="text-xl font-bold bg-gradient-to-r from-[#0F172A] to-[#334155] bg-clip-text text-transparent">
                    Stock Track
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation - Original Style */}
              <div className="hidden md:flex items-center space-x-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path + (item.label || '')}
                    to={item.path}
                    className={`
                      relative group flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300
                      ${item.highlight
                        ? "bg-gradient-to-r from-[#2DD4BF] to-[#22D3EE] text-white shadow-lg hover:shadow-2xl transform hover:-translate-y-0.5"
                        : isActive(item.path)
                        ? "bg-gradient-to-r from-[#ECFEFF] to-white text-[#0F172A] border border-[#2DD4BF]/30 shadow-md"
                        : "text-[#334155] hover:text-[#0F172A] hover:bg-[#ECFEFF] hover:border hover:border-[#2DD4BF]/20"
                      }
                    `}
                  >
                    <div className={item.highlight || isActive(item.path) ? "text-white" : "text-[#2DD4BF]"}>
                      {item.icon}
                    </div>
                    <span className="font-medium text-sm">{item.label}</span>
                    {item.badge && (
                      <span className={`absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full text-xs font-bold ${
                        item.highlight 
                          ? "bg-white text-[#0F172A]" 
                          : "bg-[#2DD4BF] text-white"
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    
                    {/* Glow Effect */}
                    {item.highlight && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#2DD4BF]/20 to-[#22D3EE]/20 blur-md -z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    )}
                  </Link>
                ))}

                {/* Divider */}
                <div className="w-px h-6 bg-gradient-to-b from-transparent via-[#ECFEFF] to-transparent mx-2"></div>
                
                {/* Right Side Actions */}
                <div className="flex items-center space-x-3">
                  {/* Notification Bell */}
                  <button className="relative p-2 rounded-xl text-[#334155] hover:text-[#0F172A] hover:bg-[#ECFEFF] hover:border hover:border-[#2DD4BF]/20 transition-all duration-300">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-[#FB7185] rounded-full animate-pulse"></span>
                  </button>

                  {/* User Menu */}
                  {auth && auth.user ? (
                    <div className="relative">
                      <button
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="flex items-center space-x-3 p-2 rounded-xl text-[#334155] hover:text-[#0F172A] hover:bg-[#ECFEFF] hover:border hover:border-[#2DD4BF]/20 transition-all duration-300"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2DD4BF] to-[#22D3EE] flex items-center justify-center text-white font-semibold shadow-md">
                          {auth.user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium text-[#0F172A]">{auth.user.name}</p>
                          <p className="text-xs text-[#334155]">Administrator</p>
                        </div>
                      </button>

                      {/* Dropdown Menu */}
                      {showUserMenu && (
                        <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-[#ECFEFF]/50 py-2 z-10">
                          <div className="px-4 py-3 border-b border-[#ECFEFF]">
                            <p className="text-sm font-medium text-[#0F172A]">{auth.user.name}</p>
                            <p className="text-xs text-[#334155]">{auth.user.email}</p>
                          </div>
                          <Link
                            to="/profile"
                            className="flex items-center px-4 py-3 text-sm text-[#334155] hover:text-[#0F172A] hover:bg-gradient-to-r from-[#ECFEFF] to-white/50 transition-all duration-200"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <User className="w-4 h-4 mr-3 text-[#2DD4BF]" />
                            Profile
                          </Link>
                          <Link
                            to="/settings"
                            className="flex items-center px-4 py-3 text-sm text-[#334155] hover:text-[#0F172A] hover:bg-gradient-to-r from-[#ECFEFF] to-white/50 transition-all duration-200"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <Settings className="w-4 h-4 mr-3 text-[#2DD4BF]" />
                            Settings
                          </Link>
                          <div className="border-t border-[#ECFEFF] mt-1 pt-1">
                            <button
                              onClick={() => {
                                setShowUserMenu(false);
                                auth.logout();
                              }}
                              className="flex items-center w-full px-4 py-3 text-sm text-[#FB7185] hover:text-[#FB7185]/80 hover:bg-gradient-to-r from-[#FFB6C1]/10 to-white/50 transition-all duration-200"
                            >
                              <LogOut className="w-4 h-4 mr-3" />
                              Sign out
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Link
                        to="/login"
                        className="px-4 py-2 text-sm font-medium text-[#334155] hover:text-[#0F172A] hover:bg-[#ECFEFF] hover:border hover:border-[#2DD4BF]/20 rounded-xl transition-all duration-300"
                      >
                        Sign in
                      </Link>
                      <Link
                        to="/signup"
                        className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#2DD4BF] to-[#22D3EE] rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-300"
                      >
                        Get Started
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-xl bg-gradient-to-r from-[#ECFEFF] to-white border border-[#2DD4BF]/30 text-[#0F172A] hover:border-[#2DD4BF]/50 transition-all duration-200"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/80 to-[#334155]/80 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Mobile Panel */}
          <div className="absolute right-4 top-20 w-[90%] max-w-sm ml-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-[#ECFEFF]/50 animate-slideIn">
            <div className="p-6">
              {/* Navigation */}
              <div className="space-y-2 mb-6">
                {navItems.map((item) => (
                  <Link
                    key={item.path + (item.label || '')}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`
                      flex items-center justify-between p-4 rounded-xl transition-all duration-200
                      ${item.highlight
                        ? "bg-gradient-to-r from-[#2DD4BF] to-[#22D3EE] text-white shadow-lg"
                        : isActive(item.path)
                        ? "bg-gradient-to-r from-[#ECFEFF] to-white border border-[#2DD4BF]/30"
                        : "hover:bg-[#ECFEFF] text-[#0F172A]"
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${item.highlight || isActive(item.path) ? "bg-white/20" : "bg-[#ECFEFF]"}`}>
                        {item.icon}
                      </div>
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        item.highlight || isActive(item.path)
                          ? "bg-white text-[#0F172A]"
                          : "bg-[#2DD4BF] text-white"
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>

              {/* User Section in Mobile */}
              {auth && auth.user ? (
                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-[#ECFEFF] to-white/50 border border-[#2DD4BF]/30">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2DD4BF] to-[#22D3EE] flex items-center justify-center text-white font-semibold shadow-md">
                      {auth.user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-[#0F172A]">{auth.user.name}</p>
                      <p className="text-sm text-[#334155]">{auth.user.email}</p>
                      <p className="text-xs text-[#2DD4BF]">Administrator</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      to="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="px-4 py-3 text-center text-sm text-[#334155] hover:text-[#0F172A] hover:bg-[#ECFEFF] hover:border hover:border-[#2DD4BF]/30 rounded-xl transition-all duration-200"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        auth.logout();
                      }}
                      className="px-4 py-3 text-center text-sm text-[#FB7185] hover:text-[#FB7185]/80 hover:bg-gradient-to-r from-[#FFB6C1]/10 to-white/50 hover:border hover:border-[#FB7185]/30 rounded-xl transition-all duration-200"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 mb-6">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full px-4 py-3 text-center text-sm text-[#334155] hover:text-[#0F172A] hover:bg-[#ECFEFF] hover:border hover:border-[#2DD4BF]/30 rounded-xl transition-all duration-200"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full px-4 py-3 text-center text-sm text-white bg-gradient-to-r from-[#2DD4BF] to-[#22D3EE] rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Get Started
                  </Link>
                </div>
              )}

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#ECFEFF]">
                <div className="text-center p-3 rounded-xl bg-gradient-to-r from-[#ECFEFF] to-white/50 border border-[#2DD4BF]/30">
                  <p className="text-xs text-[#334155]">Active</p>
                  <p className="text-lg font-bold text-[#0F172A]">24</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-gradient-to-r from-[#ECFEFF] to-white/50 border border-[#2DD4BF]/30">
                  <p className="text-xs text-[#334155]">Revenue</p>
                  <p className="text-lg font-bold text-[#2DD4BF]">$5.8K</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-gradient-to-r from-[#ECFEFF] to-white/50 border border-[#2DD4BF]/30">
                  <p className="text-xs text-[#334155]">Growth</p>
                  <p className="text-lg font-bold text-[#FB7185]">+32%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setShowUserMenu(false)}
        />
      )}

      {/* Floating Elements */}
      <div className="fixed top-28 left-6 w-2 h-2 bg-[#2DD4BF] rounded-full animate-ping opacity-20"></div>
      <div className="fixed top-32 right-8 w-1 h-1 bg-[#22D3EE] rounded-full animate-pulse"></div>
    </>
  );
};

export default Navbar;