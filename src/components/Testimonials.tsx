import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Gayatri Kumari',
      location: 'Hyderabad',
      rating: 5,
      text: 'Got authentic Hyderabadi home-cooked biryani that reminded me of my grandmother\'s cooking. Amazing taste!',
      avatar: 'G',
    },
    {
      name: 'Lakshmi Devi',
      location: 'Bangalore',
      rating: 5,
      text: 'Finally found a way to eat healthy home food while staying far from family. The makers here cook with love.',
      avatar: 'L',
    },
    {
      name: 'Anjali Reddy',
      location: 'Mumbai',
      rating: 5,
      text: 'The platform has connected me with amazing home cooks. It\'s like having a second kitchen in the neighborhood!',
      avatar: 'A',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-center text-foreground mb-12 lg:mb-16">
          What people are saying
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-background rounded-2xl p-6 shadow-soft border border-border hover:shadow-card transition-shadow"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-3">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
