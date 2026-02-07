import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Send, Mail, MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import { fadeInUp, staggerContainer, defaultViewport } from "@/lib/animations";
import { bio, socialLinks } from "@/lib/data";
import { MagicCard } from "@/components/ui/MagicCard";
import { Linkedin, Video, Palette, Instagram } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Linkedin,
  Video,
  Palette,
  Instagram,
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-5deg", "5deg"]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate network request for the animation
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      window.location.href = `mailto:${bio.email}?subject=Portfolio Inquiry from ${formData.name}&body=${formData.message}`;

      // Reset after delay
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background Decorative Grids */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block px-3 py-1 mb-4 text-[10px] font-bold tracking-[0.2em] uppercase text-primary bg-primary/10 border border-primary/20 rounded-full backdrop-blur-sm"
          >
            Transmission
          </motion.span>
          <motion.h2 variants={fadeInUp} className="heading-lg">
            Initialize <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Connection</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-zinc-400 max-w-xl mx-auto mt-4 text-lg"
          >
            Ready to bring cinematic fidelity to your project? The channel is open.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">

          {/* LEFT: 3D Holographic Form */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="h-full relative perspective-1000"
            style={{ perspective: "1000px" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="h-full w-full relative"
            >
              <MagicCard
                className="h-full p-8 md:p-10 rounded-3xl border border-white/10 relative overflow-hidden group"
                gradientColor="#27272a"
                hoverColor="#CBA45F"
                borderWidth={2}
              >
                {/* Form Overlay for Success State */}
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9, z: 50 }}
                      animate={{ opacity: 1, scale: 1, z: 50 }}
                      exit={{ opacity: 0, scale: 0.9, z: 50 }}
                      style={{ transform: "translateZ(50px)" }}
                      className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-zinc-900/95 backdrop-blur-md text-center p-8"
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="w-20 h-20 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mb-6 border border-green-500/50"
                      >
                        <CheckCircle2 className="w-10 h-10" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-white mb-2">Transmission Sent</h3>
                      <p className="text-zinc-400">I'll get back to you within 24 hours.</p>
                      <button
                        onClick={() => setIsSuccess(false)}
                        className="mt-8 text-sm text-primary hover:text-white transition-colors uppercase tracking-widest font-medium"
                      >
                        Send Another
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-6 relative z-10"
                      initial={{ opacity: 1, z: 20 }}
                      exit={{ opacity: 0, filter: "blur(10px)", z: 20 }}
                      style={{ transform: "translateZ(20px)" }} // Parallax lift
                    >
                      <div className="group/field">
                        <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 block group-focus-within/field:text-primary transition-colors">
                          Identity / Name
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="peer w-full bg-zinc-950/50 border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-zinc-700"
                            placeholder="Enter your name"
                          />
                          <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 peer-focus:opacity-100 pointer-events-none transition-opacity duration-500" />
                        </div>
                      </div>

                      <div className="group/field">
                        <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 block group-focus-within/field:text-primary transition-colors">
                          Coordinates / Email
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="peer w-full bg-zinc-950/50 border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-zinc-700"
                            placeholder="name@example.com"
                          />
                          <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 peer-focus:opacity-100 pointer-events-none transition-opacity duration-500" />
                        </div>
                      </div>

                      <div className="group/field">
                        <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 block group-focus-within/field:text-primary transition-colors">
                          Transmission / Message
                        </label>
                        <div className="relative">
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            className="peer w-full bg-zinc-950/50 border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-zinc-700 resize-none"
                            placeholder="Describe your mission..."
                          />
                          <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 peer-focus:opacity-100 pointer-events-none transition-opacity duration-500" />
                        </div>
                      </div>

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full relative group overflow-hidden rounded-xl bg-white text-black font-bold py-4 px-6 flex items-center justify-center gap-3 active:scale-[0.98] transition-transform shadow-lg shadow-white/5"
                        whileHover={{ scale: 1.01 }}
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          {isSubmitting ? (
                            "Transmitting..."
                          ) : (
                            <>Send Signal <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" /></>
                          )}
                        </span>
                        <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </MagicCard>
            </motion.div>
          </motion.div>

          {/* RIGHT: Contact Info & Physics Orbs */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="flex flex-col justify-center space-y-10 lg:pl-10"
          >
            {/* Info Cards */}
            <div className="space-y-6">
              <motion.a
                variants={fadeInUp}
                href={`mailto:${bio.email}`}
                className="group flex items-center gap-6 p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
              >
                <div className="w-14 h-14 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-primary/50 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                  <Mail className="w-6 h-6 text-zinc-400 group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Direct Line</h4>
                  <p className="text-xl md:text-2xl font-medium text-white group-hover:text-primary transition-colors font-mono">{bio.email}</p>
                </div>
              </motion.a>

              <motion.div
                variants={fadeInUp}
                className="group flex items-center gap-6 p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
              >
                <div className="w-14 h-14 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-primary/50 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                  <MapPin className="w-6 h-6 text-zinc-400 group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Base of Operations</h4>
                  <p className="text-xl md:text-2xl font-medium text-white font-mono">{bio.location}</p>
                </div>
              </motion.div>
            </div>

            {/* Social Orbs */}
            <motion.div variants={fadeInUp} className="pt-8 border-t border-white/5">
              <h4 className="text-sm font-medium text-zinc-400 mb-6 flex items-center gap-2">
                Establish Uplink <ArrowRight className="w-4 h-4 opacity-50" />
              </h4>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, i) => {
                  const Icon = iconMap[social.icon];
                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="absolute inset-0 bg-primary blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                      <div className="relative w-16 h-16 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                        {Icon && <Icon className="w-6 h-6 relative z-10" />}

                        {/* Hover Fill */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
