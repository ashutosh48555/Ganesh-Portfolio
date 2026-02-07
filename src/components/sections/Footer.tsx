import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { navLinks, bio } from "@/lib/data";
import { fadeInUp, staggerContainer, defaultViewport } from "@/lib/animations";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="py-12 px-6 border-t border-border/50">
      <div className="container mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          {/* Logo & Copyright */}
          <motion.div variants={fadeInUp} className="text-center md:text-left">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#home");
              }}
              className="text-2xl font-bold tracking-tighter text-foreground hover:text-primary transition-colors"
            >
              GANESH
            </a>
            <p className="text-sm text-muted-foreground mt-2">
              © {currentYear} {bio.name}. All rights reserved.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.nav variants={fadeInUp}>
            <ul className="flex flex-wrap justify-center gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors link-underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Made with love */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-1 text-sm text-muted-foreground"
          >
            Made with <Heart className="w-4 h-4 text-primary fill-primary" /> for cinema
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
