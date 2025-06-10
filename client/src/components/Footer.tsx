import { Facebook, Instagram, Youtube } from "lucide-react";
import { scrollToSection } from "@/lib/smoothScroll";

export default function Footer() {
  const quickLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About Us', id: 'about' },
    { label: 'Event Types', id: 'events' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Packages', id: 'packages' },
    { label: 'Contact', id: 'contact' }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer 
      className="text-white py-16"
      style={{ backgroundColor: 'var(--text-navy)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <div className="text-3xl mr-3" style={{ color: 'var(--primary-orange)' }}>🏀</div>
              <span className="font-fredoka text-2xl">Court Jesters</span>
            </div>
            <p className="font-opensans text-gray-300 mb-6 leading-relaxed">
              America's premier comedy basketball entertainment team, bringing 25 years of laughter, hoops, and unforgettable memories to families and communities nationwide.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="p-3 rounded-full transition-colors"
                    style={{ 
                      backgroundColor: 'var(--primary-orange)',
                      color: 'white'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--basketball-red)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--primary-orange)';
                    }}
                  >
                    <IconComponent size={20} />
                  </a>
                );
              })}
            </div>
          </div>
          
          <div>
            <h3 className="font-fredoka text-xl mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="font-opensans text-gray-300 transition-colors"
                    style={{ '--hover-color': 'var(--primary-orange)' } as any}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--primary-orange)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgb(209, 213, 219)';
                    }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-fredoka text-xl mb-6">Get In Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="mr-3" style={{ color: 'var(--primary-orange)' }}>📞</div>
                <span className="font-opensans text-gray-300">413-246-7128</span>
              </div>
              <div className="flex items-center">
                <div className="mr-3" style={{ color: 'var(--primary-orange)' }}>✉️</div>
                <span className="font-opensans text-gray-300">AndyE2@aol.com</span>
              </div>
              <div className="flex items-start">
                <div className="mr-3 mt-1" style={{ color: 'var(--primary-orange)' }}>📍</div>
                <span className="font-opensans text-gray-300">
                  Serving Events Nationwide<br />Based in the USA
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="font-opensans text-gray-400">
            © 2024 Court Jesters Comedy Basketball Team. All rights reserved. | 25 Years of Entertainment Excellence
          </p>
        </div>
      </div>
    </footer>
  );
}
