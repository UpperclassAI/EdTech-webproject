"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Twitter,
  Instagram,
  Linkedin,
  ChevronRight,
  Share2,
} from "lucide-react";
import { useTheme } from "./context/ThemeContext";

const socials = [
  {
    icon: Twitter,
    url: "https://twitter.com/upperclassAI",
    color: "#1DA1F2",
   
  },
  {
    icon: Instagram,
    url: "https://instagram.com/upperclassAI",
    color: "#1DA1F2",
   
  },
  {
    icon: Linkedin,
    url: "https://linkedin.com/company/upperclassai",
     color: "#1DA1F2",
   
  },

 
];

export default function FloatingSocialGlass() {
  const { theme } = useTheme();
  const [ripples, setRipples] = useState([]);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const containerRef = useRef(null);
  const clickTimerRef = useRef(null);
  const hoverTimerRef = useRef(null);

  // Check if mobile and initialize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsExpanded(false); // Start collapsed on mobile
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Trigger load animation after mount
    const timer = setTimeout(() => setHasLoaded(true), 300);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    };
  }, []);

  const createRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { x, y, id }]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 900);
  };

  // Handle container click to toggle expand/collapse
  const handleContainerClick = (e) => {
    // Only trigger if clicking directly on the container background
    if (e.target === e.currentTarget || e.target.closest('a') === null) {
      setIsExpanded(!isExpanded);
      createRipple(e);
    }
  };

  // Handle double click detection
  const handleIconClick = (e) => {
    e.stopPropagation();
    setClickCount(prev => {
      const newCount = prev + 1;
      
      if (newCount === 1) {
        // First click - start timer
        clickTimerRef.current = setTimeout(() => {
          setClickCount(0);
        }, 300);
      } else if (newCount === 2) {
        // Second click within 300ms - toggle expansion
        clearTimeout(clickTimerRef.current);
        setIsExpanded(!isExpanded);
        setClickCount(0);
      }
      
      return newCount;
    });
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Handle hover with delay for mobile
  const handleMouseEnter = () => {
    if (!isMobile) {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      hoverTimerRef.current = setTimeout(() => {
        setIsHovering(false);
      }, 300);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { 
      x: -80, 
      opacity: 0,
      scale: 0.8 
    },
    visible: { 
      x: 0, 
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        delay: 0.3,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { 
      x: -30, 
      opacity: 0,
      scale: 0.7 
    },
    visible: (i) => ({ 
      x: 0, 
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.08 + 0.5,
        type: "spring",
        stiffness: 180,
        damping: 15,
        duration: 0.5
      }
    }),
    exit: { 
      x: -30, 
      opacity: 0,
      scale: 0.7,
      transition: { duration: 0.2 }
    }
  };

  const collapsedIconVariants = {
    hidden: { 
      rotate: -90, 
      opacity: 0,
      scale: 0.5 
    },
    visible: { 
      rotate: 0, 
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.1
      }
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className="fixed left-0 top-1/2 -translate-y-1/2 z-50"
      initial="hidden"
      animate={hasLoaded ? "visible" : "hidden"}
      variants={containerVariants}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Glass Container */}
      <motion.div
        onClick={handleContainerClick}
        className={`relative flex flex-col gap-3 p-3 rounded-tr-2xl rounded-br-2xl border-l-0
        backdrop-blur-xl border shadow-2xl overflow-hidden cursor-pointer
        ${
          theme === "dark"
            ? "bg-gradient-to-r from-white/[0.12] via-white/[0.08] to-white/[0.04] border-white/25"
            : "bg-gradient-to-r from-white/50 via-white/35 to-white/25 border-white/50"
        }`}
        animate={{
          padding: isExpanded ? "0.75rem" : "0.5rem",
          width: isExpanded ? "auto" : isMobile ? "52px" : "56px",
          scale: isMobile && !isExpanded ? 0.85 : 1,
        }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 25
        }}
        whileHover={{ 
          scale: 1.02,
          boxShadow: theme === "dark" 
            ? "0 25px 50px -12px rgba(255, 255, 255, 0.15)" 
            : "0 25px 50px -12px rgba(59, 130, 246, 0.15)"
        }}
        whileTap={{ scale: 0.98 }}
      >
        {/* GLASS REFLECTION EFFECT */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent pointer-events-none" />
        
        {/* ANIMATED SHIMMER EFFECT */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          animate={{
            x: ["0%", "100%"],
          }}
          transition={{
            x: {
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear"
            }
          }}
          style={{ opacity: isHovering ? 1 : 0.3 }}
        />

        {/* RIPPLE EFFECT */}
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: 20,
                height: 20,
                transform: "translate(-50%, -50%)",
                background: theme === "dark" 
                  ? "radial-gradient(circle, rgba(255, 255, 255, 0.68) 0%, rgba(255,255,255,0) 70%)"
                  : "radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(59,130,246,0) 70%)"
              }}
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 12, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            />
          ))}
        </AnimatePresence>

        {/* COLLAPSE/EXPAND INDICATOR */}
        <motion.div
          className={`absolute -right-3 top-1/2 -translate-y-1/2 z-20
          w-6 h-6 rounded-full  flex items-center justify-center
          backdrop-blur-md border-l-0 pointer-events-none
          ${
            theme === "dark"
              ? "bg-gray-800/90 border-gray-700/60 text-gray-300"
              : "bg-white/90 border-gray-300/60 text-gray-700"
          }`}
          animate={{
            rotate: isExpanded ? 0 : 180,
            scale: isHovering ? 1.1 : 1,
          }}
          transition={{ duration: 0.3, type: "spring" }}
        >
          <ChevronRight size={14} />
        </motion.div>

        {/* SOCIAL ICONS */}
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="expanded"
              className="flex flex-col gap-3"
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ staggerChildren: 0.05 }}
            >
              {socials.map((social, i) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleIconClick}
                    className="group relative p-3 rounded-full
                    transition-all duration-300
                    active:scale-95"
                  
                    custom={i}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.2,
                      rotate: [0, -3, 3, 0],
                      transition: { 
                        rotate: { duration: 0.4 },
                        scale: { duration: 0.2 }
                      }
                    }}
                    whileTap={{ scale: 0.85 }}
                    style={{
                      backgroundColor: theme === "dark" 
                        ? `rgba(255, 255, 255, 0.15)` 
                        : `rgba(255, 255, 255, 0.4)`,
                    }}
                  >
                    {/* ICON BACKGROUND GLOW */}
                    <motion.div
                      className="absolute inset-0 rounded-full opacity-0"
                      style={{
                        background: `radial-gradient(circle at center, ${social.color}40 0%, transparent 70%)`,
                        filter: `blur(8px)`,
                      }}
                      whileHover={{
                        opacity: 1,
                        scale: 1.5,
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    <Icon
                      size={isMobile ? 18 : 22}
                      className="relative z-10 transition-colors"
                      style={{ color: social.color }}
                    />

                 
                  </motion.a>
                );
              })}
            </motion.div>
          ) : (
            // COLLAPSED STATE - SINGLE ICON
            <motion.div
              key="collapsed"
              className="relative w-full h-full flex items-center justify-center"
              variants={collapsedIconVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <motion.div
                onClick={toggleExpand}
                className="group relative p-3 rounded-full flex items-center justify-center
                transition-all duration-300 active:scale-95 cursor-pointer"
                aria-label="Expand social media"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.85 }}
                style={{
                  backgroundColor: theme === "dark" 
                    ? `rgba(255, 255, 255, 0.15)` 
                    : `rgba(255, 255, 255, 0.4)`,
                }}
              >
                {/* PULSING ANIMATION */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: theme === "dark"
                      ? "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)"
                      : "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)",
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <Share2
                  size={isMobile ? 18 : 22}
                  className="relative z-10"
                  style={{
                    color: theme === "dark" ? "#93C5FD" : "#3B82F6",
                  }}
                />
                
                {/* TOOLTIP FOR COLLAPSED STATE */}
                <AnimatePresence>
                  {isHovering && (
                    <motion.span
                      className="absolute left-14 top-1/2 -translate-y-1/2
                      px-3 py-1.5 text-xs rounded-md
                      whitespace-nowrap backdrop-blur-md
                      pointer-events-none shadow-xl"
                      style={{
                        backgroundColor: theme === "dark" 
                          ? "rgba(17, 24, 39, 0.95)" 
                          : "rgba(255, 255, 255, 0.98)",
                        color: theme === "dark" ? "white" : "rgb(31, 41, 55)",
                      }}
                      initial={{ opacity: 0, x: -10, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -10, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      Click to expand ({socials.length} socials)
                      <motion.div
                        className="absolute left-[-4px] top-1/2 -translate-y-1/2
                        w-2 h-2 rotate-45"
                        style={{
                          backgroundColor: theme === "dark" 
                            ? "rgba(17, 24, 39, 0.95)" 
                            : "rgba(255, 255, 255, 0.98)",
                        }}
                      />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CLICK HINT TEXT (Only shows briefly on load) */}
        <AnimatePresence>
          {hasLoaded && isExpanded && !isMobile && (
            <motion.div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2
              text-xs text-gray-500 whitespace-nowrap"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 0.7, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              Click background to collapse
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* MOBILE FLOATING ACTION BUTTON (Alternative positioning) */}
      {isMobile && (
        <motion.div
          className="fixed bottom-6 right-6 z-50 md:hidden"
          initial={{ scale: 0, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 0.8, type: "spring" }}
        >
      
        </motion.div>
      )}
    </motion.div>
  );
}