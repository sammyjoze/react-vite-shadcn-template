import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Zap, ChevronRight, ChevronLeft } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  title: string;
  rating: number;
  quote: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Mark Thompson",
    title: "Marketing Consultant",
    rating: 5,
    quote: "I've recommended DeepLogo to all my clients. The speed and quality are unmatched, and the ability to create multiple variations has been invaluable.",
    avatar: "MT"
  },
  {
    id: 2,
    name: "Emily Carter",
    title: "Freelance Designer",
    rating: 5,
    quote: "Even as a professional designer, I use DeepLogo for initial concepts. It speeds up my workflow and gives me fresh ideas I might not have considered.",
    avatar: "EC"
  },
  {
    id: 3,
    name: "Sophia Turner",
    title: "eCommerce Entrepreneur",
    rating: 5,
    quote: "After trying several AI tools, DeepLogo stands out. The SVG format means it looks perfect on any size, from business cards to billboards.",
    avatar: "ST"
  },
  {
    id: 4,
    name: "David Chen",
    title: "Startup Founder",
    rating: 5,
    quote: "The AI-generated logos are incredibly professional. We got our brand identity in minutes instead of weeks.",
    avatar: "DC"
  },
  {
    id: 5,
    name: "Sarah Johnson",
    title: "Creative Director",
    rating: 5,
    quote: "DeepLogo has revolutionized how we approach branding. The quality and speed are game-changing for our agency.",
    avatar: "SJ"
  },
  {
    id: 6,
    name: "Alex Rodriguez",
    title: "Brand Manager",
    rating: 5,
    quote: "The customization options are incredible. We can tweak colors, fonts, and styles to match our brand perfectly.",
    avatar: "AR"
  },
  {
    id: 7,
    name: "Lisa Wang",
    title: "Small Business Owner",
    rating: 5,
    quote: "As a small business, I couldn't afford expensive design services. DeepLogo gave me a professional logo for a fraction of the cost.",
    avatar: "LW"
  },
  {
    id: 8,
    name: "Michael Brown",
    title: "Digital Marketing Specialist",
    rating: 5,
    quote: "The vector format is perfect for all our marketing materials. Scalable and crisp at any size.",
    avatar: "MB"
  },
  {
    id: 9,
    name: "Jennifer Davis",
    title: "Product Manager",
    rating: 5,
    quote: "We needed a logo fast for our product launch. DeepLogo delivered in minutes with multiple options to choose from.",
    avatar: "JD"
  },
  {
    id: 10,
    name: "Robert Wilson",
    title: "Agency Owner",
    rating: 5,
    quote: "This tool has become essential for our client projects. We can quickly generate concepts and iterate on them.",
    avatar: "RW"
  }
];

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const maxIndex = testimonials.length - 4; // Show 4 testimonials at a time

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  // Touch/swipe handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        if (prev >= maxIndex) {
          return 0;
        }
        return prev + 1;
      });
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [maxIndex]);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          {/* Rating */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-yellow-500" />
            <span className="text-white text-sm font-medium">
              Rated 5 stars by hundreds of users
            </span>
          </div>
          
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What our users are saying
          </h2>
          
          {/* Subtitle */}
          <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied customers who've transformed their brand identity
          </p>
          
          {/* CTA */}
          <Button 
            variant="link" 
            className="text-white hover:text-yellow-500 transition-colors duration-200 p-0 h-auto font-normal"
          >
            View all testimonials <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Left Fade */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
          
          {/* Right Fade */}
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>
          
          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-background/80 hover:bg-background/90 rounded-full w-10 h-10"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-background/80 hover:bg-background/90 rounded-full w-10 h-10"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
          
          <div 
            ref={containerRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide px-4 justify-center transition-transform duration-300 ease-in-out"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitScrollbar: { display: 'none' }
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {testimonials.slice(currentIndex, currentIndex + 4).map((testimonial) => (
              <Card 
                key={testimonial.id} 
                className="min-w-[320px] max-w-[320px] bg-gray-900/50 border border-gray-700/50 backdrop-blur-sm flex-shrink-0 cursor-grab active:cursor-grabbing"
              >
                <CardContent className="p-6">
                  {/* Avatar and Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {testimonial.avatar}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{testimonial.name}</h4>
                      <p className="text-gray-400 text-sm">{testimonial.title}</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating 
                            ? 'text-yellow-500 fill-current' 
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-gray-300 text-sm leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: maxIndex + 1 }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  i === currentIndex 
                    ? 'bg-yellow-500 w-6' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 