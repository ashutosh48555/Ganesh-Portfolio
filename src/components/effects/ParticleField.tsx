import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  glowIntensity: number;
}

const ParticleField = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 1,
          duration: Math.random() * 15 + 10,
          delay: Math.random() * 8,
          glowIntensity: Math.random() * 0.5 + 0.2,
        });
      }
      setParticles(newParticles);
    };
    generateParticles();
  }, []);

  // Memoize random values to prevent recalculation on each render
  const particleAnimations = useMemo(() => {
    return particles.map(() => ({
      xOffset1: Math.random() * 40 - 20,
      xOffset2: Math.random() * 60 - 30,
    }));
  }, [particles.length]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Dust particles */}
      {particles.map((particle, index) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: `hsl(42 58% 58% / ${particle.glowIntensity})`,
            boxShadow: `0 0 ${particle.size * 3}px hsl(42 58% 58% / ${particle.glowIntensity * 0.5})`,
          }}
          animate={{
            y: [0, -150, -300],
            x: [0, particleAnimations[index]?.xOffset1 || 0, particleAnimations[index]?.xOffset2 || 0],
            opacity: [0, particle.glowIntensity, 0],
            scale: [0.5, 1, 0.3],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
      
      {/* Larger ambient orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${15 + i * 18}%`,
            top: `${30 + (i % 3) * 20}%`,
            width: 80 + i * 20,
            height: 80 + i * 20,
            background: `radial-gradient(circle, hsl(42 58% 58% / 0.05) 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8 + i * 2,
            delay: i * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default ParticleField;
