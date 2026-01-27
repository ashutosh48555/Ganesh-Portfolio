import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedContentProps {
  children: React.ReactNode;
  distance?: number;
  direction?: 'vertical' | 'horizontal';
  reverse?: boolean;
  duration?: number;
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  threshold?: number;
  delay?: number;
  onComplete?: () => void;
  className?: string;
}

const AnimatedContent: React.FC<AnimatedContentProps> = ({
  children,
  distance = 100,
  direction = 'vertical',
  reverse = false,
  duration = 0.8,
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  onComplete,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  const offset = reverse ? -distance : distance;
  
  const initial = {
    x: direction === 'horizontal' ? offset : 0,
    y: direction === 'vertical' ? offset : 0,
    scale,
    opacity: animateOpacity ? initialOpacity : 1,
  };

  const animate = isInView ? {
    x: 0,
    y: 0,
    scale: 1,
    opacity: 1,
  } : initial;

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onAnimationComplete={onComplete}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedContent;
