import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, CheckCircle } from 'lucide-react';

interface PrivacyPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyPopup: React.FC<PrivacyPopupProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-4xl mx-auto p-0 sm:p-6">
        <DialogHeader className="px-4 pt-4 sm:px-0 sm:pt-0">
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <DialogTitle className="text-center text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Privacy
            </DialogTitle>
            <p className="text-sm text-muted-foreground mt-2">
              How we protect and handle your data
            </p>
          </div>
        </DialogHeader>
        
        <Card className="border-0 shadow-none bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border border-border/40 dark:border-border/20">
          <CardContent className="p-0">
            <ScrollArea className="h-[70vh] px-4 sm:px-6">
              <div className="space-y-8 text-sm sm:text-base py-4">
                <section className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <h3 className="font-semibold text-lg text-foreground">1. Information We Collect</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    The types of information we collect include:
                  </p>
                  <ul className="list-none space-y-2 ml-4">
                    {[
                      'Name and contact information',
                      'Payment and billing information',
                      'Account credentials',
                      'Usage data and preferences'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <h3 className="font-semibold text-lg text-foreground">2. How We Use Your Information</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    We use the information we collect to:
                  </p>
                  <ul className="list-none space-y-2 ml-4">
                    {[
                      'Provide, maintain, and improve our services',
                      'Process transactions and send related information',
                      'Send technical notices, updates, and support messages',
                      'Respond to your comments and questions',
                      'Communicate with you about products, services, and events'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <h3 className="font-semibold text-lg text-foreground">3. Information Sharing</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We may share your information with:
                  </p>
                  <ul className="list-none space-y-2 ml-4">
                    {[
                      'Service providers who assist in our operations',
                      'Payment processors for transaction processing',
                      'Legal authorities when required by law'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <h3 className="font-semibold text-lg text-foreground">4. Data Security</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                  </p>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <h3 className="font-semibold text-lg text-foreground">5. Cookies and Tracking</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie settings through your browser preferences.
                  </p>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <h3 className="font-semibold text-lg text-foreground">6. Your Rights</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    You have the right to:
                  </p>
                  <ul className="list-none space-y-2 ml-4">
                    {[
                      'Access your personal information',
                      'Correct inaccurate information',
                      'Request deletion of your information',
                      'Opt out of marketing communications',
                      'Lodge a complaint with supervisory authorities'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <h3 className="font-semibold text-lg text-foreground">7. Data Retention</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy, unless a longer retention period is required by law.
                  </p>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <h3 className="font-semibold text-lg text-foreground">8. Changes to This Policy</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.
                  </p>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <h3 className="font-semibold text-lg text-foreground">9. Contact Us</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    If you have any questions about this privacy policy, please contact us at:
                  </p>
                  <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                    <p className="text-muted-foreground">Email: privacy@yourapp.com</p>
                    <p className="text-muted-foreground">Address: 123 Main Street, City, State 12345</p>
                  </div>
                </section>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <div className="flex justify-center mt-6">
          <Button 
            onClick={onClose} 
            className="px-8 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            I Understand
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PrivacyPopup; 