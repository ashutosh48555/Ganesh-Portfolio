import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface BentoCardData {
  color: string;
  title: string;
  description: string;
  label: string;
}

const cardData: BentoCardData[] = [
  { 
    color: 'hsl(var(--card))', 
    title: 'Lighting', 
    description: 'Master of atmosphere and mood', 
    label: 'Specialty' 
  },
  { 
    color: 'hsl(var(--card))', 
    title: 'Compositing', 
    description: 'Seamless visual blending', 
    label: 'Core Skill' 
  },
  { 
    color: 'hsl(var(--card))', 
    title: 'CG Integration', 
    description: 'Matching CG to live action plates', 
    label: 'Featured' 
  },
  { 
    color: 'hsl(var(--card))', 
    title: 'Automotive', 
    description: 'Showroom quality renders', 
    label: 'Industry' 
  },
  { 
    color: 'hsl(var(--card))', 
    title: 'Personal Projects', 
    description: 'Creative exploration & experiments', 
    label: 'Creative' 
  },
  { 
    color: 'hsl(var(--card))', 
    title: 'Architectural', 
    description: 'Photorealistic visualization', 
    label: 'Expertise' 
  },
];

const GLOW_COLOR = '212, 168, 83'; // Amber matching primary

interface ParticleProps {
  x: number;
  y: number;
  id: number;
}

const Particle: React.FC<ParticleProps> = ({ x, y }) => {
  const randomX = (Math.random() - 0.5) * 100;
  const randomY = (Math.random() - 0.5) * 100;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
      animate={{ 
        scale: [0, 1, 1, 0.5],
        opacity: [0, 1, 0.6, 0],
        x: randomX,
        y: randomY,
      }}
      transition={{ duration: 2, ease: "easeOut" }}
      className="absolute w-1 h-1 rounded-full pointer-events-none"
      style={{
        left: x,
        top: y,
        background: `rgba(${GLOW_COLOR}, 1)`,
        boxShadow: `0 0 6px rgba(${GLOW_COLOR}, 0.6)`,
      }}
    />
  );
};

interface BentoCardProps {
  card: BentoCardData;
  index: number;
  enableParticles: boolean;
  enableTilt: boolean;
  enableBorderGlow: boolean;
  clickEffect: boolean;
  textAutoHide: boolean;
}

const BentoCard: React.FC<BentoCardProps> = ({ 
  card, 
  index, 
  enableParticles, 
  enableTilt,
  enableBorderGlow,
  clickEffect,
  textAutoHide
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<ParticleProps[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
  const [glowIntensity, setGlowIntensity] = useState(0);
  
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const particleIdRef = useRef(0);

  // Spawn particles on hover
  useEffect(() => {
    if (!enableParticles || !isHovered) return;

    const interval = setInterval(() => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const newParticle = {
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        id: particleIdRef.current++,
      };
      setParticles(prev => [...prev.slice(-11), newParticle]);
    }, 200);

    return () => clearInterval(interval);
  }, [enableParticles, isHovered]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Glow position
    const relativeX = (x / rect.width) * 100;
    const relativeY = (y / rect.height) * 100;
    setGlowPosition({ x: relativeX, y: relativeY });
    setGlowIntensity(1);

    // Tilt effect
    if (enableTilt) {
      const tiltX = ((y - centerY) / centerY) * -10;
      const tiltY = ((x - centerX) / centerX) * 10;
      rotateX.set(tiltX);
      rotateY.set(tiltY);
    }
  }, [enableTilt, rotateX, rotateY]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setGlowIntensity(0);
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (!clickEffect || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Create ripple element
    const ripple = document.createElement('div');
    const maxDistance = Math.max(
      Math.hypot(x, y),
      Math.hypot(x - rect.width, y),
      Math.hypot(x, y - rect.height),
      Math.hypot(x - rect.width, y - rect.height)
    );
    
    ripple.style.cssText = `
      position: absolute;
      width: ${maxDistance * 2}px;
      height: ${maxDistance * 2}px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(${GLOW_COLOR}, 0.4) 0%, rgba(${GLOW_COLOR}, 0.2) 30%, transparent 70%);
      left: ${x - maxDistance}px;
      top: ${y - maxDistance}px;
      pointer-events: none;
      z-index: 1000;
      transform: scale(0);
      opacity: 1;
    `;
    
    cardRef.current.appendChild(ripple);
    
    // Animate with CSS
    requestAnimationFrame(() => {
      ripple.style.transition = 'transform 0.8s ease-out, opacity 0.8s ease-out';
      ripple.style.transform = 'scale(1)';
      ripple.style.opacity = '0';
    });
    
    setTimeout(() => ripple.remove(), 800);
  }, [clickEffect]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.3 }
      }}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 1000,
        backgroundColor: card.color,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="relative flex flex-col justify-between aspect-[4/3] min-h-[200px] p-5 rounded-2xl border border-border overflow-hidden cursor-pointer transition-shadow duration-300"
    >
      {/* Border glow overlay */}
      {enableBorderGlow && (
        <div 
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
          style={{
            opacity: glowIntensity,
            background: `radial-gradient(200px circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(${GLOW_COLOR}, 0.15) 0%, transparent 70%)`,
          }}
        />
      )}
      
      {/* Border glow effect */}
      {enableBorderGlow && (
        <div 
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            opacity: glowIntensity * 0.8,
            padding: '1px',
            background: `radial-gradient(200px circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(${GLOW_COLOR}, 0.6) 0%, transparent 60%)`,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />
      )}

      {/* Particles */}
      <AnimatePresence>
        {particles.map((particle) => (
          <Particle key={particle.id} x={particle.x} y={particle.y} id={particle.id} />
        ))}
      </AnimatePresence>

      {/* Content */}
      <motion.div 
        className="relative z-10"
        animate={{ opacity: textAutoHide && isHovered ? 0.3 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary">
          {card.label}
        </span>
      </motion.div>

      <motion.div 
        className="relative z-10 mt-auto"
        animate={{ opacity: textAutoHide && isHovered ? 0.3 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-lg font-semibold text-foreground mb-1">
          {card.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {card.description}
        </p>
      </motion.div>

      {/* Hover shadow enhancement */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          boxShadow: isHovered 
            ? `0 8px 30px rgba(${GLOW_COLOR}, 0.15), 0 0 40px rgba(${GLOW_COLOR}, 0.1)`
            : '0 0 0 transparent'
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

interface MagicBentoProps {
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  enableTilt?: boolean;
  clickEffect?: boolean;
}

const MagicBento: React.FC<MagicBentoProps> = ({
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  enableTilt = true,
  clickEffect = true,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [spotlightOpacity, setSpotlightOpacity] = useState(0);

  // Global spotlight effect
  useEffect(() => {
    if (!enableSpotlight || isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!gridRef.current) return;
      
      const section = gridRef.current.closest('section');
      const rect = section?.getBoundingClientRect();
      
      if (rect && e.clientX >= rect.left && e.clientX <= rect.right && 
          e.clientY >= rect.top && e.clientY <= rect.bottom) {
        setSpotlightPos({ x: e.clientX, y: e.clientY });
        setSpotlightOpacity(0.6);
      } else {
        setSpotlightOpacity(0);
      }
    };

    const handleMouseLeave = () => {
      setSpotlightOpacity(0);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [enableSpotlight, isMobile]);

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Global spotlight */}
      {enableSpotlight && !isMobile && (
        <motion.div
          className="fixed pointer-events-none z-50"
          animate={{
            left: spotlightPos.x,
            top: spotlightPos.y,
            opacity: spotlightOpacity,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{
            width: 600,
            height: 600,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, rgba(${GLOW_COLOR}, 0.12) 0%, rgba(${GLOW_COLOR}, 0.06) 20%, rgba(${GLOW_COLOR}, 0.02) 40%, transparent 60%)`,
            mixBlendMode: 'screen',
          }}
        />
      )}

      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm font-medium tracking-widest uppercase">
            Specializations
          </span>
          <h2 className="heading-lg mt-4">
            Featured Expertise
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div 
          ref={gridRef}
          className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-auto"
          style={{
            gridTemplateRows: 'auto',
          }}
        >
          {cardData.map((card, index) => {
            // Define grid spans for larger cards
            let className = '';
            if (index === 2) className = 'lg:col-span-2 lg:row-span-2'; // CG Integration - large
            if (index === 3) className = 'lg:col-span-2 lg:row-span-2'; // Automotive - large

            return (
              <div key={card.title} className={className}>
                <BentoCard
                  card={card}
                  index={index}
                  enableParticles={enableStars && !isMobile}
                  enableTilt={enableTilt && !isMobile}
                  enableBorderGlow={enableBorderGlow}
                  clickEffect={clickEffect}
                  textAutoHide={textAutoHide}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MagicBento;
