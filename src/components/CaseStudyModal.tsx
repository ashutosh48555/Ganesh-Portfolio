import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { Project } from "@/lib/data";
import { modalBackdrop, modalContent, staggerContainer, fadeInUp } from "@/lib/animations";
import BeforeAfterSlider from "./BeforeAfterSlider";

interface CaseStudyModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const CaseStudyModal = ({ project, isOpen, onClose }: CaseStudyModalProps) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={modalBackdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/90 backdrop-blur-md" />

          {/* Modal Content */}
          <motion.div
            variants={modalContent}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card border border-border rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 text-foreground hover:text-primary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Close modal"
            >
              <X size={24} />
            </motion.button>

            {/* Hero Image */}
            <div className="relative aspect-video overflow-hidden rounded-t-lg">
              <img
                src={project.heroImage}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
            </div>

            {/* Content */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="p-6 md:p-8 space-y-8"
            >
              {/* Header */}
              <motion.div variants={fadeInUp}>
                <span className="text-primary text-sm font-medium">
                  {project.categoryLabel} • {project.year}
                </span>
                <h2 className="heading-lg mt-2">{project.title}</h2>
              </motion.div>

              {/* Description */}
              <motion.div variants={fadeInUp} className="space-y-4">
                <h3 className="heading-md">Overview</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </motion.div>

              {/* Challenge & Solution */}
              <motion.div
                variants={fadeInUp}
                className="grid md:grid-cols-2 gap-6"
              >
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-primary">
                    The Challenge
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.challenge}
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-primary">
                    The Solution
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </motion.div>

              {/* Before/After Slider */}
              {project.beforeImage && project.afterImage && (
                <motion.div variants={fadeInUp} className="space-y-4">
                  <h3 className="heading-md">Before & After</h3>
                  <BeforeAfterSlider
                    beforeImage={project.beforeImage}
                    afterImage={project.afterImage}
                    beforeLabel="Before"
                    afterLabel="After"
                  />
                </motion.div>
              )}

              {/* Tools Used */}
              <motion.div variants={fadeInUp} className="space-y-4">
                <h3 className="heading-md">Tools Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1 text-sm bg-secondary/50 rounded-full border border-border/50"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CaseStudyModal;
