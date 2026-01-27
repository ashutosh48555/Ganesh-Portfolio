import { motion } from "framer-motion";

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
      
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, hsl(42 58% 58% / 0.15) 0%, transparent 70%)",
          left: "-20%",
          top: "-10%",
        }}
        animate={{
          x: [0, 100, 50, 0],
          y: [0, 50, 100, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, hsl(42 58% 58% / 0.1) 0%, transparent 70%)",
          right: "-10%",
          top: "20%",
        }}
        animate={{
          x: [0, -80, -40, 0],
          y: [0, 80, 40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, hsl(240 20% 20% / 0.5) 0%, transparent 70%)",
          left: "30%",
          bottom: "-20%",
        }}
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -60, -30, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Flowing lines / mesh effect */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.03]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="hsl(42 58% 58%)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Animated lines that flow across */}
      <motion.div
        className="absolute h-px w-[200%] left-[-50%] top-[30%] opacity-10"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(42 58% 58%), transparent)",
        }}
        animate={{
          x: ["-50%", "0%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      <motion.div
        className="absolute h-px w-[200%] left-[-50%] top-[50%] opacity-10"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(42 58% 58%), transparent)",
        }}
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      <motion.div
        className="absolute h-px w-[200%] left-[-50%] top-[70%] opacity-10"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(42 58% 58%), transparent)",
        }}
        animate={{
          x: ["-25%", "25%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "reverse",
        }}
      />

      {/* Floating particles with glow */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          style={{
            left: `${10 + (i * 6)}%`,
            top: `${20 + ((i * 13) % 60)}%`,
            boxShadow: "0 0 10px hsl(42 58% 58% / 0.3)",
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + (i % 3),
            delay: i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Subtle vignette overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, hsl(240 20% 4% / 0.4) 100%)",
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
