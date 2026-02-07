import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { staggerContainer, defaultViewport, scaleIn } from "@/lib/animations";
import { MouseEvent } from "react";

// Tool Data
const toolData = [
  { name: "PhotoShop 2025", category: "Image Manipulation", icon: "/icons/ps.png", color: "#31A8FF" },
  { name: "Premiere Pro 2025", category: "Video Editing", icon: "/icons/pr.png", color: "#9999FF" },
  { name: "After Effects 2025", category: "Motion Graphics", icon: "/icons/ae.png", color: "#9999FF" },
  { name: "Maya 2025", category: "3D Animation", icon: "/icons/maya.png", color: "#0696D7" },
  { name: "Blender", category: "3D Modeling", icon: "/icons/blender.png", color: "#F5792A" },
  { name: "Substance 2025", category: "Texturing", icon: "/icons/substance.png", color: "#F0B400" },
  { name: "Silhouette 2025", category: "Roto & Paint", icon: "/icons/silhouette.png", color: "#F7C43B" },
  { name: "Nuke", category: "Compositing", icon: "/icons/nuke.png", color: "#F7C43B" },
  { name: "3d Equalizer", category: "Tracking", icon: "/icons/3dequalizer.png", color: "#000000" },
  { name: "Houdini FX", category: "Procedural FX", icon: "/icons/houdini.png", color: "#FF4713" },
  { name: "Unreal Engine", category: "Real-Time", icon: "/icons/unreal.png", color: "#0E1128" },
];

const ToolCard = ({ tool }: { tool: typeof toolData[0] }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      variants={scaleIn}
      className="group relative border border-white/10 bg-zinc-900/40 overflow-hidden rounded-xl"
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight Effect - Border */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${tool.color}40,
              transparent 80%
            )
          `,
        }}
      />

      {/* Content Container */}
      <div className="relative h-full flex flex-col items-center justify-center p-8 z-10">

        {/* Animated Background Glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle at center, ${tool.color}, transparent 70%)` }}
        />

        {/* Floating Icon */}
        <div className="relative mb-6 transform transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2">
          {/* Icon Shadow/Glow */}
          <div
            className="absolute -inset-4 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
            style={{ background: tool.color }}
          />
          <img
            src={tool.icon}
            alt={tool.name}
            className="h-20 w-20 object-contain relative z-10 drop-shadow-2xl"
          />
        </div>

        <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-primary transition-colors duration-300 text-center relative z-10">
          {tool.name}
        </h3>

        <div className="h-px w-12 bg-white/10 my-3 group-hover:w-24 group-hover:bg-primary/50 transition-all duration-300" />

        <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold text-center group-hover:text-white/80 transition-colors duration-300 relative z-10">
          {tool.category}
        </p>
      </div>
    </motion.div>
  );
};

const Tools = () => {
  return (
    <section id="tools" className="section-padding bg-zinc-950 relative overflow-hidden">
      {/* Ambient Background Elements */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-20"
        >
          <motion.span
            className="inline-block py-1 px-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4"
          >
            Capabilities
          </motion.span>
          <h2 className="heading-lg">
            Software <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-300 to-primary bg-[length:200%_auto] animate-gradient">Stack</span>
          </h2>
          <p className="max-w-xl mx-auto text-zinc-400 mt-6">
            A comprehensive arsenal of industry-standard tools for creating cinematic visual experiences.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {toolData.map((tool, index) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Tools;
