import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, CheckCircle } from 'lucide-react';

interface TermsPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsPopup: React.FC<TermsPopupProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-4xl mx-auto p-0 sm:p-6">
        <DialogHeader className="px-4 pt-4 sm:px-0 sm:pt-0">
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <DialogTitle className="text-center text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Terms
            </DialogTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Our terms of service and usage guidelines
            </p>
          </div>
        </DialogHeader>
        
        <Card className="border-0 shadow-none bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
          <CardContent className="p-0">
            <ScrollArea className="h-[70vh] px-4 sm:px-6">
              <div className="space-y-8 text-sm sm:text-base py-4">
                <section className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                    <h3 className="font-semibold text-lg">1. Acceptance of Terms</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
                  </p>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                    <h3 className="font-semibold text-lg">2. Use License</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Permission is granted to temporarily download one copy of the materials (information or software) on YourApp's website for personal, non-commercial transitory viewing only.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    This is the grant of a license, not a transfer of title, and under this license you may not:
                  </p>
                  <ul className="list-none space-y-2 ml-4">
                    {[
                      'modify or copy the materials',
                      'use the materials for any commercial purpose or for any public display',
                      'attempt to reverse engineer any software contained on the website',
                      'remove any copyright or other proprietary notations from the materials'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                    <h3 className="font-semibold text-lg">3. Disclaimer</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    The materials on YourApp's website are provided on an 'as is' basis. YourApp makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                  </p>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                    <h3 className="font-semibold text-lg">4. Limitations</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    In no event shall YourApp or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on YourApp's website, even if YourApp or a YourApp authorized representative has been notified orally or in writing of the possibility of such damage.
                  </p>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"></div>
                    <h3 className="font-semibold text-lg">5. Revisions and Errata</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    The materials appearing on YourApp's website could include technical, typographical, or photographic errors. YourApp does not warrant that any of the materials on its website are accurate, complete or current. YourApp may make changes to the materials contained on its website at any time without notice.
                  </p>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"></div>
                    <h3 className="font-semibold text-lg">6. Links</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    YourApp has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by YourApp of the site. Use of any such linked website is at the user's own risk.
                  </p>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"></div>
                    <h3 className="font-semibold text-lg">7. Modifications</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    YourApp may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms of Service.
                  </p>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full"></div>
                    <h3 className="font-semibold text-lg">8. Governing Law</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                  </p>
                </section>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <div className="flex justify-center mt-6">
          <Button 
            onClick={onClose} 
            className="px-8 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            I Understand
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TermsPopup; 