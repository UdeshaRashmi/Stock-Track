import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Zap, Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight, Package } from 'lucide-react';

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
      navigate('/products');
    } catch (err) {
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ECFEFF] via-white to-[#ECFEFF]">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[#2DD4BF]/10 to-[#22D3EE]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-[#22D3EE]/10 to-[#2DD4BF]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row min-h-screen">
          {/* Left Column - Hero */}
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
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#2DD4BF]/10 to-[#22D3EE]/10 border border-[#2DD4BF]/20 mb-6">
                <Sparkles className="w-4 h-4 text-[#2DD4BF]" />
                <span className="text-sm font-medium text-[#0F172A]">Welcome Back</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                <span className="bg-gradient-to-r from-[#0F172A] via-[#2DD4BF] to-[#22D3EE] bg-clip-text text-transparent">
                  Sign In
                </span>
                <br />
                <span className="text-[#334155]">to Your Dashboard</span>
              </h1>
              
              <p className="text-lg text-[#334155] mb-10 leading-relaxed">
                Access your inventory, analytics, and team management tools. 
                Manage your business efficiently with real-time insights.
              </p>

              {/* Features List */}
              <div className="space-y-4 mb-12">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#2DD4BF]/10 to-[#22D3EE]/10 flex items-center justify-center">
                    <Package className="w-4 h-4 text-[#2DD4BF]" />
                  </div>
                  <span className="text-[#334155]">Manage 1,000+ inventory items</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#2DD4BF]/10 to-[#22D3EE]/10 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#2DD4BF]" />
                  </div>
                  <span className="text-[#334155]">AI-powered analytics dashboard</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#2DD4BF]/10 to-[#22D3EE]/10 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-[#2DD4BF]" />
                  </div>
                  <span className="text-[#334155]">Real-time team collaboration</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Login Form */}
          <div className="lg:w-1/2 flex items-center justify-center py-12 lg:py-0">
            <div className="w-full max-w-md">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#ECFEFF]/50 shadow-2xl p-8 lg:p-10">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-[#2DD4BF] to-[#22D3EE] mb-4 shadow-lg">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#0F172A]">Welcome Back</h2>
                  <p className="text-[#334155] mt-2">Sign in to continue to Stock Track</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#334155]">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2DD4BF]">
                        <Mail className="w-5 h-5" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#ECFEFF] bg-white/50 focus:border-[#2DD4BF] focus:ring-2 focus:ring-[#2DD4BF]/20 focus:outline-none transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium text-[#334155]">
                        Password
                      </label>
                      <Link 
                        to="/forgot-password" 
                        className="text-sm text-[#2DD4BF] hover:text-[#22D3EE] transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>
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
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
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
                        Signing in...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        Sign In
                        <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </button>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[#ECFEFF]"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white/80 text-[#334155]">Or continue with</span>
                    </div>
                  </div>

                  {/* Social Login */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      className="py-3 px-4 rounded-xl border border-[#ECFEFF] bg-white/50 hover:bg-white hover:border-[#2DD4BF]/30 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span className="text-sm font-medium text-[#334155]">Google</span>
                    </button>
                    <button
                      type="button"
                      className="py-3 px-4 rounded-xl border border-[#ECFEFF] bg-white/50 hover:bg-white hover:border-[#2DD4BF]/30 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <svg className="w-5 h-5 text-[#333]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <span className="text-sm font-medium text-[#334155]">GitHub</span>
                    </button>
                  </div>

                  {/* Sign Up Link */}
                  <div className="text-center pt-4">
                    <p className="text-[#334155]">
                      Don't have an account?{' '}
                      <Link 
                        to="/signup" 
                        className="font-semibold text-[#2DD4BF] hover:text-[#22D3EE] transition-colors"
                      >
                        Sign up for free
                      </Link>
                    </p>
                  </div>
                </form>
              </div>

              {/* Footer Note */}
              <div className="mt-8 text-center">
                <p className="text-sm text-[#334155]">
                  By signing in, you agree to our{' '}
                  <Link to="/terms" className="text-[#2DD4BF] hover:text-[#22D3EE] transition-colors">
                    Terms
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-[#2DD4BF] hover:text-[#22D3EE] transition-colors">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="fixed top-20 right-20 w-2 h-2 bg-[#2DD4BF] rounded-full animate-ping opacity-20"></div>
      <div className="fixed bottom-32 left-16 w-1 h-1 bg-[#22D3EE] rounded-full animate-pulse"></div>
      <div className="fixed top-1/2 right-32 w-3 h-3 bg-[#FB7185] rounded-full animate-ping opacity-30"></div>
    </div>
  );
};

export default Login;