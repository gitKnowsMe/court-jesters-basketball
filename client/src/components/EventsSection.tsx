import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Heart, Mountain, Star, Building } from "lucide-react";

export default function EventsSection() {
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

    const element = document.getElementById('events');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const eventTypes = [
    {
      icon: Heart,
      title: "Fundraisers",
      description: "Help your organization raise funds while entertaining your community with our engaging comedy basketball show.",
      subtitle: "Schools • Churches • Nonprofits",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Mountain,
      title: "Summer Camps",
      description: "Bring excitement to camp with our high-energy show that gets kids laughing, cheering, and participating.",
      subtitle: "Day Camps • Sports Camps • Youth Programs",
      gradient: "from-teal-400 to-blue-500"
    },
    {
      icon: Star,
      title: "Bar/Bat Mitzvahs",
      description: "Make this special celebration unforgettable with entertainment that appeals to guests of all ages.",
      subtitle: "Celebrations • Parties • Special Events",
      gradient: "from-yellow-400 to-orange-400"
    },
    {
      icon: Building,
      title: "Corporate Events",
      description: "Team building and employee appreciation events that boost morale and create lasting memories.",
      subtitle: "Team Building • Picnics • Conferences",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section id="events" className="py-20 bg-white">
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
            Perfect for Every Event
          </h2>
          <div 
            className="w-24 h-1 mx-auto mb-8"
            style={{ backgroundColor: 'var(--secondary-teal)' }}
          ></div>
          <p className="font-opensans text-xl text-gray-600 max-w-3xl mx-auto">
            Our versatile entertainment adapts to any venue and audience, creating memorable experiences for all ages.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {eventTypes.map((event, index) => {
            const IconComponent = event.icon;
            const eventImages = [
              "/attached_assets/IMG_5629.jpg", // Fundraisers
              "/attached_assets/IMG_5626.jpg", // Summer Camps
              "/attached_assets/IMG_5674.jpg", // Bar/Bat Mitzvahs
              "/attached_assets/IMG_5715.jpg"  // Corporate Events
            ];
            
            return (
              <motion.div
                key={event.title}
                className={`card-hover relative overflow-hidden rounded-2xl shadow-xl`}
                initial={{ opacity: 0, y: 50 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${eventImages[index]})` }}
                ></div>
                <div className={`absolute inset-0 bg-gradient-to-br ${event.gradient} opacity-85`}></div>
                <div className="relative z-10 p-8 text-white text-center h-full flex flex-col justify-between">
                  <div>
                    <div className="text-5xl mb-6">
                      <IconComponent size={48} className="mx-auto drop-shadow-lg" />
                    </div>
                    <h3 className="font-fredoka text-2xl mb-4 drop-shadow-lg">{event.title}</h3>
                    <p className="font-opensans opacity-90 mb-6 drop-shadow">
                      {event.description}
                    </p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                    <span className="font-nunito font-semibold text-sm">{event.subtitle}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
