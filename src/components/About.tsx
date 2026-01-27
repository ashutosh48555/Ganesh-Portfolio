import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, defaultViewport } from "@/lib/animations";
import { bio } from "@/lib/data";

const About = () => {
  return (
    <section id="about" className="section-padding bg-card/30">
      <div className="container mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Image */}
          <motion.div
            variants={fadeInUp}
            className="relative aspect-[4/5] rounded-lg overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
              alt="Ganesh - VFX Artist"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Decorative frame */}
            <div className="absolute inset-4 border border-primary/20 rounded-lg pointer-events-none" />
          </motion.div>

          {/* Content */}
          <motion.div variants={staggerContainer} className="space-y-6">
            <motion.span
              variants={fadeInUp}
              className="text-primary text-sm font-medium tracking-widest uppercase"
            >
              About Me
            </motion.span>

            <motion.h2 variants={fadeInUp} className="heading-lg">
              Passionate about realism and mood
            </motion.h2>

            <motion.div
              variants={fadeInUp}
              className="space-y-4 text-muted-foreground leading-relaxed"
            >
              {bio.description.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </motion.div>

            {/* Stats or highlights */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-2 gap-6 pt-6 border-t border-border/50"
            >
              <div>
                <p className="text-3xl font-bold text-foreground">5+</p>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">50+</p>
                <p className="text-sm text-muted-foreground">Projects Completed</p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="pt-4">
              <motion.a
                href="#portfolio"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors link-underline"
                whileHover={{ x: 5 }}
              >
                View my portfolio
                <span aria-hidden="true">→</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
