import type { CSSProperties, ReactNode } from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type MenuItem = {
  label: string;
  href: string;
  ariaLabel?: string;
  rotation?: number;
  hoverStyles?: {
    bgColor?: string;
    textColor?: string;
  };
};

export type BubbleMenuProps = {
  logo: ReactNode | string;
  onMenuClick?: (open: boolean) => void;
  className?: string;
  style?: CSSProperties;
  menuAriaLabel?: string;
  menuBg?: string;
  menuContentColor?: string;
  useFixedPosition?: boolean;
  items?: MenuItem[];
};

const DEFAULT_ITEMS: MenuItem[] = [
  {
    label: 'home',
    href: '#home',
    ariaLabel: 'Home',
    rotation: -8,
    hoverStyles: { bgColor: 'hsl(42 58% 58%)', textColor: '#ffffff' }
  },
  {
    label: 'about',
    href: '#about',
    ariaLabel: 'About',
    rotation: 8,
    hoverStyles: { bgColor: 'hsl(42 58% 48%)', textColor: '#ffffff' }
  },
  {
    label: 'skills',
    href: '#skills',
    ariaLabel: 'Skills',
    rotation: -5,
    hoverStyles: { bgColor: 'hsl(42 58% 55%)', textColor: '#ffffff' }
  },
  {
    label: 'portfolio',
    href: '#portfolio',
    ariaLabel: 'Portfolio',
    rotation: 8,
    hoverStyles: { bgColor: 'hsl(42 58% 50%)', textColor: '#ffffff' }
  },
  {
    label: 'contact',
    href: '#contact',
    ariaLabel: 'Contact',
    rotation: -8,
    hoverStyles: { bgColor: 'hsl(42 58% 45%)', textColor: '#ffffff' }
  }
];

export default function BubbleMenu({
  logo,
  onMenuClick,
  className,
  style,
  menuAriaLabel = 'Toggle menu',
  menuBg = 'hsl(var(--card))',
  menuContentColor = 'hsl(var(--foreground))',
  useFixedPosition = true,
  items,
}: BubbleMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = items?.length ? items : DEFAULT_ITEMS;

  const handleToggle = () => {
    const nextState = !isMenuOpen;
    setIsMenuOpen(nextState);
    onMenuClick?.(nextState);
  };

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <>
      <div
        className={`bubble-menu ${useFixedPosition ? 'fixed' : 'absolute'} left-0 right-0 top-6 flex items-center justify-between gap-4 px-6 pointer-events-none z-[1001] ${className || ''}`}
        style={style}
      >
        {/* Minimal text logo - no background box */}
        <motion.a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          className="pointer-events-auto font-bold text-xl tracking-tighter text-foreground hover:text-primary transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {typeof logo === 'string' ? logo : logo}
        </motion.a>

        {/* Hamburger menu button */}
        <motion.button
          onClick={handleToggle}
          aria-label={menuAriaLabel}
          className="pointer-events-auto w-12 h-12 rounded-full flex flex-col items-center justify-center gap-1.5 border border-border/50 backdrop-blur-sm"
          style={{ background: `${menuBg}/80` }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className="block w-5 h-0.5 rounded-full bg-foreground"
            animate={{
              rotate: isMenuOpen ? 45 : 0,
              y: isMenuOpen ? 4 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block w-5 h-0.5 rounded-full bg-foreground"
            animate={{ opacity: isMenuOpen ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block w-5 h-0.5 rounded-full bg-foreground"
            animate={{
              rotate: isMenuOpen ? -45 : 0,
              y: isMenuOpen ? -4 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-8"
            style={{ 
              background: 'hsl(var(--background) / 0.98)', 
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="flex flex-wrap justify-center items-center gap-6 max-w-4xl">
              {menuItems.map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ scale: 0, opacity: 0, y: 50 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0, opacity: 0, y: 20 }}
                  transition={{ 
                    duration: 0.5,
                    delay: idx * 0.08,
                    type: "spring",
                    stiffness: 200,
                    damping: 15
                  }}
                  className="flex-shrink-0"
                  style={{ flex: '0 0 calc(33.333% - 1.5rem)' }}
                >
                  <motion.a
                    href={item.href}
                    aria-label={item.ariaLabel}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className="flex items-center justify-center rounded-full px-8 py-6 text-2xl md:text-3xl font-bold capitalize cursor-pointer border border-border/30"
                    style={{
                      background: 'hsl(var(--card) / 0.8)',
                      color: menuContentColor,
                      minHeight: '100px',
                      rotate: `${item.rotation ?? 0}deg`,
                    }}
                    whileHover={{ 
                      scale: 1.06,
                      backgroundColor: item.hoverStyles?.bgColor || 'hsl(42 58% 58%)',
                      color: item.hoverStyles?.textColor || '#ffffff',
                      borderColor: 'transparent',
                    }}
                    whileTap={{ scale: 0.94 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
