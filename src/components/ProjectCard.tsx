import { useState } from "react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { Project } from "@/lib/data";
import { projectCard } from "@/lib/animations";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      variants={projectCard}
      className="group relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ y: -5 }}
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0"
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>

      {/* Gradient Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"
        animate={{
          opacity: isHovered ? 1 : 0.6,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <motion.div
          animate={{
            y: isHovered ? 0 : 10,
            opacity: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-primary text-xs font-medium tracking-wide uppercase">
            {project.categoryLabel}
          </span>
          <h3 className="text-xl font-bold mt-1">{project.title}</h3>
        </motion.div>

        {/* View indicator */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
            <Eye className="w-6 h-6 text-primary-foreground" />
          </div>
        </motion.div>
      </div>

      {/* Border glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-lg border-2 border-primary/0 pointer-events-none"
        animate={{
          borderColor: isHovered ? "hsl(42 58% 58% / 0.3)" : "hsl(42 58% 58% / 0)",
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.article>
  );
};

export default ProjectCard;
