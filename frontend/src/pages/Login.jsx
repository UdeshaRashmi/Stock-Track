import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Shield, 
  Zap, 
  ArrowRight
} from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await auth.login({ email, password });
      navigate('/products'); // Redirect after login
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ECFEFF] via-white to-[#ECFEFF]">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row min-h-screen">

          {/* Left Column */}
          <div className="lg:w-1/2 flex flex-col justify-center py-12 lg:py-0">
            <Link to="/" className="flex items-center space-x-3 mb-12 lg:mb-16">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2DD4BF] to-[#22D3EE] shadow-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-[#0F172A] to-[#334155] bg-clip-text text-transparent">
                  Stock Track
                </span>
                <p className="text-sm text-[#334155]">Intelligent Inventory Management</p>
              </div>
            </Link>

            <div className="max-w-lg">
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                <span className="bg-gradient-to-r from-[#0F172A] via-[#2DD4BF] to-[#22D3EE] bg-clip-text text-transparent">
                  Welcome Back
                </span>
                <br />
                <span className="text-[#334155]">Sign in to continue</span>
              </h1>
              <p className="text-lg text-[#334155] mb-10 leading-relaxed">
                Access your dashboard and manage inventory efficiently.
              </p>
            </div>
          </div>

          {/* Right Column - Login Form */}
          <div className="lg:w-1/2 flex items-center justify-center py-12 lg:py-0">
            <div className="w-full max-w-md">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#ECFEFF]/50 shadow-2xl p-8 lg:p-10">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-[#2DD4BF] to-[#22D3EE] mb-4 shadow-lg">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#0F172A]">Sign In</h2>
                  <p className="text-[#334155] mt-2">Welcome back! Please login</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#334155]">Email Address</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2DD4BF]">
                        <Mail className="w-5 h-5" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#ECFEFF] bg-white/50 focus:border-[#2DD4BF] focus:ring-2 focus:ring-[#2DD4BF]/20 focus:outline-none transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#334155]">Password</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2DD4BF]">
                        <Lock className="w-5 h-5" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full pl-12 pr-12 py-3 rounded-xl border border-[#ECFEFF] bg-white/50 focus:border-[#2DD4BF] focus:ring-2 focus:ring-[#2DD4BF]/20 focus:outline-none transition-all duration-300"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#334155] hover:text-[#0F172A]"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="p-3 rounded-xl bg-gradient-to-r from-[#FFB6C1]/20 to-[#FB7185]/10 border border-[#FB7185]/20 text-[#FB7185] text-sm">
                      {error}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#2DD4BF] to-[#22D3EE] text-white font-semibold shadow-lg hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                        Signing In...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        Sign In
                        <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </button>

                  {/* Forgot Password */}
                  <div className="text-center pt-4">
                    <Link 
                      to="/forgot-password" 
                      className="text-sm text-[#2DD4BF] hover:text-[#22D3EE] transition-colors"
                    >
                      Forgot your password?
                    </Link>
                  </div>

                  {/* Signup Link */}
                  <div className="text-center pt-4">
                    <p className="text-[#334155]">
                      Don't have an account?{' '}
                      <Link 
                        to="/signup" 
                        className="font-semibold text-[#2DD4BF] hover:text-[#22D3EE] transition-colors"
                      >
                        Sign up here
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
