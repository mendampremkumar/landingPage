import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Globe } from 'lucide-react';
import logoFooter from '@/assets/logo-footer.png';

const Footer = () => {
  const policyLinks = [
    { label: 'Terms and Conditions', file: '/documents/terms-and-conditions.pdf' },
    { label: 'Privacy Policy', file: '/documents/privacy-policy.pdf' },
    { label: 'Shipping Policy', file: '/documents/shipping-policy.pdf' },
    { label: 'Cancellation and Refunds', file: '/documents/cancellation-refund-policy.pdf' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  const contactInfo = [
    { icon: Mail, label: 'support@homelyhaath.com', href: 'mailto:support@homelyhaath.com' },
    { icon: Phone, label: '+91 9799 599 799', href: 'tel:+919799599799' },
    { icon: MapPin, label: 'Hyderabad, Telangana, India', href: '#' },
    { icon: Globe, label: 'homelyhaath.com', href: 'https://homelyhaath.com', external: true },
  ];

  return (
    <footer className="bg-foreground text-background py-12 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-12">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logoFooter} alt="HomelyHaath" className="h-10 w-auto" />
            </div>
            <p className="text-sm text-background/70 mb-4">
              Connecting homemade food lovers with talented local cooks.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-display font-semibold text-sm mb-4">Policies</h4>
            <ul className="space-y-2">
              {policyLinks.map((policy, index) => (
                <li key={index}>
                  <a
                    href={policy.file}
                    download
                    className="text-sm text-background/70 hover:text-primary transition-colors"
                  >
                    {policy.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="font-display font-semibold text-sm mb-4">Contact Us</h4>
            <ul className="space-y-3">
              {contactInfo.map((contact, index) => (
                <li key={index}>
                  <a
                    href={contact.href}
                    target={contact.external ? '_blank' : undefined}
                    rel={contact.external ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-2 text-sm text-background/70 hover:text-primary transition-colors"
                  >
                    <contact.icon className="w-4 h-4 flex-shrink-0" />
                    <span>{contact.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-background/10">
          <p className="text-sm text-background/50 text-center">
            © {new Date().getFullYear()} HomelyHaath. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
