import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import makerCooking from '@/assets/maker-cooking.jpg';

const ForMakers = () => {
  const benefits = [
    'Set your own menu and prices',
    'Flexible working hours and schedule',
    'No investment needed to start',
    'Reach customers in your locality',
    'Weekly payments directly to your account',
    'Marketing and visibility handled by us',
    'Grow your home-cooking business',
  ];

  return (
    <section id="makers" className="py-16 lg:py-24 bg-cream">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="rounded-3xl overflow-hidden shadow-elevated">
              <img
                src={makerCooking}
                alt="Home cook preparing food"
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Earning Badge */}
            <div className="absolute -bottom-6 left-4 lg:left-8 bg-card rounded-xl px-6 py-4 shadow-card border border-border">
              <p className="text-xs text-muted-foreground mb-1">Monthly Earnings</p>
              <p className="font-display font-bold text-lg lg:text-xl text-primary">₹15,000 - ₹60,000</p>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <span className="inline-block text-sm font-medium text-primary mb-3 uppercase tracking-wide">
              For Makers
            </span>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Earn from your cooking talent
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              If you love cooking and want to share your culinary skills, HomelyHaath 
              is the perfect platform for you. Turn your passion into a thriving home business 
              and earn while doing what you love most.
            </p>

            <ul className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>

            <Button variant="hero" size="lg" asChild>
              <a href="#waitlist">Join as Maker</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForMakers;
