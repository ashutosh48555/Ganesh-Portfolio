import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, Project } from "@/lib/data";
import { fadeInUp, staggerContainer, defaultViewport } from "@/lib/animations";
import ProjectCard from "./ProjectCard";
import CaseStudyModal from "./CaseStudyModal";

const categories = [
  { id: "all", label: "All" },
  { id: "lighting", label: "Lighting" },
  { id: "compositing", label: "Compositing" },
  { id: "cg-integration", label: "CG Integration" },
  { id: "personal", label: "Personal" },
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  // Close active modal when global navigation occurs (e.g. from BubbleMenu)
  // Close active modal when global navigation occurs
  useEffect(() => {
    const handleNavigation = () => {
      if (isModalOpen) {
        handleCloseModal();
      }
    };
    window.addEventListener('navigation-click', handleNavigation);
    return () => window.removeEventListener('navigation-click', handleNavigation);
  }, [isModalOpen]);

  return (
    <section id="portfolio" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="text-center mb-12"
        >
          <motion.span
            variants={fadeInUp}
            className="text-primary text-sm font-medium tracking-widest uppercase"
          >
            Selected Work
          </motion.span>
          <motion.h2 variants={fadeInUp} className="heading-lg mt-4">
            Portfolio
          </motion.h2>
        </motion.div>

        {/* Category Filters - Premium Glassmorphic Pills */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden group ${activeCategory === category.id
                ? "text-black font-bold"
                : "text-zinc-400 hover:text-white bg-zinc-900/50 border border-white/5 hover:border-white/20"
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeCategory === category.id && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-primary z-0"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{category.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid - Masonry-style Layout Animation */}
        <motion.div
          layout
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => handleProjectClick(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default Portfolio;
