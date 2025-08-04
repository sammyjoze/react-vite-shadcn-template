import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
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
  Settings,
  X,
  Grid
} from 'lucide-react';
import { STRIPE_PRODUCTS, stripePromise, PlanType } from '@/lib/stripe';

import { WaitlistSection } from '@/components/ui/waitlist';
import TestimonialsSection from '@/components/ui/testimonials-section';

import { PricingCard } from '@/components/ui/dark-gradient-pricing';

const Index: React.FC = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [isYearly, setIsYearly] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      setIsSignUpOpen(true);
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

  const handlePricingButtonClick = (tier: string) => {
    if (tier === "Enterprise") {
      setIsContactOpen(true);
    } else {
      setIsSignUpOpen(true);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const pricingData = [
    {
      tier: "Free",
      monthlyPrice: "$0",
      yearlyPrice: "$0",
      bestFor: "Best for 1-5 users",
      monthlyCTA: "Get started free",
      yearlyCTA: "Get started free",
      benefits: [
        { text: "One workspace", checked: true },
        { text: "Email support", checked: true },
        { text: "1 day data retention", checked: false },
        { text: "Custom roles", checked: false },
        { text: "Priority support", checked: false },
        { text: "SSO", checked: false },
      ]
    },
    {
      tier: "Pro",
      monthlyPrice: "$79",
      yearlyPrice: "$790",
      bestFor: "Best for 5-50 users",
      monthlyCTA: "14-day free trial",
      yearlyCTA: "14-day free trial",
      benefits: [
        { text: "Five workspaces", checked: true },
        { text: "Email support", checked: true },
        { text: "7 day data retention", checked: true },
        { text: "Custom roles", checked: true },
        { text: "Priority support", checked: false },
        { text: "SSO", checked: false },
      ]
    },
    {
      tier: "Enterprise",
      monthlyPrice: "Contact us",
      yearlyPrice: "Contact us",
      bestFor: "Best for 50+ users",
      monthlyCTA: "Contact us",
      yearlyCTA: "Contact us",
      benefits: [
        { text: "Unlimited workspaces", checked: true },
        { text: "Email support", checked: true },
        { text: "30 day data retention", checked: true },
        { text: "Custom roles", checked: true },
        { text: "Priority support", checked: true },
        { text: "SSO", checked: true },
      ]
    }
  ];

  const plans = [
    {
      name: 'Free',
      price: 0,
      description: 'Best for 1-5 users',
      features: [
        { text: 'One workspace', included: true },
        { text: 'Email support', included: true },
        { text: '1 day data retention', included: false },
        { text: 'Custom roles', included: false },
        { text: 'Priority support', included: false },
        { text: 'SSO', included: false }
      ],
      buttonText: 'Get started free',
      popular: false,
      icon: Star,
      gradient: 'from-gray-400 to-gray-600',
      onClick: () => handleGetStarted()
    },
    {
      name: 'Pro',
      price: STRIPE_PRODUCTS.PRO.price,
      description: 'Best for 5-50 users',
      features: [
        { text: 'Five workspaces', included: true },
        { text: 'Email support', included: true },
        { text: '7 day data retention', included: true },
        { text: 'Custom roles', included: true },
        { text: 'Priority support', included: false },
        { text: 'SSO', included: false }
      ],
      buttonText: '14-day free trial',
      popular: true,
      icon: Zap,
      planType: 'PRO' as PlanType,
      gradient: 'from-blue-500 to-purple-600',
      onClick: () => handleSubscribe('PRO')
    },
    {
      name: 'Enterprise',
      price: 'Contact us',
      description: 'Best for 50+ users',
      features: [
        { text: 'Unlimited workspaces', included: true },
        { text: 'Email support', included: true },
        { text: '30 day data retention', included: true },
        { text: 'Custom roles', included: true },
        { text: 'Priority support', included: true },
        { text: 'SSO', included: true }
      ],
      buttonText: 'Contact us',
      popular: false,
      icon: Crown,
      planType: 'ENTERPRISE' as PlanType,
      gradient: 'from-orange-500 to-red-600',
      onClick: () => setIsContactOpen(true)
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
    <div className="min-h-screen bg-background relative">
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border/20 border-border/60">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity duration-200" onClick={() => navigate('/')}>
              <div className="relative">
                <Globe className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500" />
                <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-500 animate-pulse" />
              </div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-400 bg-clip-text text-transparent">
                YourApp
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => scrollToSection('how-it-works')}
                className="hover:bg-yellow-500 hover:text-black transition-all duration-200"
              >
                How It Works
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => scrollToSection('demo')}
                className="hover:bg-yellow-500 hover:text-black transition-all duration-200"
              >
                Demo
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => scrollToSection('features')}
                className="hover:bg-yellow-500 hover:text-black transition-all duration-200"
              >
                Features
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => scrollToSection('pricing')}
                className="hover:bg-yellow-500 hover:text-black transition-all duration-200"
              >
                Pricing
              </Button>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <ThemeToggle />
              {isAuthenticated ? (
                <Button variant="outline" size="sm" className="sm:size-default hover:bg-yellow-500 hover:text-black transition-all duration-200">
                  <span className="hidden sm:inline">Account</span>
                  <span className="sm:hidden">Account</span>
                </Button>
              ) : (
                <>
                  <Button 
                    onClick={() => setIsSignUpOpen(true)} 
                    size="sm" 
                    className="sm:size-default bg-yellow-500 hover:bg-yellow-400 text-black transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <span className="hidden sm:inline">Get Started</span>
                    <span className="sm:hidden">Get Started</span>
                  </Button>
                  <Button variant="outline" onClick={() => setIsAuthOpen(true)} size="sm" className="sm:size-default hover:bg-yellow-500 hover:text-black transition-all duration-200">
                    Sign In
                  </Button>
                </>
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
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 animate-fade-in text-foreground">
            Transform Your Workflow
            <span className="bg-gradient-to-r from-yellow-500 to-yellow-400 bg-clip-text text-transparent"> Today</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-4 animate-fade-in">
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
              onClick={() => scrollToSection('demo')}
              className="h-12 sm:h-10 hover:bg-yellow-500 hover:text-black transition-all duration-200"
            >
              <Rocket className="mr-2 h-4 w-4" />
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* User Reviews Section */}
      <section className="container mx-auto px-4 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
          {/* User Avatars */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-300 flex items-center justify-center">
              <div className="w-6 h-6 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-300 flex items-center justify-center">
              <div className="w-6 h-6 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-300 flex items-center justify-center">
              <div className="w-6 h-6 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-300 flex items-center justify-center">
              <div className="w-6 h-6 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-300 flex items-center justify-center">
              <div className="w-6 h-6 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
            </div>
          </div>
          
          {/* Rating Display */}
          <div className="flex flex-col items-center sm:items-start gap-1">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              </div>
              <span className="text-foreground font-semibold text-lg">5.0</span>
            </div>
            <p className="text-muted-foreground text-sm">from 200+ reviews</p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="how-it-works" className="container mx-auto px-4 py-12 sm:py-20 overflow-hidden">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Create your perfect logo in just three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Step 1 */}
          <div className="text-center relative bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <PenTool className="h-10 w-10 text-black" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
                1
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">Describe your logo</h3>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Tell us about your brand and specify your design preferences all in one step.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center relative bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Sparkles className="h-10 w-10 text-black" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
                2
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">AI generates options</h3>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Our AI creates a professional logo based on your description and specifications.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center relative bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Download className="h-10 w-10 text-black" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
                3
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">Download and use</h3>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Get your logo in SVG format, ready to use on your website, social media, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="container mx-auto px-4 py-12 sm:py-20">
        <div className="text-center mb-12 sm:mb-16 bg-card/50 backdrop-blur-sm rounded-xl p-8 border border-border/50 shadow-lg">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground">
            See It In Action
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Watch how easy it is to create your perfect logo
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Simple Video Container */}
          <div className="bg-card/50 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-border/50 aspect-video relative group cursor-pointer hover:bg-card/70 transition-all duration-200">
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-yellow-500 hover:bg-yellow-400 rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-200 group-hover:scale-110">
                <Play className="h-12 w-12 text-black" />
              </div>
            </div>
            
            {/* Subtle Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-12 sm:py-20">
        <div className="text-center mb-12 sm:mb-16 bg-card/50 backdrop-blur-sm rounded-xl p-8 border border-border/50 shadow-lg">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Why Choose Our Platform?
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Built with modern technology and designed for the best user experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-card/50 backdrop-blur-sm dark:border-border/20 border-border/40"
            >
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${feature.gradient} group-hover:scale-110 transition-transform duration-200`}>
                    <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <CardTitle className="text-base sm:text-lg text-foreground">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm sm:text-base text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Pricing Section */}
      <section id="pricing" className="relative overflow-hidden bg-background text-foreground">
        <div className="relative z-10 mx-auto max-w-5xl px-4 py-20 md:px-8">
          <div className="mb-12 space-y-3 bg-card/50 backdrop-blur-sm rounded-xl p-8 border border-border/50 shadow-lg">
            <h2 className="text-center text-3xl font-semibold leading-tight sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
              Pricing
            </h2>
            <p className="text-center text-base text-muted-foreground md:text-lg">
              Use it for free for yourself, upgrade when your team needs advanced
              control.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex flex-col items-center mt-8">
              <div className="text-sm text-green-500 font-medium mb-2">
                2 months free when you pay yearly
              </div>
              <div className="flex items-center space-x-4">
                <span className={`text-sm font-medium ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
                  Monthly
                </span>
                <Switch
                  checked={isYearly}
                  onCheckedChange={setIsYearly}
                  className="data-[state=checked]:bg-yellow-500 data-[state=unchecked]:bg-gray-300"
                />
                <span className={`text-sm font-medium ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
                  Yearly
                </span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {pricingData.map((plan) => (
              <PricingCard
                key={plan.tier}
                tier={plan.tier}
                price={isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                bestFor={plan.bestFor}
                CTA={isYearly ? plan.yearlyCTA : plan.monthlyCTA}
                benefits={plan.benefits}
                onButtonClick={handlePricingButtonClick}
                isYearly={isYearly}
              />
            ))}
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="container mx-auto px-4 py-12 sm:py-20">
        <div className="bg-gradient-to-r from-yellow-500/10 via-yellow-500/5 to-yellow-500/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-center relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-transparent to-yellow-500/5 rounded-full blur-lg"></div>
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Ready to Get Started?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
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
      <footer className="border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border/20 border-border/60">
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
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <Button 
                variant="link" 
                className="p-0 h-auto font-normal hover:text-yellow-500 transition-colors duration-200 text-muted-foreground"
                onClick={() => setIsContactOpen(true)}
              >
                Contact
              </Button>
              <Button 
                variant="link" 
                className="p-0 h-auto font-normal hover:text-yellow-500 transition-colors duration-200 text-muted-foreground"
                onClick={() => setIsTermsOpen(true)}
              >
                Terms
              </Button>
              <Button 
                variant="link" 
                className="p-0 h-auto font-normal hover:text-yellow-500 transition-colors duration-200 text-muted-foreground"
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
              <span className="text-xs text-muted-foreground">
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