import { Heart, Clock, Shield, Sparkles, Users, ThumbsUp } from 'lucide-react';

const WhyChoose = () => {
  const reasons = [
    { icon: Heart, title: 'Real homemade taste', description: 'Just like food made at home' },
    { icon: Clock, title: 'On-Time Delivery', description: 'Fresh food delivered on time' },
    { icon: Shield, title: 'Verified home cooks', description: 'All makers are verified' },
    { icon: Sparkles, title: 'Hygienic cooking', description: 'Clean kitchen standards' },
    { icon: Users, title: 'Support local', description: 'Empower home cooks' },
    { icon: ThumbsUp, title: 'Trusted reviews', description: 'Genuine customer ratings' },
  ];

  return (
    <section className="py-16 lg:py-24 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-center text-foreground mb-12 lg:mb-16">
          Why people choose Homely Haath
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6 max-w-4xl mx-auto">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 lg:p-6 bg-background rounded-xl border border-border hover:border-primary/30 hover:shadow-soft transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-orange-light flex items-center justify-center flex-shrink-0">
                <reason.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm lg:text-base text-foreground mb-1">
                  {reason.title}
                </h3>
                <p className="text-xs lg:text-sm text-muted-foreground">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
