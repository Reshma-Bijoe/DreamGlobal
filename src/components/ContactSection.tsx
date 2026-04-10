import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 4000); // Hide after 4 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="contact" className="section-padding bg-muted/50" ref={ref}>
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-primary tracking-[0.2em] uppercase text-sm font-medium mb-3">
            Get In Touch
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">
            Contact <span className="gold-gradient-text">Us</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-6"
          >
            {/* Email */}
            <a
              href="mailto:info@dreamglobal.com"
              className="flex items-start gap-4 p-6 rounded-lg bg-card border border-border hover:border-primary/40 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-full gold-gradient-bg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Mail size={20} className="text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-1">Email Us</h3>
                <p className="text-muted-foreground text-sm">dreamglobalin@gmail.com</p>
              </div>
            </a>

            {/* Phone */}
            <a
              href="tel:+919876543210"
              className="flex items-start gap-4 p-6 rounded-lg bg-card border border-border hover:border-primary/40 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-full gold-gradient-bg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Phone size={20} className="text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-1">Call Us</h3>
                <p className="text-muted-foreground text-sm">+91 88486 74757</p>
              </div>
            </a>

            {/* Address 
            <div className="flex items-start gap-4 p-6 rounded-lg bg-card border border-border">
              <div className="w-12 h-12 rounded-full gold-gradient-bg flex items-center justify-center flex-shrink-0">
                <MapPin size={20} className="text-primary-foreground" />
              </div>
              */}
              {/* <------lines for address starts here------->
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-1">Visit Us</h3>
                <p className="text-muted-foreground text-sm">BT ARCADE, Bus Stand, Hill Rd, near PRIVATE, PERUMPRAYIL, Periyar Nagar, Aluva, Kerala 683101</p>
              </div>
              <------lines for address ends here------->
              
            </div>
             */}
          </motion.div>

          {/* Map 
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-lg overflow-hidden border border-border h-full min-h-[320px]"
          >
            */}
            {/* <-----lines for map embed starts here----->
            <iframe
              title="DreamGlobal Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15711.560393494448!2d76.34072507140984!3d10.108081274544604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x81105dc8b24ce16d%3A0x7d87ab00dd3c6554!2sDreamGlobal!5e0!3m2!1sen!2sin!4v1775750841789!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "320px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <-----lines for map embed ends here----->
          </motion.div>
          */} 
        </div>
      </div>

      {/* WhatsApp FAB */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg shadow-lg whitespace-nowrap"
            >
              Chat with us
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
            </motion.div>
          )}
        </AnimatePresence>
        <a
          href="https://wa.me/918848674757"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center shadow-lg shadow-green-500/30 transition-all hover:scale-110"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={26} className="text-white" />
        </a>
      </div>
    </section>
  );
};

export default ContactSection;
