import { loadStripe } from '@stripe/stripe-js';

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_mock_key';

// Create a mock Stripe promise if environment variables are not set
const createMockStripePromise = () => {
  return Promise.resolve({
    redirectToCheckout: async () => ({ error: { message: 'Stripe not configured' } }),
  });
};

export const stripePromise = stripePublishableKey === 'pk_test_mock_key'
  ? createMockStripePromise()
  : loadStripe(stripePublishableKey);

// Stripe product/price IDs
export const STRIPE_PRODUCTS = {
  PRO: {
    priceId: import.meta.env.VITE_STRIPE_PRO_PRICE_ID || 'price_mock_pro',
    name: 'Pro Plan',
    price: 29,
    features: [
      'Unlimited projects',
      'Advanced analytics',
      'Priority support',
      'Team collaboration',
      'API access'
    ]
  },
  ENTERPRISE: {
    priceId: import.meta.env.VITE_STRIPE_ENTERPRISE_PRICE_ID || 'price_mock_enterprise',
    name: 'Enterprise Plan',
    price: 99,
    features: [
      'Everything in Pro',
      'Custom integrations',
      'Dedicated support',
      'Advanced security',
      'Custom branding'
    ]
  }
} as const;

export type PlanType = keyof typeof STRIPE_PRODUCTS; 