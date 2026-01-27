import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, defaultViewport, scaleIn } from "@/lib/animations";
import { tools } from "@/lib/data";

const Tools = () => {
  return (
    <section className="section-padding bg-card/30">
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
          {tools.map((tool) => (
            <motion.div
              key={tool.name}
              variants={scaleIn}
              whileHover={{ y: -5, scale: 1.02 }}
              className="card-cinematic p-6 text-center group cursor-default"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-secondary/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <span className="text-xl font-bold text-primary">
                  {tool.name.charAt(0)}
                </span>
              </div>
              <h4 className="text-sm font-medium mb-1">{tool.name}</h4>
              <p className="text-xs text-muted-foreground">{tool.category}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Tools;
