import { Button } from '@/components/ui/button';
import { ChefHat, Heart, Leaf } from 'lucide-react';
import heroCooking from '@/assets/hero-cooking.jpg';
import appMockup from '@/assets/app-mockup.png';

const Hero = () => {
  const features = [
    { icon: ChefHat, label: 'Authentic taste', sublabel: 'Traditional recipes' },
    { icon: Heart, label: 'Fresh ingredients', sublabel: 'Locally sourced' },
    { icon: Leaf, label: 'Healthy', sublabel: 'No preservatives' },
  ];

  return (
    <section className="pt-24 lg:pt-32 pb-16 bg-gradient-to-b from-orange-light to-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
            Authentic homemade food connecting<br />
            <span className="text-primary">local makers and customers</span>
          </h1>
          <p className="text-muted-foreground text-base lg:text-lg mb-8 max-w-2xl mx-auto">
            Fresh meals prepared by home-makers in your city. A simple and trusted way to enjoy real homemade food.
          </p>
          <Button variant="hero" size="xl" asChild>
            <a href="#waitlist">Join the Waitlist</a>
          </Button>
          <p className="text-sm text-muted-foreground mt-3">
            Be the first to know when we launch in your city
          </p>
        </div>

        {/* Hero Images */}
        <div className="flex justify-center items-end gap-4 lg:gap-8 mb-16">
          <div className="w-48 md:w-64 lg:w-80 rounded-2xl overflow-hidden shadow-elevated transform hover:scale-105 transition-transform duration-300">
            <img
              src={heroCooking}
              alt="Women cooking traditional homemade food"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-32 md:w-44 lg:w-56 animate-float">
            <img
              src={appMockup}
              alt="HomelyHaath mobile app"
              className="w-full h-auto drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap justify-center gap-4 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-card rounded-2xl px-6 py-4 shadow-soft hover:shadow-card transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-light flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{feature.label}</p>
                <p className="text-sm text-muted-foreground">{feature.sublabel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
