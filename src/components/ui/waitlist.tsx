"use client";
import React, { useState } from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight } from "lucide-react";

function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail("");
    }, 3000);
  };

  return (
    <div className="h-[40rem] w-full rounded-md bg-background relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground text-center font-sans font-bold">
          Join the waitlist
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          Be the first to know when we launch new features and get exclusive early access to our platform. 
          Join thousands of users who are already waiting to transform their workflow.
        </p>
        <form onSubmit={handleSubmit} className="relative z-10">
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12"
                disabled={isSubmitting || isSubmitted}
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting || isSubmitted || !email}
              className="h-12 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? (
                "Joining..."
              ) : isSubmitted ? (
                "Joined!"
              ) : (
                <>
                  Join Waitlist
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
        {isSubmitted && (
          <p className="text-center text-sm text-green-500 mt-3 relative z-10">
            Thanks! We'll notify you when we launch.
          </p>
        )}
      </div>
      <BackgroundBeams className="opacity-20" />
    </div>
  );
}

export { WaitlistSection }; 