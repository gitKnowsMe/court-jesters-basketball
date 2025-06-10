import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertContactSubmissionSchema, type InsertContactSubmission } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, Clock, CheckCircle, Send } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('contact');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const form = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      eventType: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactSubmission) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "We'll respond to your inquiry within 24 hours.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactSubmission) => {
    contactMutation.mutate(data);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      value: "413-246-7128",
      color: "var(--primary-orange)"
    },
    {
      icon: Mail,
      title: "Email",
      value: "AndyE2@aol.com",
      color: "var(--secondary-teal)"
    },
    {
      icon: Clock,
      title: "Response Time",
      value: "Within 24 hours",
      color: "var(--basketball-red)"
    }
  ];

  const benefits = [
    "25+ years of proven entertainment experience",
    "100% family-friendly performances",
    "Professional, reliable team",
    "Complete event support included"
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-teal-50/30">
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
            Book Your Show
          </h2>
          <div 
            className="w-24 h-1 mx-auto mb-8"
            style={{ backgroundColor: 'var(--primary-orange)' }}
          ></div>
          <p className="font-opensans text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to bring laughter and excitement to your event? Contact us today for availability and pricing.
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <h3 
                className="font-fredoka text-2xl mb-6"
                style={{ color: 'var(--text-navy)' }}
              >
                Get In Touch
              </h3>
              
              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div key={info.title} className="flex items-center">
                      <div 
                        className="text-white p-3 rounded-full mr-4"
                        style={{ backgroundColor: info.color }}
                      >
                        <IconComponent size={20} />
                      </div>
                      <div>
                        <div 
                          className="font-nunito font-semibold"
                          style={{ color: 'var(--text-navy)' }}
                        >
                          {info.title}
                        </div>
                        <div className="font-opensans text-gray-600">{info.value}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-6">
                <h4 
                  className="font-fredoka text-lg mb-3"
                  style={{ color: 'var(--text-navy)' }}
                >
                  Why Choose Court Jesters?
                </h4>
                <ul className="font-opensans text-gray-700 space-y-2">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle 
                        size={16} 
                        className="mr-2"
                        style={{ color: 'var(--primary-orange)' }}
                      />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <h3 
                className="font-fredoka text-2xl mb-6"
                style={{ color: 'var(--text-navy)' }}
              >
                Request Information
              </h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-nunito font-semibold" style={{ color: 'var(--text-navy)' }}>
                            Full Name *
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-nunito font-semibold" style={{ color: 'var(--text-navy)' }}>
                            Email Address *
                          </FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-nunito font-semibold" style={{ color: 'var(--text-navy)' }}>
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="(555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="eventType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-nunito font-semibold" style={{ color: 'var(--text-navy)' }}>
                            Event Type *
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select event type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="fundraiser">Fundraiser</SelectItem>
                              <SelectItem value="summer-camp">Summer Camp</SelectItem>
                              <SelectItem value="bar-bat-mitzvah">Bar/Bat Mitzvah</SelectItem>
                              <SelectItem value="corporate">Corporate Event</SelectItem>
                              <SelectItem value="school">School Event</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-nunito font-semibold" style={{ color: 'var(--text-navy)' }}>
                          Message *
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your event, including date, location, expected audience size, and any special requirements..."
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-lg font-nunito font-bold text-lg hover:shadow-xl transition-all duration-300 btn-bounce"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="mr-2" size={18} />
                        Send Request
                      </>
                    )}
                  </Button>
                  
                  <p className="text-sm text-gray-500 text-center font-opensans">
                    We'll respond to your inquiry within 24 hours with availability and pricing information.
                  </p>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
