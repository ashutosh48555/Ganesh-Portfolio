import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { staggerContainer, defaultViewport, scaleIn } from "@/lib/animations";
import { MouseEvent, useRef } from "react";
// SVG Imports Removed


// Tool Data using SVG Components
// Tool Data using Local Icons
const toolData = [
  { name: "Unreal Engine", category: "Real-Time / Virtual Production", icon: "/icons/unreal.png", color: "#0E1128" },
  { name: "Blender", category: "3D Modeling & Animation", icon: "/icons/blender.png", color: "#F5792A" },
  { name: "Maya", category: "Character Animation", icon: "/icons/maya.png", color: "#0696D7" },
  { name: "Houdini", category: "Procedural FX & Sim", icon: "/icons/houdini.png", color: "#FF4713" },
  { name: "ZBrush", category: "Digital Sculpting", icon: "/icons/zbrush.png", color: "#EE0F4F", hasBackground: true },
  { name: "Substance", category: "Texturing & Shading", icon: "/icons/substance.png", color: "#F0B400" },
  { name: "Nuke", category: "Advanced Compositing", icon: "/icons/nuke.png", color: "#F7C43B" },
  { name: "After Effects", category: "Motion Graphics", icon: "/icons/ae.png", color: "#9999FF" },
  { name: "Photoshop", category: "Image Manipulation", icon: "/icons/ps.png", color: "#31A8FF" },
  { name: "Unity", category: "Interactive Dev", icon: "/icons/unity.png", color: "#FFFFFF", hasBackground: true },
];

const ToolCard3D = ({ tool, index }: { tool: typeof toolData[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPct = (e.clientX - rect.left) / width - 0.5;
    const mouseYPct = (e.clientY - rect.top) / height - 0.5;

    x.set(mouseXPct);
    y.set(mouseYPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // const Icon = tool.icon; removed

  return (
    <motion.div
      variants={scaleIn}
      style={{ perspective: 1000 }}
      className="h-48 w-full"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full w-full rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-xl transition-colors duration-500 hover:border-white/30 hover:shadow-2xl shadow-black/50 overflow-visible group"
      >
        {/* Deep Depth Layer (Background Glow) */}
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at center, ${tool.color}40 0%, transparent 70%)`,
            transform: "translateZ(-20px)"
          }}
        />

        {/* Floating Content Layer */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center p-6"
          style={{ transform: "translateZ(50px)" }}
        >
          {/* Icon - Always Colored & Floating */}
          <div className="relative mb-6">
            {/* Dynamic Shadow for Depth */}
            <div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-2 bg-black/50 blur-md rounded-[100%] transition-transform duration-300 group-hover:scale-75 group-hover:translate-y-4"
            />

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2
              }}
              className="relative z-10"
            >
              <img
                src={tool.icon}
                alt={tool.name}
                className={`h-16 w-16 drop-shadow-2xl object-contain ${
                  // @ts-ignore
                  tool.hasBackground ? "bg-white/90 rounded-lg p-1.5" : ""
                  }`}
              />
            </motion.div>
          </div>

          <h3 className="text-xl font-bold text-white tracking-tight">{tool.name}</h3>
          <p className="text-[10px] uppercase tracking-widest text-white/50 mt-1 font-medium text-center">
            {tool.category}
          </p>
        </div>

        {/* Shine/Reflection Layer */}
        <div
          className="absolute inset-0 rounded-xl bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
          style={{ transform: "translateZ(1px)" }}
        />
      </motion.div>
    </motion.div>
  );
};

const Tools = () => {
  return (
    <section id="tools" className="section-padding bg-zinc-950/80 overflow-visible relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-widest uppercase mb-2 block">
            My Professional Toolkit
          </span>
          <h2 className="heading-lg">
            Technologies I Know <span className="text-primary">Insanely Well</span>
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 px-4"
        >
          {toolData.map((tool, index) => (
            <ToolCard3D key={tool.name} tool={tool} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Tools;
