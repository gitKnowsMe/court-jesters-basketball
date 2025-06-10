import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Users, Mic, Star, Megaphone, Gift, Handshake } from "lucide-react";
import { scrollToSection } from "@/lib/smoothScroll";

export default function PackagesSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('packages');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const packageItems = [
    {
      icon: Users,
      title: "6 Professional Players",
      description: "Our complete team of skilled entertainers and basketball players"
    },
    {
      icon: Mic,
      title: "Professional Announcer",
      description: "Expert MC to engage your audience and keep the energy high"
    },
    {
      icon: Star,
      title: "Halftime Show",
      description: "Special interactive segment with audience participation"
    },
    {
      icon: Megaphone,
      title: "Promotional Posters",
      description: "Custom marketing materials to promote your event"
    },
    {
      icon: Gift,
      title: "Prize Raffles",
      description: "Exciting giveaways to enhance audience engagement"
    },
    {
      icon: Handshake,
      title: "Full Setup Support",
      description: "We handle all logistics so you can focus on your guests"
    }
  ];

  return (
    <section id="packages" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 
            className="font-fredoka text-4xl md:text-5xl mb-6"
            style={{ color: 'var(--text-navy)' }}
          >
            What's Included
          </h2>
          <div 
            className="w-24 h-1 mx-auto mb-8"
            style={{ backgroundColor: 'var(--accent-yellow)' }}
          ></div>
          <p className="font-opensans text-xl text-gray-600 max-w-3xl mx-auto">
            Every Court Jesters performance is a complete entertainment package designed to create an unforgettable experience.
          </p>
        </motion.div>
        
        <motion.div
          className="bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-8 md:p-12 text-white shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-center mb-12">
            <h3 className="font-fredoka text-3xl md:text-4xl mb-4">Complete Performance Package</h3>
            <p className="font-opensans text-lg opacity-90 max-w-2xl mx-auto">
              Everything you need for a successful event, delivered by our professional entertainment team.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packageItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.title}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-4xl mb-4">
                    <IconComponent size={40} className="mx-auto" />
                  </div>
                  <h4 className="font-fredoka text-xl mb-3">{item.title}</h4>
                  <p className="font-opensans text-sm opacity-90">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
          
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <button
              onClick={() => scrollToSection('contact')}
              className="px-10 py-4 rounded-full font-nunito font-bold text-lg transition-all duration-300 btn-bounce shadow-xl hover:scale-105 inline-block"
              style={{ 
                backgroundColor: 'var(--accent-yellow)', 
                color: 'var(--text-navy)' 
              }}
            >
              Get Your Quote Today
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
