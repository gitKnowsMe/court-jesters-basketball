import { useState, useEffect } from "react";
import { scrollToSection } from "@/lib/smoothScroll";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Events', id: 'events' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Packages', id: 'packages' },
    { label: 'Contact', id: 'contact' }
  ];

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-white/95 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img 
              src="/attached_assets/cj_logo.png" 
              alt="Court Jesters" 
              className="w-10 h-10 rounded-full mr-3 object-cover border-2"
              style={{ borderColor: 'var(--primary-orange)' }}
            />
            <span className="font-fredoka text-xl" style={{ color: 'var(--text-navy)' }}>Court Jesters</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="font-medium transition-colors hover:text-[var(--primary-orange)]"
                style={{ color: 'var(--text-navy)' }}
              >
                {item.label}
              </button>
            ))}
          </div>
          
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ color: 'var(--text-navy)' }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-2 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="block w-full text-left px-3 py-2 rounded-md font-medium transition-colors hover:bg-gray-100 hover:text-[var(--primary-orange)]"
                style={{ color: 'var(--text-navy)' }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
