import Link from "next/link";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  MapPin, 
  Phone, 
  Mail, 
  Clock 
} from "lucide-react";
import { Button, Input } from "@radiance/ui";

const footerLinks = {
  services: [
    { label: "Thermal & Bathing", href: "/services/thermal-bathing" },
    { label: "Massage & Therapy", href: "/services/massage-therapy" },
    { label: "Beauty & Grooming", href: "/services/beauty-grooming" },
    { label: "Fitness", href: "/services/fitness" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/about#team" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  support: [
    { label: "FAQ", href: "/faq" },
    { label: "Booking Policy", href: "/policies/booking" },
    { label: "Privacy Policy", href: "/policies/privacy" },
    { label: "Terms of Service", href: "/policies/terms" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
];

export function Footer() {
  return (
    <footer className="bg-primary-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <span className="text-primary-600 font-display text-xl font-bold">R</span>
              </div>
              <span className="font-display text-xl font-semibold text-white">
                Radiance
              </span>
            </Link>
            <p className="text-primary-200 text-sm leading-relaxed mb-6 max-w-md">
              Your sanctuary of wellness and relaxation. Experience premium spa, 
              fitness, and accommodation services designed to rejuvenate your 
              mind, body, and soul.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start text-sm text-primary-200 hover:text-white transition-colors"
              >
                <MapPin className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                <span>1 Setif Close, Adzope Crescent, Off Kumasi Crescent, Wuse 2, Abuja</span>
              </a>
              <a 
                href="tel:+2348001234567"
                className="flex items-center text-sm text-primary-200 hover:text-white transition-colors"
              >
                <Phone className="h-5 w-5 mr-3 flex-shrink-0" />
                <span>+234 800 123 4567</span>
              </a>
              <a 
                href="mailto:hello@radiancewellness.com"
                className="flex items-center text-sm text-primary-200 hover:text-white transition-colors"
              >
                <Mail className="h-5 w-5 mr-3 flex-shrink-0" />
                <span>hello@radiancewellness.com</span>
              </a>
              <div className="flex items-start text-sm text-primary-200">
                <Clock className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p>Mon - Fri: 8:00 AM - 9:00 PM</p>
                  <p>Sat - Sun: 9:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-sm text-primary-200 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-sm text-primary-200 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm text-primary-200 mb-4">
              Subscribe for exclusive offers and wellness tips.
            </p>
            <form className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-primary-800 border-primary-700 text-white placeholder:text-primary-400 focus-visible:ring-accent-400"
              />
              <Button className="w-full bg-accent-400 hover:bg-accent-500 text-accent-950">
                Subscribe
              </Button>
            </form>
            
            {/* Social Links */}
            <div className="flex space-x-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary-800 flex items-center justify-center text-primary-200 hover:bg-primary-700 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-primary-300">
              © {new Date().getFullYear()} Radiance Wellness Center. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {footerLinks.support.slice(1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-primary-300 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
