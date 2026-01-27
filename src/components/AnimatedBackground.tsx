import { motion } from "framer-motion";
import Ballpit from "./Ballpit";

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
      
      {/* 3D Ballpit - Interactive physics balls */}
      <div 
        className="absolute inset-0 pointer-events-auto opacity-40"
        style={{ minHeight: '100vh' }}
      >
        <Ballpit
          count={80}
          gravity={0.005}
          friction={0.998}
          wallBounce={0.9}
          followCursor={true}
          colors={[0xD4A853, 0x8B7355, 0x4A3F35]}
        />
      </div>

      {/* Animated gradient orbs - layered on top */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full opacity-15 pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(42 58% 58% / 0.12) 0%, transparent 70%)",
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
        className="absolute w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(42 58% 58% / 0.08) 0%, transparent 70%)",
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

      {/* Flowing lines / mesh effect */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.02] pointer-events-none"
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
        className="absolute h-px w-[200%] left-[-50%] top-[30%] opacity-5 pointer-events-none"
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
        className="absolute h-px w-[200%] left-[-50%] top-[50%] opacity-5 pointer-events-none"
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
        className="absolute h-px w-[200%] left-[-50%] top-[70%] opacity-5 pointer-events-none"
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

      {/* Subtle vignette overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, hsl(240 20% 4% / 0.5) 100%)",
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
