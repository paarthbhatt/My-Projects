import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Pagination } from 'swiper/modules';
import { Moon, Clock, MapPin, Phone, Mail, Instagram, Facebook, Coffee, Wine, Pizza, Menu as MenuIcon, X, ChevronUp } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const slideImages = [
  {
    url: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    title: "Gothic Elegance"
  },
  {
    url: "https://images.unsplash.com/photo-1517231925375-bf2cb42917a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    title: "Midnight Brew"
  },
  {
    url: "https://images.unsplash.com/photo-1507914372368-b2b085b925a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    title: "Dark Ambiance"
  }
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-black text-gray-200 min-h-screen">
      {/* Fixed Navigation */}
      <nav className="fixed w-full z-50 bg-gradient-to-b from-black via-black/95 to-black/90 backdrop-blur-sm border-b border-vampire-red/10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-3"
            >
              <Moon className="text-vampire-red w-8 h-8" />
              <div className="flex flex-col">
                <span className="text-2xl font-serif text-vampire-red">Nocturne</span>
                <span className="text-xs text-gray-400">Est. 1888</span>
              </div>
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <motion.a 
                href="#about" 
                className="nav-link"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Our Story
              </motion.a>
              <motion.a 
                href="#menu" 
                className="nav-link"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Menu
              </motion.a>
              <motion.a 
                href="#gallery" 
                className="nav-link"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Gallery
              </motion.a>
              <motion.a 
                href="#contact" 
                className="nav-link"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Visit Us
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button 
              className="md:hidden text-gray-300 hover:text-vampire-red transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {isMenuOpen ? <X /> : <MenuIcon />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-vampire-dark/98 backdrop-blur-sm border-t border-vampire-red/10"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              <a href="#about" className="block nav-link" onClick={() => setIsMenuOpen(false)}>Our Story</a>
              <a href="#menu" className="block nav-link" onClick={() => setIsMenuOpen(false)}>Menu</a>
              <a href="#gallery" className="block nav-link" onClick={() => setIsMenuOpen(false)}>Gallery</a>
              <a href="#contact" className="block nav-link" onClick={() => setIsMenuOpen(false)}>Visit Us</a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen">
        <Swiper
          modules={[EffectFade, Autoplay, Pagination]}
          effect="fade"
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          loop={true}
          className="h-full"
        >
          {slideImages.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full">
                <div 
                  className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-700 hover:scale-105"
                  style={{
                    backgroundImage: `url("${slide.url}")`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        <motion.div 
          className="absolute inset-0 z-20 flex items-center justify-center"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center max-w-4xl mx-auto px-4">
            <motion.h1 
              className="text-7xl font-bold text-vampire-red mb-6 font-serif blood-drip"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Nocturne Coffee
            </motion.h1>
            <motion.p 
              className="text-2xl text-vampire-cream font-light mb-8 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              Where Night Owls Find Their Eternal Brew
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              <a href="#menu" className="btn-primary">
                Explore Our Menu
                <Coffee className="ml-2 w-5 h-5" />
              </a>
              <a href="#contact" className="btn-primary">
                Find Us
                <MapPin className="ml-2 w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </header>

      {/* About Section */}
      <section id="about" className="py-24 bg-gradient-to-b from-black via-vampire-dark to-black">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            Our Dark Paradise
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xl leading-relaxed text-vampire-cream/90 mb-6">
                Welcome to Nocturne Coffee, where gothic elegance meets artisanal coffee culture. Our 
                Victorian-inspired café offers a unique escape into a world where darkness and comfort 
                coexist perfectly.
              </p>
              <p className="text-xl leading-relaxed text-vampire-cream/90">
                Each cup is crafted with beans harvested under the full moon, roasted in small batches 
                to preserve their mystical essence. Open from dusk till dawn, we serve those who embrace 
                the night's eternal beauty.
              </p>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <motion.div 
                  className="text-center p-4 bg-vampire-brown/20 rounded-sm"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="text-vampire-red font-serif text-xl mb-2">Ethically Sourced</h3>
                  <p className="text-sm text-gray-400">From moonlit farms</p>
                </motion.div>
                <motion.div 
                  className="text-center p-4 bg-vampire-brown/20 rounded-sm"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="text-vampire-red font-serif text-xl mb-2">Dark Roasted</h3>
                  <p className="text-sm text-gray-400">With ancient techniques</p>
                </motion.div>
                <motion.div 
                  className="text-center p-4 bg-vampire-brown/20 rounded-sm"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="text-vampire-red font-serif text-xl mb-2">Night Brewed</h3>
                  <p className="text-sm text-gray-400">For perfect taste</p>
                </motion.div>
              </div>
            </motion.div>
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1517231925375-bf2cb42917a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1947&q=80" 
                alt="Interior of café" 
                className="rounded-sm shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/50 rounded-sm"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 bg-gradient-to-b from-black via-vampire-dark to-black">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            Nocturnal Offerings
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            <motion.div 
              className="bg-gradient-to-br from-vampire-brown/30 to-vampire-brown/20 p-8 rounded-sm backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <Coffee className="w-10 h-10 text-vampire-red mb-6" />
              <h3 className="text-3xl mb-6 font-serif text-vampire-cream">Coffee</h3>
              <ul className="space-y-4">
                <li className="menu-item">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-lg font-medium">Blood Orange Espresso</h4>
                    <span className="text-vampire-red">$5</span>
                  </div>
                  <p className="text-sm text-gray-400">A dark roast with citrus undertones</p>
                </li>
                <li className="menu-item">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-lg font-medium">Midnight Mocha</h4>
                    <span className="text-vampire-red">$6</span>
                  </div>
                  <p className="text-sm text-gray-400">Dark chocolate and espresso fusion</p>
                </li>
                <li className="menu-item">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-lg font-medium">Dark Moon Latte</h4>
                    <span className="text-vampire-red">$5.50</span>
                  </div>
                  <p className="text-sm text-gray-400">Smooth and velvety with a hint of vanilla</p>
                </li>
              </ul>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-br from-vampire-brown/30 to-vampire-brown/20 p-8 rounded-sm backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <Wine className="w-10 h-10 text-vampire-red mb-6" />
              <h3 className="text-3xl mb-6 font-serif text-vampire-cream">Elixirs</h3>
              <ul className="space-y-4">
                <li className="menu-item">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-lg font-medium">Crimson Tea</h4>
                    <span className="text-vampire-red">$4</span>
                  </div>
                  <p className="text-sm text-gray-400">Blood orange and hibiscus blend</p>
                </li>
                <li className="menu-item">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-lg font-medium">Gothic Hot Chocolate</h4>
                    <span className="text-vampire-red">$5</span>
                  </div>
                  <p className="text-sm text-gray-400">Dark chocolate with spiced cream</p>
                </li>
                <li className="menu-item">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-lg font-medium">Vampire's Kiss</h4>
                    <span className="text-vampire-red">$7</span>
                  </div>
                  <p className="text-sm text-gray-400">Berry smoothie with dark chocolate</p>
                </li>
              </ul>
            </motion.div>

            <motion.div 
              className="bg-gradient-to-br from-vampire-brown/30 to-vampire-brown/20 p-8 rounded-sm backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
            >
              <Pizza className="w-10 h-10 text-vampire-red mb-6" />
              <h3 className="text-3xl mb-6 font-serif text-vampire-cream">Sustenance</h3>
              <ul className="space-y-4">
                <li className="menu-item">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-lg font-medium">Dark Forest Cake</h4>
                    <span className="text-vampire-red">$8</span>
                  </div>
                  <p className="text-sm text-gray-400">Rich chocolate with cherry filling</p>
                </li>
                <li className="menu-item">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-lg font-medium">Blood Orange Scone</h4>
                    <span className="text-vampire-red">$4</span>
                  </div>
                  <p className="text-sm text-gray-400">Citrus-infused with dark chocolate</p>
                </li>
                <li className="menu-item">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-lg font-medium">Midnight Sandwich</h4>
                    <span className="text-vampire-red">$10</span>
                  </div>
                  <p className="text-sm text-gray-400">Black bread with premium fillings</p>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-gradient-to-b from-black via-vampire-dark to-black">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            Our Haunts
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="relative group overflow-hidden rounded-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1572116469696-31de0f17cc34?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Café interior" 
                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <p className="absolute bottom-4 left-4 text-white font-serif text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">Victorian Interior</p>
            </motion.div>
            <motion.div 
              className="relative group overflow-hidden rounded-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1517231925375-bf2cb42917a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Coffee art" 
                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <p className="absolute bottom-4 left-4 text-white font-serif text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">Artisanal Coffee</p>
            </motion.div>
            <motion.div 
              className="relative group overflow-hidden rounded-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1507914372368-b2b085b925a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Café atmosphere" 
                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <p className="absolute bottom-4 left-4 text-white font-serif text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">Mystical Ambiance</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-b from-black to-vampire-dark">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            Find Us
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <h3 className="text-2xl font-serif text-vampire-red mb-4">Contact & Location</h3>
                <div className="space-y-4">
                  <motion.div 
                    className="flex items-center space-x-4"
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <MapPin className="text-vampire-red" />
                    <p>666 Dark Avenue, Shadowville, SV 13666</p>
                  </motion.div>
                  <motion.div 
                    className="flex items-center space-x-4"
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Clock className="text-vampire-red" />
                    <p>Open: 6 PM - 6 AM</p>
                  </motion.div>
                  <motion.div 
                    className="flex items-center space-x-4"
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Phone className="text-vampire-red" />
                    <p>+1 (666) 123-4567</p>
                  </motion.div>
                  <motion.div 
                    className="flex items-center space-x-4"
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Mail className="text-vampire-red" />
                    <p>darkness@nocturne.coffee</p>
                  </motion.div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-serif text-vampire-red mb-4">Follow Our Dark Journey</h3>
                <div className="flex space-x-4">
                  <motion.a 
                    href="#" 
                    className="text-vampire-red hover:text-red-500 transition-colors"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Instagram className="w-6 h-6" />
                  </motion.a>
                  <motion.a 
                    href="#" 
                    className="text-vampire-red hover:text-red-500 transition-colors"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Facebook className="w-6 h-6" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="relative h-96"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.3519691156744847!3d48.85836507928754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis%2C%20France!5e0!3m2!1sen!2sus!4v1645004576474!5m2!1sen!2sus"
                className="absolute inset-0 w-full h-full rounded-sm"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-vampire-dark py-16 border-t border-vampire-red/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <Moon className="text-vampire-red w-8 h-8" />
                <span className="text-2xl font-serif text-vampire-red">Nocturne</span>
              </div>
              <p className="text-sm text-gray-400">Where darkness meets delight, serving the finest brews under the moonlight since 1888.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="text-vampire-red font-serif text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="footer-link">Our Story</a></li>
                <li><a href="#menu" className="footer-link">Menu</a></li>
                <li><a href="#gallery" className="footer-link">Gallery</a></li>
                <li><a href="#contact" className="footer-link">Contact</a></li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h4 className="text-vampire-red font-serif text-lg mb-4">Hours</h4>
              <ul className="space-y-2 text-sm">
                <li>Monday - Thursday: 6 PM - 4 AM</li>
                <li>Friday - Saturday: 6 PM - 6 AM</li>
                <li>Sunday: 7 PM - 3 AM</li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h4 className="text-vampire-red font-serif text-lg mb-4">Newsletter</h4>
              <p className="text-sm text-gray-400 mb-4">Subscribe to our moonlit updates</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-vampire-brown/20 text-sm px-4 py-2 rounded-l-sm focus:outline-none focus:ring-1 focus:ring-vampire-red"
                />
                <button className="bg-vampire-red px-4 py-2 rounded-r-sm hover:bg-red-800 transition-colors">
                  Join
                </button>
              </form>
            </motion.div>
          </div>
          <div className="border-t border-vampire-red/10 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 Nocturne Coffee. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-vampire-red p-2 rounded-full shadow-lg hover:bg-red-800 transition-colors z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronUp className="w-6 h-6" />
        </motion.button>
      )}
    </div>
  );
}

export default App;