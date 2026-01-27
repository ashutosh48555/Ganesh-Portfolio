import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, defaultViewport } from "@/lib/animations";
import { tools } from "@/lib/data";
import { toolIconMap } from "@/components/icons/ToolIcons";

const Tools = () => {
  return (
    <section className="section-padding bg-card/30 overflow-hidden">
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
            Tools & Software
          </motion.span>
          <motion.h2 variants={fadeInUp} className="heading-lg mt-4">
            Industry-Standard Toolkit
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
        >
          {tools.map((tool, index) => {
            const IconComponent = toolIconMap[tool.name];
            return (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.05,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="card-cinematic p-6 text-center group cursor-default"
              >
                <motion.div 
                  className="w-14 h-14 mx-auto mb-3 rounded-xl bg-secondary/50 flex items-center justify-center overflow-hidden"
                  whileHover={{ 
                    backgroundColor: 'hsl(42 58% 58% / 0.2)',
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  {IconComponent ? (
                    <motion.div
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.3 }}
                    >
                      <IconComponent size={36} />
                    </motion.div>
                  ) : (
                    <span className="text-2xl font-bold text-primary">
                      {tool.name.charAt(0)}
                    </span>
                  )}
                </motion.div>
                <h4 className="text-sm font-medium mb-1 group-hover:text-primary transition-colors">
                  {tool.name}
                </h4>
                <p className="text-xs text-muted-foreground">{tool.category}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Tools;
