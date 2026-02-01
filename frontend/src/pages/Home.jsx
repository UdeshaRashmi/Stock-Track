import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  TrendingUp, 
  Users, 
  BarChart3, 
  ArrowRight, 
  Sparkles,
  Rocket,
  Target,
  CheckCircle,
  Award,
  Star,
  ShoppingCart,
  DollarSign,
  ShieldCheck,
  Zap,
  Cloud,
  Layers,
  Smartphone
} from 'lucide-react';

// Import or use placeholder images
const heroImage = "https://www.shutterstock.com/image-photo/young-woman-sitting-on-blue-260nw-2550877783.jpghttps://www.shutterstock.com/image-photo/shipping-small-business-woman-tablet-260nw-2487067881.jpg";
const dashboardImage = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";

const Home = () => {
  const stats = [
    { 
      label: 'Total Products', 
      value: '1,248', 
      icon: Package, 
      change: '+12%', 
      trend: 'up',
      description: 'Active inventory items'
    },
    { 
      label: 'Monthly Revenue', 
      value: '$89.2K', 
      icon: DollarSign, 
      change: '+18%', 
      trend: 'up',
      description: 'Current month earnings'
    },
    { 
      label: 'Active Users', 
      value: '8,569', 
      icon: Users, 
      change: '+23%', 
      trend: 'up',
      description: 'Platform users'
    },
    { 
      label: 'Order Accuracy', 
      value: '99.8%', 
      icon: ShieldCheck, 
      change: '+0.5%', 
      trend: 'up',
      description: 'Fulfillment precision'
    },
  ];

  const features = [
    {
      title: 'Real-time Inventory',
      description: 'Track stock levels across multiple locations with live updates',
      icon: Package,
      highlights: ['Live updates', 'Low stock alerts', 'Multi-location sync']
    },
    {
      title: 'Smart Analytics',
      description: 'AI-powered insights to optimize your inventory strategy',
      icon: BarChart3,
      highlights: ['Sales forecasts', 'Trend analysis', 'Performance dashboards']
    },
    {
      title: 'Mobile Management',
      description: 'Manage your inventory from anywhere with our mobile app',
      icon: Smartphone,
      highlights: ['iOS & Android', 'Barcode scanning', 'Offline mode']
    },
    {
      title: 'Cloud Sync',
      description: 'Automatically sync data across all devices and team members',
      icon: Cloud,
      highlights: ['Real-time sync', 'Secure backups', 'Team collaboration']
    },
  ];

  const quickActions = [
    { 
      icon: Package, 
      label: 'View Products', 
      action: '/products', 
      description: 'Browse your inventory',
      color: 'bg-blue-500'
    },
    { 
      icon: ShoppingCart, 
      label: 'Add Product', 
      action: '/products/add', 
      description: 'Expand your catalog',
      color: 'bg-emerald-500'
    },
    { 
      icon: BarChart3, 
      label: 'Analytics', 
      action: '/analytics', 
      description: 'View insights',
      color: 'bg-purple-500'
    },
    { 
      icon: Users, 
      label: 'Team Settings', 
      action: '/team', 
      description: 'Manage access',
      color: 'bg-amber-500'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Image */}
      <div className="relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-blue-900/90"></div>
        </div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-32 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-8">
                <Sparkles className="w-4 h-4" />
                Modern Inventory Platform
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Take Control of Your
                <span className="block mt-3 bg-gradient-to-r from-blue-300 to-emerald-300 bg-clip-text text-transparent">
                  Inventory Management
                </span>
              </h1>
              
              <p className="text-xl text-blue-100 mb-10 max-w-2xl leading-relaxed">
                Streamline operations, reduce costs, and boost efficiency with our 
                all-in-one inventory management solution. Perfect for businesses of all sizes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/dashboard"
                  className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl bg-white text-blue-900 hover:bg-blue-50 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <Rocket className="w-5 h-5 mr-3" />
                  Start Free Trial
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link
                  to="/demo"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl bg-transparent text-white border-2 border-white/50 hover:border-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
                >
                  <Target className="w-5 h-5 mr-3" />
                  Watch Demo
                </Link>
              </div>
              
              {/* Trust Badges */}
              <div className="mt-12 flex items-center gap-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 text-white text-sm">4.9/5 Rating</span>
                </div>
                <div className="text-white text-sm">
                  <span className="font-semibold">5,000+</span> Businesses Trust Us
                </div>
              </div>
            </div>
            
            {/* Right Column - Dashboard Preview */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Dashboard Preview */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-500">
                  <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                          <Package className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-white font-semibold">StockTrack Dashboard</span>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    {/* Mock Data */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-blue-900">1,248</div>
                        <div className="text-sm text-blue-700">Total Products</div>
                      </div>
                      <div className="bg-emerald-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-emerald-900">$89.2K</div>
                        <div className="text-sm text-emerald-700">Monthly Revenue</div>
                      </div>
                    </div>
                    <div className="h-32 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-12 h-12 text-blue-400" />
                    </div>
                  </div>
                </div>
                
                {/* Floating Stats */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">+32%</div>
                      <div className="text-sm text-gray-600">Growth</div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">8.5K</div>
                      <div className="text-sm text-gray-600">Users</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.icon === DollarSign ? 'bg-emerald-50' : stat.icon === ShieldCheck ? 'bg-green-50' : 'bg-blue-50'}`}>
                  <stat.icon className={`w-6 h-6 ${
                    stat.icon === DollarSign ? 'text-emerald-600' : 
                    stat.icon === ShieldCheck ? 'text-green-600' : 
                    'text-blue-600'
                  }`} />
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  stat.trend === 'up' 
                    ? 'bg-green-50 text-green-700' 
                    : 'bg-red-50 text-red-700'
                }`}>
                  {stat.change}
                </div>
              </div>
              
              <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm font-medium text-gray-900 mb-1">{stat.label}</p>
              <p className="text-sm text-gray-500">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for
            <span className="block mt-2 bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
              Modern Businesses
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Everything you need to manage inventory efficiently and scale your business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-400 inline-block">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-6">{feature.description}</p>
              
              <div className="space-y-2">
                {feature.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="bg-gradient-to-br from-blue-50 to-emerald-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get Started in Minutes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Quick access to essential features for managing your inventory
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.action}
                className="group bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${action.color} text-white`}>
                    <action.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {action.label}
                    </p>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <div className="inline-flex flex-col items-center gap-8">
              <div className="max-w-2xl">
                <h4 className="text-3xl font-bold text-gray-900 mb-4">
                  Ready to Streamline Your Inventory?
                </h4>
                <p className="text-xl text-gray-600">
                  Join thousands of successful businesses using StockTrack
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 text-white hover:from-blue-700 hover:to-emerald-600 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Award className="w-5 h-5 mr-3" />
                  Start 14-Day Free Trial
                </Link>
                
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl bg-white text-gray-900 border border-gray-300 hover:border-gray-400 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  Schedule a Demo
                </Link>
              </div>
              
              <p className="text-sm text-gray-500">
                No credit card required • Full platform access • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;