import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, defaultViewport, scaleIn } from "@/lib/animations";
import { MagicCard } from "@/components/ui/MagicCard";
import CinematicFrame from "@/components/ui/CinematicFrame";

const About = () => {
  return (
    <section id="about" className="section-padding relative overflow-visible">

      {/* ... keeping background ... */}
      <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]"
        >
          {/* 1. Profile Card with CINEMATIC FRAME */}
          <motion.div
            variants={scaleIn}
            className="md:col-span-1 md:row-span-2 relative h-full"
          >
            {/* 
              CinematicFrame Architecture:
              - SVG border lives OUTSIDE image bounds (never overlaps)
              - frameGap: 12px separation between image and border
              - imageRadius: 20px for the inner image container
            */}
            <CinematicFrame
              color="#CBA45F"
              frameGap={12}
              imageRadius={20}
              className="h-full w-full"
            >
              {/* .image-inner - This is the protected image zone */}
              <div className="relative w-full h-full min-h-[400px]">
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 pointer-events-none" />

                {/* Subtle scanline effect (stays INSIDE the image container) */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-[30%] bg-gradient-to-b from-transparent via-primary/5 to-transparent z-5 pointer-events-none"
                  animate={{ top: ["-30%", "130%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />

                {/* The actual image */}
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                  alt="Ganesh Profile"
                  className="w-full h-full object-cover select-none pointer-events-none"
                />

                {/* Text overlay - inside image container, on top */}
                <div className="absolute bottom-6 left-6 z-20">
                  <motion.div
                    variants={fadeInUp}
                    className="inline-block px-3 py-1 mb-3 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30"
                  >
                    <span className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase">
                      VFX Artist
                    </span>
                  </motion.div>
                  <motion.h3
                    variants={fadeInUp}
                    className="text-3xl font-bold text-white leading-none mb-1"
                  >
                    Ganesh
                  </motion.h3>
                  <motion.p variants={fadeInUp} className="text-zinc-400 text-sm">
                    Based in India, working Globally.
                  </motion.p>
                </div>
              </div>
            </CinematicFrame>
          </motion.div>

          {/* 2. Vision Statement (Wide - Top Right) - More Detailed */}
          <motion.div
            variants={fadeInUp}
            className="md:col-span-2 h-full"
          >
            <MagicCard className="p-8 md:p-10 rounded-3xl flex flex-col justify-center gap-6" gradientColor="#3f3f46">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1]">
                  Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Reality</span> from Pixels.
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8 text-zinc-400 leading-relaxed text-sm md:text-base border-t border-white/5 pt-6">
                <p>
                  I don't just add effects; I build immersive worlds. For over 5 years, I've lived at the intersection of <strong>Technical Precision</strong> and <strong>Artistic Chaos</strong>. My obsession is the "invisible" VFX—the details you *feel* but don't see.
                </p>
                <p>
                  From simulating complex fluid dynamics in Houdini to compositing seamless environments in Nuke, I bring a filmmaker's eye to digital problem solving. I create visuals that compel the audience to believe, not just watch.
                </p>
              </div>
            </MagicCard>
          </motion.div>

          {/* 3. Stats (Square - Middle Right) */}
          <motion.div variants={scaleIn}>
            <MagicCard className="p-8 rounded-3xl flex flex-col justify-center items-start" hoverColor="#F59E0B">
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold text-white group-hover:text-primary transition-colors duration-300">5+</span>
                <span className="text-sm text-zinc-500 font-medium uppercase tracking-wider">Years</span>
              </div>
              <p className="text-zinc-400 text-sm mt-3">
                Mastering the pipeline from Pre-vis to Final Render.
              </p>
            </MagicCard>
          </motion.div>

          {/* 4. Projects Stat (Square - Bottom Right) */}
          <motion.div variants={scaleIn}>
            <MagicCard className="p-8 rounded-3xl flex flex-col justify-center items-start" hoverColor="#EC4899">
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold text-white group-hover:text-primary transition-colors duration-300">50+</span>
                <span className="text-sm text-zinc-500 font-medium uppercase tracking-wider">Projects</span>
              </div>
              <p className="text-zinc-400 text-sm mt-3">
                Delivered high-end shots for Film, Ads & Games.
              </p>
            </MagicCard>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default About;
