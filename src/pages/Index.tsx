import Header from '@/components/Header';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import WhyChoose from '@/components/WhyChoose';
import ForCustomers from '@/components/ForCustomers';
import ForMakers from '@/components/ForMakers';
import LaunchingIn from '@/components/LaunchingIn';
import Testimonials from '@/components/Testimonials';
import WaitlistForm from '@/components/WaitlistForm';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <WhyChoose />
        <ForCustomers />
        <ForMakers />
        <LaunchingIn />
        <Testimonials />
        <WaitlistForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
