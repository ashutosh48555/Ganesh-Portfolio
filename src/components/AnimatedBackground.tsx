import { motion } from "framer-motion";
import Ballpit from "./Ballpit";

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base premium dark background */}
      <div className="absolute inset-0 bg-background" />

      {/* 3D Ballpit - Interactive physics balls */}
      {/* Using theme colors: Primary (Antique Gold), Muted (Grey), and Darker shades */}
      <div
        className="absolute inset-0 pointer-events-auto opacity-30"
        style={{ minHeight: '100vh' }}
      >
        <Ballpit
          count={65} // "More Balls" as requested (was 35)
          gravity={0.01} // Stronger gravity for "falling in" 
          friction={0.999} // Less friction = more movement
          wallBounce={0.9} // More bounce
          followCursor={true}
          // Colors: Antique Gold, Much Lighter Grey, White, accent Blue
          colors={[0xD4A853, 0xA0A0A0, 0xFFFFFF, 0x4B5563]}
        />
      </div>

      {/* Cinematic Fog / Nebulas Overlay (kept subtle for depth) */}
      <motion.div
        className="absolute w-[120vw] h-[100vh] rounded-[100%] opacity-[0.05] mix-blend-screen blur-[120px]"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 60%)",
          left: "-20%",
          top: "-30%",
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />


      {/* Anamorphic Lens Flare / Streak (very subtle) */}
      <motion.div
        className="absolute h-[2px] w-[80%] left-[10%] top-[40%] opacity-[0.03] blur-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)",
        }}
        animate={{
          opacity: [0.03, 0.06, 0.03],
          scaleX: [1, 1.5, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Grid Floor Effect (Perspective) - Bottom only */}
      <div
        className="absolute bottom-0 left-[-50%] w-[200%] h-[30vh] opacity-[0.03]"
        style={{
          background: `linear-gradient(transparent 0%, hsl(var(--primary)) 100%), 
                       repeating-linear-gradient(90deg, transparent 0, transparent 49px, hsl(var(--primary)) 50px)`,
          transform: "perspective(500px) rotateX(60deg)",
          maskImage: "linear-gradient(to bottom, transparent, black)",
        }}
      />

      {/* Noise / Grain is handled globally in index.css on body, but adding a specific texture layer here if needed */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
    </div>
  );
};

export default AnimatedBackground;
