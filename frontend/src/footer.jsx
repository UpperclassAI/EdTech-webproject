import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useTheme } from "./context/ThemeContext";
import { Twitter, Facebook, Instagram, Linkedin } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Footer() {
  const { theme } = useTheme();
  const darkMode = theme === "dark";
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const footerRef = useRef(null);

  // Smooth mouse follow for gooey effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 100 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Liquid wave animation
  const waveVariants = {
    animate: {
      d: [
        "M0,192L48,197.3C96,203,192,213,288,202.7C384,192,480,160,576,160C672,160,768,192,864,208C960,224,1056,224,1152,208C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
        "M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,208C672,213,768,203,864,186.7C960,171,1056,149,1152,149.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
        "M0,160L48,154.7C96,149,192,139,288,149.3C384,160,480,192,576,186.7C672,181,768,139,864,128C960,117,1056,139,1152,154.7C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
      ],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <footer
      ref={footerRef}
      className={`relative mt-20 overflow-hidden transition-all duration-700 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-blue-950 to-blue-950 text-gray-200"
          : "bg-gradient-to-br from-blue-600 via-blue-500 to-blue-600 text-white"
      }`}
    >
      {/* Liquid Wave Background - Bottom */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <svg
          className="absolute bottom-0 left-0 w-full h-48"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <motion.path
            variants={waveVariants}
            animate="animate"
            fill={darkMode ? '#3b82f6' : '#ffffff'}
            fillOpacity="0.97"
          />
        </svg>
        <svg
          className="absolute bottom-0 left-0 w-full h-56 transform scale-105"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ bottom: '-10px' }}
        >
          <motion.path
            variants={waveVariants}
            animate="animate"
            fill={darkMode ? '#8b5cf6' : '#ffffff'}
            fillOpacity="0.2"
            transition={{ delay: 0.5 }}
          />
        </svg> 
      </div>

      {/* Liquid Wave Background - Middle Line */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {/* <svg
          className="absolute top-1/2 left-0 w-full h-32 transform -translate-y-1/2"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <motion.path
            variants={waveVariants}
            animate="animate"
            fill={darkMode ? '#60a5fa' : '#ffffff'}
            fillOpacity="0.9"
          />
        </svg> */}
        <svg
          className="absolute bottom-0 left-0 w-full h-40 transform -translate-y-1/2 scale-105"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <motion.path
            variants={waveVariants}
            animate="animate"
            fill={darkMode ? '#a78bfa' : '#ffffff'}
            fillOpacity="0.2"
            transition={{ delay: 0.3 }}
          />
        </svg>
      </div>

      {/* Interactive Gooey Blob */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-400 to-blue-400 blur-3xl opacity-10 pointer-events-none"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Animated Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-blue-500 blur-3xl opacity-10"
          animate={{
            x: [0, 100, 0, -100, 0],
            y: [0, -50, 100, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            left: '10%',
            top: '20%',
          }}
        />
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-blue-500 blur-3xl opacity-10"
          animate={{
            x: [0, -100, 0, 100, 0],
            y: [0, 50, -100, -50, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            right: '10%',
            bottom: '20%',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-12 grid md:grid-cols-4 gap-8">
        {/* COMPANY */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-bold text-lg mb-4 tracking-wide">Company</h3>
          <ul className="space-y-2">
            <li><Link to="/about" className="hover:underline">About Us</Link></li>
            <li><Link to="/course" className="hover:underline">Courses</Link></li>
            <li><Link to="/" className="hover:underline">Blog</Link></li>
            <li><Link to="/pricing" className="hover:underline">Pricing</Link></li>
          </ul>
        </motion.div>

        {/* LEGAL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="font-bold text-lg mb-4 tracking-wide">Legal</h3>
          <ul className="space-y-2">
            <li><Link to="/terms" className="hover:underline">Terms of Service</Link></li>
            <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link to="/cookies" className="hover:underline">Cookie Policy</Link></li>
          </ul>
        </motion.div>

        {/* SUPPORT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="font-bold text-lg mb-4 tracking-wide">Support</h3>
          <ul className="space-y-2">
            <li><Link to="/help" className="hover:underline">Help Center</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
            <li>
              <HashLink 
                to="/#faq" 
                smooth
                className="hover:underline hover:text-blue-300 transition-colors"
              >
                FAQs
              </HashLink>
            </li>
          </ul>
        </motion.div>

        {/* SOCIALS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="font-bold text-lg mb-4 tracking-wide">Socials</h3>
          <div className="flex space-x-4">
            {[
              { Icon: Twitter, url: "https://twitter.com", color: "#1DA1F2" },
              { Icon: Facebook, url: "https://facebook.com", color: "#4267B2" },
              { Icon: Instagram, url: "https://instagram.com", color: "#E1306C" },
              { Icon: Linkedin, url: "https://linkedin.com", color: "#0077b5" },
            ].map(({ Icon, url, color }, index) => (
              <motion.a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring" }}
                className="relative group"
              >
                <motion.div
                  className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-20 transition-opacity"
                  style={{ background: color }}
                  animate={{
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                <div className={`relative p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                  darkMode 
                    ? 'bg-slate-800/50 group-hover:bg-slate-700/70 border border-slate-700' 
                    : 'bg-white/10 group-hover:bg-white/20 border border-white/20'
                }`}>
                  <Icon size={22} />
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Liquid Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className={`h-px w-full max-w-7xl mx-auto mb-6 bg-gradient-to-r ${
          darkMode 
            ? 'from-transparent via-indigo-400 to-transparent' 
            : 'from-transparent via-white to-transparent'
        }`}
      />

      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center pb-8"
      >
        <motion.p
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity }}
          className={`text-sm ${
            darkMode ? "text-gray-400" : "text-white/70"
          }`}
        >
          &copy; {new Date().getFullYear()} Upperclass AI. All rights reserved.
        </motion.p>
      </motion.div>
    </footer>
  );
}