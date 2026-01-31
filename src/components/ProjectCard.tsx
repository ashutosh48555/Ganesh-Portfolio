import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/lib/data";
import { projectCard } from "@/lib/animations";
import { MagicCard } from "@/components/ui/MagicCard";
import React from "react";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(({ project, onClick }, ref) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], ["15deg", "-15deg"]); // Increased rotation for more drama
  const rotateY = useTransform(x, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article
      ref={ref}
      layout
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={projectCard}
      className="group relative w-full cursor-pointer h-full min-h-[300px]"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px", // Explicit pixel unit for consistent 3D
      }}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full"
      >
        {/* BASE LAYER: MagicCard (Flat Surface at Z=0) */}
        <div className="absolute inset-0" style={{ transform: "translateZ(0)" }}>
          <MagicCard
            className="h-full w-full flex flex-col items-start justify-end overflow-hidden rounded-2xl"
            gradientColor="#3f3f46"
            hoverColor="#CBA45F"
            borderWidth={2}
          >
            {/* BACKGROUND IMAGE & GRADIENTS */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <motion.img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80" />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          </MagicCard>
        </div>

        {/* FLOATING LAYER: Content (Popped out at Z=50px) */}
        <div
          className="absolute inset-0 z-10 p-6 flex flex-col justify-end pointer-events-none"
          style={{ transform: "translateZ(50px)" }} // True Parallax Pop
        >
          {/* Floating Arrow Badge */}
          <div className="absolute top-4 right-4 translate-y-[-10px] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg">
              <ArrowUpRight className="h-5 w-5" />
            </div>
          </div>

          {/* Category Tag */}
          <div className="mb-2">
            <span className="inline-block px-2 py-1 text-[10px] font-bold tracking-widest uppercase text-primary bg-primary/10 border border-primary/20 rounded-md backdrop-blur-sm shadow-md">
              {project.categoryLabel}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight drop-shadow-lg">
            {project.title}
          </h3>

          {/* Divider Line */}
          <div className="h-[1px] w-full bg-white/20 mb-3 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 shadow-[0_0_10px_white]" />

          {/* Description / CTA */}
          <p className="text-sm text-zinc-300 line-clamp-2 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 drop-shadow-md">
            Click to view case study details.
          </p>
        </div>
      </motion.div>
    </motion.article>
  );
});

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
