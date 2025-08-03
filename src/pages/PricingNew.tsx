import React, { useState } from 'react';
import { PricingCard } from '@/components/ui/dark-gradient-pricing';
import SignUpPopup from '@/components/SignUpPopup';
import ContactPopup from '@/components/ContactPopup';

const PricingNew: React.FC = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleButtonClick = (tier: string) => {
    console.log('Button clicked for tier:', tier);
    if (tier === "Enterprise") {
      console.log('Setting contact open to true');
      setIsContactOpen(true);
    } else {
      console.log('Setting signup open to true');
      setIsSignUpOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <section className="relative overflow-hidden bg-background text-foreground">
        <div className="relative z-10 mx-auto max-w-5xl px-4 py-20 md:px-8">
          <div className="mb-12 space-y-3">
            <h2 className="text-center text-3xl font-semibold leading-tight sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
              Pricing
            </h2>
            <p className="text-center text-base text-muted-foreground md:text-lg">
              Use it for free for yourself, upgrade when your team needs advanced
              control.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <PricingCard
              tier="Free"
              price="$0/mo"
              bestFor="Best for 1-5 users"
              CTA="Get started free"
              benefits={[
                { text: "One workspace", checked: true },
                { text: "Email support", checked: true },
                { text: "1 day data retention", checked: false },
                { text: "Custom roles", checked: false },
                { text: "Priority support", checked: false },
                { text: "SSO", checked: false },
              ]}
              onButtonClick={handleButtonClick}
            />
            <PricingCard
              tier="Pro"
              price="$79/mo"
              bestFor="Best for 5-50 users"
              CTA="14-day free trial"
              benefits={[
                { text: "Five workspaces", checked: true },
                { text: "Email support", checked: true },
                { text: "7 day data retention", checked: true },
                { text: "Custom roles", checked: true },
                { text: "Priority support", checked: false },
                { text: "SSO", checked: false },
              ]}
              onButtonClick={handleButtonClick}
            />
            <PricingCard
              tier="Enterprise"
              price="Contact us"
              bestFor="Best for 50+ users"
              CTA="Contact us"
              benefits={[
                { text: "Unlimited workspaces", checked: true },
                { text: "Email support", checked: true },
                { text: "30 day data retention", checked: true },
                { text: "Custom roles", checked: true },
                { text: "Priority support", checked: true },
                { text: "SSO", checked: true },
              ]}
              onButtonClick={handleButtonClick}
            />
          </div>
        </div>
      </section>

      {/* Debug info */}
      <div className="fixed top-4 right-4 bg-black text-white p-2 rounded text-xs z-50">
        SignUp: {isSignUpOpen ? 'true' : 'false'} | Contact: {isContactOpen ? 'true' : 'false'}
      </div>

      {/* Popups */}
      <SignUpPopup 
        isOpen={isSignUpOpen} 
        onClose={() => setIsSignUpOpen(false)}
        onSwitchToLogin={() => setIsSignUpOpen(false)}
        onOpenTerms={() => {}}
        onOpenPrivacy={() => {}}
      />
      <ContactPopup 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
};

export default PricingNew; 