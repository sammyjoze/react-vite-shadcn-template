import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AuthPopup from '@/components/AuthPopup';
import SignUpPopup from '@/components/SignUpPopup';
import TermsPopup from '@/components/TermsPopup';
import PrivacyPopup from '@/components/PrivacyPopup';
import ContactPopup from '@/components/ContactPopup';
import ThemeToggle from '@/components/ThemeToggle';
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Users, 
  Zap,
  Shield,
  TrendingUp,
  Globe,
  Check,
  Crown,
  Sparkles,
  Rocket,
  Target,
  Award,
  Loader2,
  PenTool,
  Download,
  Inbox,
  FileText,
  Send,
  Trash2,
  Search,
  Play,
  Settings
} from 'lucide-react';
import { STRIPE_PRODUCTS, stripePromise, PlanType } from '@/lib/stripe';

const Index: React.FC = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      setIsAuthOpen(true);
    }
  };

  const handleSubscribe = async (planType: PlanType) => {
    if (!isAuthenticated) {
      setIsAuthOpen(true);
      return;
    }

    setIsLoading(planType);
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      // Check if we're using mock Stripe
      if (STRIPE_PRODUCTS[planType].priceId.includes('mock')) {
        alert('Stripe is not configured. Please set up your environment variables.');
        return;
      }

      // Create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: STRIPE_PRODUCTS[planType].priceId,
          userId: user?.id,
          planType,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await response.json();
      
      // Redirect to Stripe checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Payment processing is not configured. Please set up your backend API.');
    } finally {
      setIsLoading(null);
    }
  };

  const handleSwitchToSignup = () => {
    setIsAuthOpen(false);
    setIsSignUpOpen(true);
  };

  const handleSwitchToLogin = () => {
    setIsSignUpOpen(false);
    setIsAuthOpen(true);
  };

  const handleCloseAuth = () => {
    setIsAuthOpen(false);
  };

  const handleCloseSignup = () => {
    setIsSignUpOpen(false);
  };

  const plans = [
    {
      name: 'Free',
      price: 0,
      description: 'Perfect for getting started',
      features: [
        'Up to 3 projects',
        'Basic analytics',
        'Email support',
        '1 team member',
        '2GB storage',
        'Community forum access'
      ],
      buttonText: 'Get Started',
      popular: false,
      icon: Star,
      gradient: 'from-gray-400 to-gray-600',
      onClick: () => handleGetStarted()
    },
    {
      name: 'Pro',
      price: STRIPE_PRODUCTS.PRO.price,
      description: 'For growing teams and businesses',
      features: [
        'Unlimited projects',
        'Advanced analytics',
        'Priority support',
        'Team collaboration',
        'API access',
        '50GB storage',
        'Custom integrations',
        'Advanced reporting',
        'White-label options',
        'Dedicated account manager'
      ],
      buttonText: 'Subscribe to Pro',
      popular: true,
      icon: Zap,
      planType: 'PRO' as PlanType,
      gradient: 'from-blue-500 to-purple-600',
      onClick: () => handleSubscribe('PRO')
    },
    {
      name: 'Enterprise',
      price: STRIPE_PRODUCTS.ENTERPRISE.price,
      description: 'For large organizations',
      features: [
        'Everything in Pro',
        'Custom integrations',
        'Dedicated support',
        'Advanced security',
        'Custom branding',
        'Unlimited storage',
        'SLA guarantees',
        'On-premise deployment',
        'Custom training',
        '24/7 phone support',
        'Advanced compliance',
        'Custom contracts'
      ],
      buttonText: 'Subscribe to Enterprise',
      popular: false,
      icon: Crown,
      planType: 'ENTERPRISE' as PlanType,
      gradient: 'from-orange-500 to-red-600',
      onClick: () => handleSubscribe('ENTERPRISE')
    }
  ];

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Experience blazing fast performance with our optimized platform",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Your data is protected with enterprise-grade security measures",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: TrendingUp,
      title: "Scalable Growth",
      description: "Scale your operations seamlessly as your business grows",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work together efficiently with powerful collaboration tools",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: CheckCircle,
      title: "Easy Integration",
      description: "Connect with your favorite tools and services effortlessly",
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      icon: Award,
      title: "Premium Support",
      description: "Get help when you need it with our dedicated support team",
      gradient: "from-red-500 to-pink-500"
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-gray-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Globe className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500" />
                <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-500 animate-pulse" />
              </div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-400 bg-clip-text text-transparent">
                YourApp
              </span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <ThemeToggle />
              {isAuthenticated ? (
                <Button variant="outline" size="sm" className="sm:size-default hover:bg-yellow-500 hover:text-black transition-all duration-200 border-gray-700 text-white">
                  <span className="hidden sm:inline">Account</span>
                  <span className="sm:hidden">Account</span>
                </Button>
              ) : (
                <Button variant="outline" onClick={() => setIsAuthOpen(true)} size="sm" className="sm:size-default hover:bg-yellow-500 hover:text-black transition-all duration-200 border-gray-700 text-white">
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 sm:py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-transparent to-yellow-500/5 rounded-full blur-3xl"></div>
        <div className="relative max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4 animate-fade-in bg-yellow-500 text-black border-0">
            <Sparkles className="h-3 w-3 mr-1" />
            ✨ Now Available
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 animate-fade-in text-white">
            Transform Your Workflow
            <span className="bg-gradient-to-r from-yellow-500 to-yellow-400 bg-clip-text text-transparent"> Today</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4 animate-fade-in">
            Streamline your processes, boost productivity, and achieve more with our powerful platform designed for modern teams.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 animate-fade-in">
            <Button size="lg" onClick={handleGetStarted} className="h-12 sm:h-10 bg-yellow-500 hover:bg-yellow-400 text-black transition-all duration-200 shadow-lg hover:shadow-xl">
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 sm:h-10 hover:bg-yellow-500 hover:text-black transition-all duration-200 border-gray-700 text-white"
            >
              <Rocket className="mr-2 h-4 w-4" />
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="container mx-auto px-4 py-12 sm:py-20 overflow-hidden">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto px-4">
            Create your perfect logo in just three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Step 1 */}
          <div className="text-center relative">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <PenTool className="h-10 w-10 text-black" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
                1
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Describe your logo</h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Tell us about your brand and specify your design preferences all in one step.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center relative">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Sparkles className="h-10 w-10 text-black" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
                2
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">AI generates options</h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Our AI creates a professional logo based on your description and specifications.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center relative">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Download className="h-10 w-10 text-black" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
                3
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Download and use</h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Get your logo in SVG format, ready to use on your website, social media, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="container mx-auto px-4 py-12 sm:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">
            See It In Action
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto px-4">
            Watch how easy it is to create your perfect logo
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Email Client Mockup */}
          <div className="bg-gray-900 rounded-lg shadow-2xl overflow-hidden border border-gray-700">
            {/* Email Client Header */}
            <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-gray-300 text-xs">Email Client</div>
                <div className="w-16"></div>
              </div>
            </div>

            {/* Email Client Content */}
            <div className="flex">
              {/* Left Sidebar */}
              <div className="w-48 bg-gray-800 border-r border-gray-700">
                <div className="p-3">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-gray-300 hover:bg-gray-700 px-2 py-1 rounded cursor-pointer">
                      <Inbox className="h-3 w-3" />
                      <span className="text-xs">Inbox</span>
                      <span className="ml-auto text-xs bg-yellow-500 text-black px-1 py-0.5 rounded">12</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400 hover:bg-gray-700 px-2 py-1 rounded cursor-pointer">
                      <FileText className="h-3 w-3" />
                      <span className="text-xs">Drafts</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400 hover:bg-gray-700 px-2 py-1 rounded cursor-pointer">
                      <Send className="h-3 w-3" />
                      <span className="text-xs">Sent</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400 hover:bg-gray-700 px-2 py-1 rounded cursor-pointer">
                      <Trash2 className="h-3 w-3" />
                      <span className="text-xs">Trash</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle Pane - Email List */}
              <div className="flex-1 bg-gray-900">
                <div className="p-3 border-b border-gray-700">
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Q Search" 
                      className="w-full pl-7 pr-3 py-1.5 bg-gray-800 border border-gray-700 rounded text-white text-xs focus:outline-none focus:border-yellow-500"
                    />
                  </div>
                </div>
                <div className="p-3 space-y-2">
                  <div className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded cursor-pointer">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-black font-semibold text-xs">WS</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-1">
                        <span className="text-white font-medium text-xs">William Smith</span>
                        <span className="text-xs bg-blue-500 text-white px-1 py-0.5 rounded">meeting</span>
                      </div>
                      <p className="text-gray-300 text-xs">Project update meeting tomorrow</p>
                    </div>
                    <span className="text-gray-400 text-xs">2h</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded cursor-pointer">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-black font-semibold text-xs">AS</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-1">
                        <span className="text-white font-medium text-xs">Alice Smith</span>
                        <span className="text-xs bg-red-500 text-white px-1 py-0.5 rounded">important</span>
                      </div>
                      <p className="text-gray-300 text-xs">Budget approval needed</p>
                    </div>
                    <span className="text-gray-400 text-xs">1d</span>
                  </div>
                </div>
              </div>

              {/* Right Pane - Open Email */}
              <div className="w-72 bg-gray-900 border-l border-gray-700">
                <div className="p-3 border-b border-gray-700">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-black font-semibold text-xs">WS</span>
                    </div>
                    <div>
                      <div className="text-white font-medium text-xs">William Smith</div>
                      <div className="text-gray-400 text-xs">william.smith@company.com</div>
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <div className="text-gray-300 text-xs leading-relaxed">
                    Hi team,<br/><br/>
                    I wanted to schedule our project update meeting for tomorrow at 2 PM. Please let me know if this works for everyone.<br/><br/>
                    Best regards,<br/>
                    William
                  </div>
                  <div className="mt-4 space-y-2">
                    <input 
                      type="text" 
                      placeholder="Reply William Smith..." 
                      className="w-full px-2 py-1.5 bg-gray-800 border border-gray-700 rounded text-white text-xs focus:outline-none focus:border-yellow-500"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <input type="checkbox" id="mute" className="rounded" />
                        <label htmlFor="mute" className="text-gray-300 text-xs">Mute this thread</label>
                      </div>
                      <Button className="bg-yellow-500 hover:bg-yellow-400 text-black text-xs px-3 py-1 h-6">
                        Send
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Play Button Overlay */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-200 cursor-pointer">
              <Play className="h-6 w-6 text-black ml-0.5" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12 sm:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">
            Why Choose Our Platform?
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto px-4">
            Built with modern technology and designed for the best user experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-gray-900/50 backdrop-blur-sm"
            >
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${feature.gradient} group-hover:scale-110 transition-transform duration-200`}>
                    <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <CardTitle className="text-base sm:text-lg text-white">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm sm:text-base text-gray-300">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-12 sm:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <Badge variant="secondary" className="mb-4 bg-yellow-500 text-black border-0">
            💰 Pricing
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">
            Simple, Transparent Pricing
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto px-4">
            Choose the plan that's right for you. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${
                plan.popular 
                  ? 'border-yellow-500 shadow-lg scale-105 bg-gradient-to-br from-yellow-500/5 to-yellow-500/10 ring-2 ring-yellow-500/20' 
                  : 'border-0 bg-gray-900/50 backdrop-blur-sm'
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black border-0">
                  ⭐ Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-6">
                <div className="flex justify-center mb-4">
                  <div className={`p-4 rounded-full bg-gradient-to-r ${plan.gradient} group-hover:scale-110 transition-transform duration-200 shadow-lg`}>
                    <plan.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-xl sm:text-2xl mb-2 text-white">{plan.name}</CardTitle>
                <CardDescription className="text-sm sm:text-base mb-4 text-gray-300">
                  {plan.description}
                </CardDescription>
                <div className="mb-4">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl sm:text-5xl font-bold text-white">
                      ${plan.price}
                    </span>
                    <span className="text-gray-300 ml-2">/month</span>
                  </div>
                  {plan.price === 0 && (
                    <p className="text-sm text-gray-300 mt-1">Forever free</p>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-gray-400 uppercase tracking-wide">
                    What's included:
                  </h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-0.5">
                          <Check className="h-4 w-4 text-green-500" />
                        </div>
                        <span className="text-sm sm:text-base text-gray-300 leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4">
                  <Button
                    className="w-full h-11 sm:h-10 transition-all duration-200 font-medium"
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={plan.onClick}
                    disabled={isLoading === plan.planType}
                  >
                    {isLoading === plan.planType ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      plan.buttonText
                    )}
                  </Button>
                </div>

                {plan.price > 0 && (
                  <div className="text-center">
                    <p className="text-xs text-gray-400">
                      ✓ 14-day free trial
                    </p>
                    <p className="text-xs text-gray-400">
                      ✓ Cancel anytime
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Pricing Info */}
        <div className="mt-16 sm:mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2 text-white">No Setup Fees</h3>
              <p className="text-sm text-gray-300">
                Get started immediately with no hidden costs or setup fees
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2 text-white">Secure & Reliable</h3>
              <p className="text-sm text-gray-300">
                Enterprise-grade security with 99.9% uptime guarantee
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2 text-white">24/7 Support</h3>
              <p className="text-sm text-gray-300">
                Get help whenever you need it with our dedicated support team
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 sm:mt-20 text-center">
          <h3 className="text-xl sm:text-2xl font-bold mb-8 text-white">
            Frequently Asked Questions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-left p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm hover:shadow-lg transition-all duration-200">
              <h4 className="font-semibold mb-2 text-white">Can I cancel anytime?</h4>
              <p className="text-gray-300 text-sm sm:text-base">
                Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
              </p>
            </div>
            <div className="text-left p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm hover:shadow-lg transition-all duration-200">
              <h4 className="font-semibold mb-2 text-white">Is there a free trial?</h4>
              <p className="text-gray-300 text-sm sm:text-base">
                Yes, all paid plans include a 14-day free trial. No credit card required to start.
              </p>
            </div>
            <div className="text-left p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm hover:shadow-lg transition-all duration-200">
              <h4 className="font-semibold mb-2 text-white">What payment methods do you accept?</h4>
              <p className="text-gray-300 text-sm sm:text-base">
                We accept all major credit cards, debit cards, and digital wallets through Stripe.
              </p>
            </div>
            <div className="text-left p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm hover:shadow-lg transition-all duration-200">
              <h4 className="font-semibold mb-2 text-white">Do you offer refunds?</h4>
              <p className="text-gray-300 text-sm sm:text-base">
                We offer a 30-day money-back guarantee. If you're not satisfied, we'll refund your payment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-12 sm:py-20">
        <div className="bg-gradient-to-r from-yellow-500/10 via-yellow-500/5 to-yellow-500/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-transparent to-yellow-500/5 rounded-full blur-3xl"></div>
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">
              Ready to Get Started?
            </h2>
            <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Join thousands of users who have already transformed their workflow with our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleGetStarted}
                className="h-12 sm:h-10 bg-yellow-500 hover:bg-yellow-400 text-black transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Start Your Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Globe className="h-6 w-6 text-yellow-500" />
                <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-500 animate-pulse" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-yellow-500 to-yellow-400 bg-clip-text text-transparent">
                YourApp
              </span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-300">
              <Button 
                variant="link" 
                className="p-0 h-auto font-normal hover:text-yellow-500 transition-colors duration-200 text-gray-300"
                onClick={() => setIsContactOpen(true)}
              >
                Contact
              </Button>
              <Button 
                variant="link" 
                className="p-0 h-auto font-normal hover:text-yellow-500 transition-colors duration-200 text-gray-300"
                onClick={() => setIsTermsOpen(true)}
              >
                Terms
              </Button>
              <Button 
                variant="link" 
                className="p-0 h-auto font-normal hover:text-yellow-500 transition-colors duration-200 text-gray-300"
                onClick={() => setIsPrivacyOpen(true)}
              >
                Privacy
              </Button>
              <Button 
                variant="link" 
                className="p-0 h-auto font-normal hover:text-yellow-500 transition-colors duration-200 text-yellow-500 flex items-center"
                onClick={() => navigate('/admin')}
              >
                <Shield className="h-4 w-4" />
              </Button>
              <span className="text-xs text-gray-400">
                © {new Date().getFullYear()} YourApp. All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Popups */}
      <AuthPopup 
        isOpen={isAuthOpen} 
        onClose={handleCloseAuth}
        onSwitchToSignup={handleSwitchToSignup}
      />
      <SignUpPopup 
        isOpen={isSignUpOpen} 
        onClose={handleCloseSignup}
        onSwitchToLogin={handleSwitchToLogin}
        onOpenTerms={() => setIsTermsOpen(true)}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
      />
      <TermsPopup 
        isOpen={isTermsOpen} 
        onClose={() => setIsTermsOpen(false)}
      />
      <PrivacyPopup 
        isOpen={isPrivacyOpen} 
        onClose={() => setIsPrivacyOpen(false)}
      />
      <ContactPopup 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
};

export default Index;