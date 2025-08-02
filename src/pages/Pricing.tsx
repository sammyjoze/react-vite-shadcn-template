import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Star, Zap } from 'lucide-react';
import { STRIPE_PRODUCTS, stripePromise, PlanType } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';

const Pricing: React.FC = () => {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubscribe = async (planType: PlanType) => {
    if (!isAuthenticated) {
      navigate('/');
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

  const plans = [
    {
      name: 'Free',
      price: 0,
      description: 'Perfect for getting started',
      features: [
        'Up to 3 projects',
        'Basic analytics',
        'Email support',
        '1 team member'
      ],
      buttonText: 'Get Started',
      popular: false,
      icon: Star
    },
    {
      name: 'Pro',
      price: STRIPE_PRODUCTS.PRO.price,
      description: 'For growing teams and businesses',
      features: STRIPE_PRODUCTS.PRO.features,
      buttonText: 'Subscribe to Pro',
      popular: true,
      icon: Zap,
      planType: 'PRO' as PlanType
    },
    {
      name: 'Enterprise',
      price: STRIPE_PRODUCTS.ENTERPRISE.price,
      description: 'For large organizations',
      features: STRIPE_PRODUCTS.ENTERPRISE.features,
      buttonText: 'Subscribe to Enterprise',
      popular: false,
      icon: Crown,
      planType: 'ENTERPRISE' as PlanType
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-12 sm:py-20">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that's right for you. All plans include a 14-day free trial.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <plan.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl sm:text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  <span className="text-3xl sm:text-4xl font-bold">
                    ${plan.price}
                  </span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm sm:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full h-11 sm:h-10"
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={() => {
                    if (plan.planType) {
                      handleSubscribe(plan.planType);
                    } else {
                      // Free plan - redirect to signup
                      navigate('/');
                    }
                  }}
                  disabled={isLoading === plan.planType}
                >
                  {isLoading === plan.planType ? (
                    'Processing...'
                  ) : (
                    plan.buttonText
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-16 sm:mt-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-left">
              <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
              <p className="text-muted-foreground">
                Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
              </p>
            </div>
            <div className="text-left">
              <h3 className="font-semibold mb-2">Is there a free trial?</h3>
              <p className="text-muted-foreground">
                Yes, all paid plans include a 14-day free trial. No credit card required to start.
              </p>
            </div>
            <div className="text-left">
              <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-muted-foreground">
                We accept all major credit cards, debit cards, and digital wallets through Stripe.
              </p>
            </div>
            <div className="text-left">
              <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
              <p className="text-muted-foreground">
                We offer a 30-day money-back guarantee. If you're not satisfied, we'll refund your payment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing; 