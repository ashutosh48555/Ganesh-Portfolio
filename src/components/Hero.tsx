import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { fadeInUp } from "@/lib/animations";
import { bio } from "@/lib/data";
import { useRef } from "react";

import { MagneticText } from "@/components/ui/MagneticText";

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleScrollToAbout = () => {
    const element = document.querySelector("#about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Cinematic Vignette & Spotlight */}
      <div className="absolute inset-0 bg-vignette pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-60 pointer-events-none z-0" />

      {/* Floating Dust Particles - Depth Layer */}
      {/* Floating Dust Particles - Depth Layer - CSS GPU Optimized */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-primary/20 rounded-full blur-[1px] animate-float"
          style={{
            width: Math.random() * 4 + 1 + "px",
            height: Math.random() * 4 + 1 + "px",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
            zIndex: 1,
            animationDuration: Math.random() * 10 + 10 + "s",
            animationDelay: Math.random() * 10 + "s",
            opacity: 0, // Base opacity for animation start
          }}
        />
      ))}

      {/* Content */}
      <motion.div
        className="container mx-auto px-6 text-center relative z-20"
        style={{ y: yText, opacity: opacityText }}
      >
        {/* Name with Magnetic Effect */}
        <div className="mb-6">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <MagneticText className="heading-xl font-bold tracking-tighter text-gradient">
              {bio.name.toUpperCase()}
            </MagneticText>
          </motion.div>
        </div>

        {/* Tagline */}
        <div className="reveal-mask-container mb-4 overflow-hidden">
          <motion.p
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-lg md:text-xl text-primary font-medium tracking-[0.2em] uppercase"
          >
            {bio.tagline}
          </motion.p>
        </div>

        {/* Headline */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 font-light leading-relaxed text-balance"
        >
          {bio.headline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.a
            href="#portfolio"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-primary relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">View My Work</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </motion.a>
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3 border border-input rounded-md text-foreground hover:border-primary hover:text-primary transition-all duration-300 relative overflow-hidden group backdrop-blur-sm bg-background/5"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Get in Touch</span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        onClick={handleScrollToAbout}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors cursor-pointer z-20 group"
        aria-label="Scroll to about section"
      >
        <span className="text-[10px] uppercase tracking-widest mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-300">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={24} className="opacity-60 group-hover:opacity-100" />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default Hero;
