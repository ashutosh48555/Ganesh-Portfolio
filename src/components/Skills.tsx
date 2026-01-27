import { motion } from "framer-motion";
import {
  Lightbulb,
  Layers,
  Blend,
  Palette,
  Play,
  Box,
  PenTool,
  Sparkles,
  Clapperboard,
  Scissors,
  Move,
  Gamepad2,
  Map,
  Mountain,
  Sun,
} from "lucide-react";
import { fadeInUp, staggerContainer, defaultViewport, scaleIn } from "@/lib/animations";
import { coreSkills, vfxSkills, gameSkills } from "@/lib/data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Lightbulb,
  Layers,
  Blend,
  Palette,
  Play,
  Box,
  PenTool,
  Sparkles,
  Clapperboard,
  Scissors,
  Move,
  Gamepad2,
  Map,
  Mountain,
  Sun,
};

const Skills = () => {
  return (
    <section id="skills" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className="text-primary text-sm font-medium tracking-widest uppercase"
          >
            Expertise
          </motion.span>
          <motion.h2 variants={fadeInUp} className="heading-lg mt-4">
            Skills & Specializations
          </motion.h2>
        </motion.div>

        {/* Core Strengths */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {coreSkills.map((skill, index) => {
            const Icon = iconMap[skill.icon];
            return (
              <motion.div
                key={skill.title}
                variants={scaleIn}
                whileHover={{ y: -5 }}
                className="card-cinematic p-8 text-center group"
              >
                <motion.div
                  className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {Icon && <Icon className="w-8 h-8 text-primary" />}
                </motion.div>
                <h3 className="heading-md mb-3">{skill.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {skill.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* VFX & Design Skills */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="mb-12"
        >
          <motion.h3
            variants={fadeInUp}
            className="text-lg font-semibold mb-6 text-center"
          >
            VFX & Design Skills
          </motion.h3>
          <div className="flex flex-wrap justify-center gap-4">
            {vfxSkills.map((skill) => {
              const Icon = iconMap[skill.icon];
              return (
                <motion.div
                  key={skill.name}
                  variants={scaleIn}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full border border-border/50 hover:border-primary/30 transition-colors"
                >
                  {Icon && <Icon className="w-4 h-4 text-primary" />}
                  <span className="text-sm">{skill.name}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Game & Environment Work */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <motion.h3
            variants={fadeInUp}
            className="text-lg font-semibold mb-6 text-center"
          >
            Game & Environment Work
          </motion.h3>
          <div className="flex flex-wrap justify-center gap-4">
            {gameSkills.map((skill) => {
              const Icon = iconMap[skill.icon];
              return (
                <motion.div
                  key={skill.name}
                  variants={scaleIn}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-2 px-4 py-2 bg-secondary/30 rounded-full border border-border/30 hover:border-primary/30 transition-colors"
                >
                  {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
                  <span className="text-sm text-muted-foreground">{skill.name}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
