import { motion } from "framer-motion";
import { scrollToSection } from "@/lib/smoothScroll";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const floatingBalls = [
    { delay: 0, top: "20%", left: "10%", size: "4xl", opacity: "opacity-30" },
    { delay: -1, top: "40%", right: "20%", size: "3xl", opacity: "opacity-20" },
    { delay: -2, bottom: "40%", left: "20%", size: "2xl", opacity: "opacity-25" },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/attached_assets/DSC_0789-XL.jpg)' }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/80 via-red-500/70 to-teal-500/60"></div>
      
      {/* Floating basketball icons */}
      {floatingBalls.map((ball, index) => (
        <motion.div
          key={index}
          className={`absolute floating ${ball.opacity}`}
          style={{
            top: ball.top,
            left: ball.left,
            right: ball.right,
            bottom: ball.bottom,
          }}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: ball.delay,
          }}
        >
          <div className={`text-${ball.size} text-yellow-300`}>🏀</div>
        </motion.div>
      ))}
      
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <motion.h1
          className="font-fredoka text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Court Jesters
        </motion.h1>
        
        <motion.p
          className="font-nunito text-2xl md:text-3xl lg:text-4xl font-light mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Your Smile Is Our Victory!
        </motion.p>
        
        <motion.p
          className="font-opensans text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed opacity-90"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          SLAM DUNK Entertainment for the Whole Family! Professional comedy basketball with highly talented former professional and college players bringing endless laughs and countless smiles.
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button
            onClick={() => scrollToSection('contact')}
            className="px-10 py-4 rounded-full font-nunito font-bold text-lg transition-all duration-300 btn-bounce shadow-xl hover:scale-105"
            style={{ 
              backgroundColor: 'var(--accent-yellow)', 
              color: 'var(--text-navy)' 
            }}
          >
            Book Your Show
          </button>
          
          <button
            onClick={() => scrollToSection('about')}
            className="border-2 border-white text-white px-10 py-4 rounded-full font-nunito font-bold text-lg hover:bg-white transition-all duration-300 shadow-xl hover:scale-105"
            style={{ '--hover-text-color': 'var(--text-navy)' } as any}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--text-navy)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'white';
            }}
          >
            Learn More
          </button>
        </motion.div>
      </div>
      
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white text-2xl cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={() => scrollToSection('about')}
      >
        <ChevronDown />
      </motion.div>
    </section>
  );
}
