import { motion } from "framer-motion";
import { useState } from "react";
import { staggerContainer, defaultViewport } from "@/lib/animations";
import { vfxSkills, gameSkills } from "@/lib/data";

const KineticListItem = ({ text, index }: { text: string; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.li
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      viewport={defaultViewport}
      className="relative cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glitch/Ghost Effect on Hover */}
      <span
        className={`absolute inset-0 text-4xl sm:text-6xl md:text-8xl font-black text-primary/20 blur-sm transition-opacity duration-200 will-change-transform ${isHovered ? "opacity-100 translate-x-1" : "opacity-0"}`}
        aria-hidden="true"
      >
        {text.toUpperCase()}
      </span>

      {/* Main Text */}
      <span
        className={`relative z-10 block text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter transition-all duration-300 ${isHovered ? "text-primary translate-x-4" : "text-input hover:text-foreground"}`} // text-input is usually dark grey/dim in dark mode, changing to more readable base if needed.
        style={{
          // Fallback/Enhancement if standard colors aren't punchy enough 
          color: isHovered ? "hsl(var(--primary))" : "rgba(255, 255, 255, 0.2)",
          WebkitTextStroke: isHovered ? "0px" : "1px rgba(255, 255, 255, 0.5)",
        }}
      >
        {text.toUpperCase()}
      </span>
    </motion.li>
  );
};

const Skills = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <section id="skills" className="section-padding overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="mb-20"
        >
          <h2 className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">Expertise</h2>
          <p className="heading-lg text-white">Capability Stack</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20">
          {/* VFX Column */}
          <div
            className={`transition-opacity duration-500 ${hoveredCategory && hoveredCategory !== 'vfx' ? 'opacity-30 blur-sm' : 'opacity-100'}`}
            onMouseEnter={() => setHoveredCategory('vfx')}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <h3 className="text-xl font-bold mb-8 text-white/50 border-b border-white/10 pb-4">VFX & Compositing</h3>
            <ul className="space-y-4">
              {vfxSkills.map((skill, i) => (
                <KineticListItem key={skill.name} text={skill.name} index={i} />
              ))}
            </ul>
          </div>

          {/* Game Column - The one user complained about */}
          <div
            className={`transition-opacity duration-500 ${hoveredCategory && hoveredCategory !== 'game' ? 'opacity-30 blur-sm' : 'opacity-100'}`}
            onMouseEnter={() => setHoveredCategory('game')}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <h3 className="text-xl font-bold mb-8 text-white/50 border-b border-white/10 pb-4">Game & Environment</h3>
            <ul className="space-y-4">
              {gameSkills.map((skill, i) => (
                <KineticListItem key={skill.name} text={skill.name} index={i + 5} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
