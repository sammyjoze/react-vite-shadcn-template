import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  MessageSquare, 
  Send, 
  Heart, 
  Star, 
  CheckCircle2,
  Clock,
  Users,
  Shield,
  Zap
} from 'lucide-react';

interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactPopup: React.FC<ContactPopupProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ name: '', email: '', message: '' });
      onClose();
    }, 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-lg">
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <CheckCircle2 className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Message Sent!</h3>
            <p className="text-muted-foreground mb-4">
              Thank you for reaching out. We'll get back to you within 24 hours.
            </p>
            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-center text-sm text-muted-foreground mb-2">
                <Clock className="h-4 w-4 mr-2" />
                Response time: Usually within 2-4 hours
              </div>
              <p className="text-xs text-muted-foreground/70">
                We care about every message and always respond with personalized solutions.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center pb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-400 rounded-full flex items-center justify-center shadow-lg">
              <MessageSquare className="h-8 w-8 text-black" />
            </div>
          </div>
          <DialogTitle className="text-2xl sm:text-3xl font-bold text-white text-center">
            Let's Start a Conversation
          </DialogTitle>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto text-center">
            Have a question, feedback, or just want to say hello? We'd love to hear from you!
          </p>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="space-y-6">
            <Card className="bg-card/50 border-border/40 dark:border-border/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Send className="h-5 w-5 mr-2 text-yellow-500" />
                  Send us a message
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="h-12 border-2 border-gray-600 bg-gray-800 text-white placeholder:text-gray-400 focus:border-yellow-500"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="h-12 border-2 border-gray-600 bg-gray-800 text-white placeholder:text-gray-400 focus:border-yellow-500"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us what's on your mind..."
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="min-h-[120px] border-2 border-gray-600 bg-gray-800 text-white placeholder:text-gray-400 focus:border-yellow-500 resize-none"
                      required
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Why Choose Us */}
          <div className="space-y-6">
            <Card className="bg-card/50 border-border/40 dark:border-border/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-yellow-500" />
                  Why Choose Us?
                </CardTitle>
                <CardDescription className="text-gray-300">
                  We're committed to providing exceptional service and support.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Zap className="h-4 w-4 text-yellow-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Lightning Fast Response</h4>
                    <p className="text-gray-300 text-sm">We typically respond within 2-4 hours during business hours.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="h-4 w-4 text-yellow-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Expert Team</h4>
                    <p className="text-gray-300 text-sm">Our experienced team is here to help with any questions or concerns.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Shield className="h-4 w-4 text-yellow-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Secure & Private</h4>
                    <p className="text-gray-300 text-sm">Your information is protected with enterprise-grade security.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-yellow-500/20">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-3">
                    <Star className="h-5 w-5 text-yellow-500 mr-2" />
                    <span className="text-white font-semibold">Customer Satisfaction</span>
                  </div>
                  <div className="flex items-center justify-center space-x-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm">
                    "We love hearing from our customers! Every message helps us improve and serve you better."
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactPopup; 