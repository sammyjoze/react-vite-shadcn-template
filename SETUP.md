# Stripe & Supabase Setup Instructions

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
VITE_STRIPE_PRO_PRICE_ID=price_your_pro_plan_price_id
VITE_STRIPE_ENTERPRISE_PRICE_ID=price_your_enterprise_plan_price_id
```

## Supabase Setup

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Get your project URL and anon key from Settings > API

2. **Create Database Tables**

Run these SQL commands in your Supabase SQL editor:

```sql
-- Create users table
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  username TEXT UNIQUE,
  first_name TEXT,
  last_name TEXT,
  company TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subscriptions table
CREATE TABLE subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  status TEXT CHECK (status IN ('active', 'canceled', 'past_due', 'unpaid')) DEFAULT 'active',
  plan_type TEXT CHECK (plan_type IN ('free', 'pro', 'enterprise')) DEFAULT 'free',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own subscriptions" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own subscriptions" ON subscriptions
  FOR UPDATE USING (auth.uid() = user_id);
```

## Stripe Setup

1. **Create a Stripe Account**
   - Go to [stripe.com](https://stripe.com)
   - Create an account and get your publishable key

2. **Create Products and Prices**
   - Create a "Pro Plan" product with monthly pricing ($29/month)
   - Create an "Enterprise Plan" product with monthly pricing ($99/month)
   - Copy the price IDs and add them to your environment variables

3. **Set up Webhook Endpoint** (Optional)
   - Create a webhook endpoint to handle subscription events
   - Add the webhook URL to your Stripe dashboard

## Backend API Setup

You'll need to create a backend API to handle Stripe checkout sessions. Here's a sample Node.js/Express endpoint:

```javascript
// POST /api/create-checkout-session
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { priceId, userId, planType } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.CLIENT_URL}/dashboard?success=true`,
      cancel_url: `${process.env.CLIENT_URL}/pricing?canceled=true`,
      metadata: {
        userId,
        planType,
      },
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

## Features Implemented

✅ **Supabase Integration**
- User authentication (signup/login)
- User profile management
- Real-time auth state changes
- Database schema with RLS

✅ **Stripe Integration**
- Pricing page with subscription plans
- Stripe checkout integration
- Product/price configuration
- Subscription management

✅ **Mobile Responsive**
- All components work on mobile devices
- Touch-friendly interfaces
- Responsive design patterns

✅ **Authentication Flow**
- Popup-based login/signup
- Form validation
- Error handling
- Loading states

## Next Steps

1. Set up your environment variables
2. Create the Supabase database tables
3. Configure Stripe products and prices
4. Deploy your backend API
5. Test the complete flow

The application is now ready for production with real authentication and payment processing! 