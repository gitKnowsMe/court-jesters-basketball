import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AboutSection() {
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

    const element = document.getElementById('about');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const stats = [
    { value: "25+", label: "Years Experience", color: "var(--primary-orange)" },
    { value: "1000+", label: "Shows Performed", color: "var(--secondary-teal)" },
    { value: "500K+", label: "Smiles Created", color: "var(--basketball-red)" },
    { value: "100%", label: "Family Friendly", color: "var(--accent-yellow)" },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-white">
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
            About Court Jesters
          </h2>
          <div 
            className="w-24 h-1 mx-auto mb-8"
            style={{ backgroundColor: 'var(--primary-orange)' }}
          ></div>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Professional basketball comedy team performing" 
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 
              className="font-fredoka text-3xl mb-6"
              style={{ color: 'var(--text-navy)' }}
            >
              Celebrating 25 Years of Fun & Entertainment!
            </h3>
            <p className="font-opensans text-lg text-gray-700 mb-6 leading-relaxed">
              Founded by Andrew Eckman, the Court Jesters offer a wide variety of entertainment from basketball tricks to court antics to slam-dunks and even the cha-cha slide. We have highly talented former professional and college basketball players with years of experience and great showmanship skills.
            </p>
            <p className="font-opensans text-lg text-gray-700 mb-8 leading-relaxed">
              Our purpose is to provide endless laughs, countless smiles and good cheer to the entire audience and everyone involved. Andrew's incredible management skills helped him become road manager for the sister team of the Harlem Wizards and increased the overall gross income by 150 percent.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-6 bg-white rounded-xl shadow-lg"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  <div 
                    className="text-3xl font-fredoka mb-2"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </div>
                  <div 
                    className="font-nunito font-semibold"
                    style={{ color: 'var(--text-navy)' }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
