import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function GallerySection() {
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

    const element = document.getElementById('gallery');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const photos = [
    {
      src: "/attached_assets/IMG_4443-XL.jpg",
      alt: "Court Jesters performing basketball tricks"
    },
    {
      src: "/attached_assets/IMG_4446-XL.jpg",
      alt: "Court Jesters team in action during performance"
    },
    {
      src: "/attached_assets/IMG_4448-XL.jpg",
      alt: "Live Court Jesters basketball comedy show"
    },
    {
      src: "/attached_assets/IMG_4457-XL.jpg",
      alt: "Court Jesters entertaining the crowd"
    },
    {
      src: "/attached_assets/IMG_4562-XL.jpg",
      alt: "Court Jesters team members performing"
    },
    {
      src: "/attached_assets/IMG_4575-XL.jpg",
      alt: "Audience enjoying Court Jesters performance"
    },
    {
      src: "/attached_assets/IMG_4587-XL.jpg",
      alt: "Court Jesters basketball entertainment"
    },
    {
      src: "/attached_assets/IMG_4604-XL.jpg",
      alt: "Court Jesters comedy basketball show"
    },
    {
      src: "/attached_assets/IMG_5577.jpg",
      alt: "Court Jesters team performance"
    },
    {
      src: "/attached_assets/IMG_5587.jpg",
      alt: "Court Jesters basketball skills demonstration"
    },
    {
      src: "/attached_assets/IMG_5591.jpg",
      alt: "Court Jesters entertaining families"
    },
    {
      src: "/attached_assets/IMG_5625.jpg",
      alt: "Court Jesters halftime show entertainment"
    },
    {
      src: "/attached_assets/courtjesters15.jpg",
      alt: "Court Jesters team group photo"
    },
    {
      src: "/attached_assets/courtjesters19.jpg",
      alt: "Court Jesters performance highlights"
    },
    {
      src: "/attached_assets/courtjesters36.jpg",
      alt: "Court Jesters basketball comedy action"
    },
    {
      src: "/attached_assets/courtjesters38.jpg",
      alt: "Court Jesters audience interaction"
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-gradient-to-br from-gray-50 to-teal-50/30">
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
            See Us in Action
          </h2>
          <div 
            className="w-24 h-1 mx-auto mb-8"
            style={{ backgroundColor: 'var(--basketball-red)' }}
          ></div>
          <p className="font-opensans text-xl text-gray-600 max-w-3xl mx-auto">
            Watch highlights from our performances and see why audiences love the Court Jesters experience.
          </p>
        </motion.div>
        
        {/* Video Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 
            className="font-fredoka text-3xl text-center mb-8"
            style={{ color: 'var(--text-navy)' }}
          >
            Featured Videos
          </h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🎬</div>
                <p className="text-gray-600 font-nunito">Performance Highlights</p>
                <p className="text-sm text-gray-500 mt-2">Video would be embedded here</p>
              </div>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🎥</div>
                <p className="text-gray-600 font-nunito">Behind the Scenes</p>
                <p className="text-sm text-gray-500 mt-2">Video would be embedded here</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Photo Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 
            className="font-fredoka text-3xl text-center mb-8"
            style={{ color: 'var(--text-navy)' }}
          >
            Photo Gallery
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo, index) => (
              <motion.img
                key={index}
                src={photo.src}
                alt={photo.alt}
                className="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 aspect-square object-cover cursor-pointer card-hover"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
