import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { z } from 'zod';
import customerIcon from '@/assets/customer-icon.png';
import makerIcon from '@/assets/maker-icon.png';

const formSchema = z.object({
  fullName: z.string().trim().min(1, 'Full name is required').max(100, 'Name must be less than 100 characters'),
  emailAddress: z.string().trim().email('Please enter a valid email').max(255, 'Email must be less than 255 characters'),
  phoneNumber: z.string().trim().min(10, 'Please enter a valid phone number').max(15, 'Phone number must be less than 15 characters'),
  city: z.string().min(1, 'Please select a city'),
  userType: z.string().min(1, 'Please select your role'),
});

type FormData = z.infer<typeof formSchema>;

const WaitlistForm = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    emailAddress: '',
    phoneNumber: '',
    city: '',
    userType: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isLoading, setIsLoading] = useState(false);

  const cities = ['Hyderabad', 'Bangalore', 'Mumbai', 'Delhi', 'Chennai'];
  const userTypes = [
    { value: 'customer', label: 'Customer', description: 'Support local talent and enjoy homemade goodness', icon: customerIcon },
    { value: 'maker', label: 'Maker', description: 'Share your culinary talent and sell homemade food', icon: makerIcon },
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form
    const result = formSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      result.error.errors.forEach((error) => {
        const field = error.path[0] as keyof FormData;
        fieldErrors[field] = error.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/waitlist-submit`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            fullName: result.data.fullName,
            emailAddress: result.data.emailAddress,
            phoneNumber: result.data.phoneNumber,
            city: result.data.city,
            userType: result.data.userType,
          }),
        }
      );

      const data = await response.json();

      if (data.success === true) {
        setFormData({
          fullName: '',
          emailAddress: '',
          phoneNumber: '',
          city: '',
          userType: '',
        });
        
        toast({
          title: 'Success!',
          description: "You've been added to the waitlist. We'll notify you when we launch!",
        });
      } else {
        toast({
          title: 'Submission Failed',
          description: data.message || 'An error occurred while submitting the form.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: 'Something went wrong',
        description: 'Form submission failed. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="waitlist" className="py-16 lg:py-24 bg-cream">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Join the Homely Haath Waitlist
            </h2>
            <p className="text-muted-foreground">
              Limited slots are open. Join now and be the first to know.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-background rounded-3xl p-6 lg:p-8 shadow-card border border-border">
            {/* Full Name */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-foreground mb-2">
                Full Name <span className="text-destructive">*</span>
              </label>
              <Input
                type="text"
                placeholder="Enter your name"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className={errors.fullName ? 'border-destructive' : ''}
              />
              {errors.fullName && (
                <p className="text-sm text-destructive mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address <span className="text-destructive">*</span>
              </label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={formData.emailAddress}
                onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                className={errors.emailAddress ? 'border-destructive' : ''}
              />
              {errors.emailAddress && (
                <p className="text-sm text-destructive mt-1">{errors.emailAddress}</p>
              )}
            </div>

            {/* Phone */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-foreground mb-2">
                Phone Number <span className="text-destructive">*</span>
              </label>
              <Input
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                className={errors.phoneNumber ? 'border-destructive' : ''}
              />
              {errors.phoneNumber && (
                <p className="text-sm text-destructive mt-1">{errors.phoneNumber}</p>
              )}
            </div>

            {/* City */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-foreground mb-2">
                City <span className="text-destructive">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {cities.map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => handleInputChange('city', city)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                      formData.city === city
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
              {errors.city && (
                <p className="text-sm text-destructive mt-1">{errors.city}</p>
              )}
            </div>

            {/* User Type */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-foreground mb-2">
                I want to join as <span className="text-destructive">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                {userTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => handleInputChange('userType', type.value)}
                    className={`p-4 rounded-xl text-center transition-all duration-300 hover:scale-105 border ${
                      formData.userType === type.value
                        ? 'border-primary bg-orange-light'
                        : 'border-border bg-muted hover:border-primary/30'
                    }`}
                  >
                    <img src={type.icon} alt={type.label} className="w-16 h-16 mx-auto mb-2 object-contain" />
                    <p className="font-semibold text-foreground">{type.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{type.description}</p>
                  </button>
                ))}
              </div>
              {errors.userType && (
                <p className="text-sm text-destructive mt-1">{errors.userType}</p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              variant="waitlist"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Joining...
                </>
              ) : (
                'Join the Waitlist'
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default WaitlistForm;
