import type { CSSProperties, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

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
  animationEase?: string;
  animationDuration?: number;
  staggerDelay?: number;
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
  animationEase = 'back.out(1.5)',
  animationDuration = 0.5,
  staggerDelay = 0.12
}: BubbleMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLAnchorElement[]>([]);
  const labelRefs = useRef<HTMLSpanElement[]>([]);

  const menuItems = items?.length ? items : DEFAULT_ITEMS;

  const handleToggle = () => {
    const nextState = !isMenuOpen;
    if (nextState) setShowOverlay(true);
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

  useEffect(() => {
    const overlay = overlayRef.current;
    const bubbles = bubblesRef.current.filter(Boolean);
    const labels = labelRefs.current.filter(Boolean);
    if (!overlay || !bubbles.length) return;

    if (isMenuOpen) {
      gsap.set(overlay, { display: 'flex' });
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.set(bubbles, { scale: 0, transformOrigin: '50% 50%' });
      gsap.set(labels, { y: 24, autoAlpha: 0 });

      bubbles.forEach((bubble, i) => {
        const delay = i * staggerDelay + gsap.utils.random(-0.05, 0.05);
        const tl = gsap.timeline({ delay });
        tl.to(bubble, {
          scale: 1,
          duration: animationDuration,
          ease: animationEase
        });
        if (labels[i]) {
          tl.to(
            labels[i],
            {
              y: 0,
              autoAlpha: 1,
              duration: animationDuration,
              ease: 'power3.out'
            },
            '-=' + animationDuration * 0.9
          );
        }
      });
    } else if (showOverlay) {
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.to(labels, {
        y: 24,
        autoAlpha: 0,
        duration: 0.2,
        ease: 'power3.in'
      });
      gsap.to(bubbles, {
        scale: 0,
        duration: 0.2,
        ease: 'power3.in',
        onComplete: () => {
          gsap.set(overlay, { display: 'none' });
          setShowOverlay(false);
        }
      });
    }
  }, [isMenuOpen, showOverlay, animationEase, animationDuration, staggerDelay]);

  useEffect(() => {
    const handleResize = () => {
      if (isMenuOpen) {
        const bubbles = bubblesRef.current.filter(Boolean);
        const isDesktop = window.innerWidth >= 900;
        bubbles.forEach((bubble, i) => {
          const item = menuItems[i];
          if (bubble && item) {
            const rotation = isDesktop ? (item.rotation ?? 0) : 0;
            gsap.set(bubble, { rotation });
          }
        });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen, menuItems]);

  return (
    <>
      <style>{`
        .bubble-menu .menu-line {
          transition: transform 0.3s ease, opacity 0.3s ease;
          transform-origin: center;
        }
        .bubble-menu-items .pill-list .pill-col:nth-child(4):nth-last-child(2) {
          margin-left: calc(100% / 6);
        }
        .bubble-menu-items .pill-list .pill-col:nth-child(4):last-child {
          margin-left: calc(100% / 3);
        }
        @media (min-width: 900px) {
          .bubble-menu-items .pill-link {
            transform: rotate(var(--item-rot));
          }
          .bubble-menu-items .pill-link:hover {
            transform: rotate(var(--item-rot)) scale(1.06);
            background: var(--hover-bg) !important;
            color: var(--hover-color) !important;
          }
          .bubble-menu-items .pill-link:active {
            transform: rotate(var(--item-rot)) scale(.94);
          }
        }
        @media (max-width: 899px) {
          .bubble-menu-items {
            padding-top: 120px;
            align-items: flex-start;
          }
          .bubble-menu-items .pill-list {
            row-gap: 16px;
          }
          .bubble-menu-items .pill-list .pill-col {
            flex: 0 0 100% !important;
            margin-left: 0 !important;
            overflow: visible;
          }
          .bubble-menu-items .pill-link {
            font-size: clamp(1.2rem, 3vw, 4rem);
            padding: clamp(1rem, 2vw, 2rem) 0;
            min-height: 80px !important;
          }
          .bubble-menu-items .pill-link:hover {
            transform: scale(1.06);
            background: var(--hover-bg);
            color: var(--hover-color);
          }
          .bubble-menu-items .pill-link:active {
            transform: scale(.94);
          }
        }
      `}</style>

      <div
        className={`bubble-menu ${useFixedPosition ? 'fixed' : 'absolute'} left-0 right-0 top-8 flex items-center justify-between gap-4 px-8 pointer-events-none z-[1001] ${className || ''}`}
        style={style}
      >
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          className="pointer-events-auto rounded-full px-5 py-3 font-bold text-lg transition-transform hover:scale-105"
          style={{ background: menuBg, color: menuContentColor }}
        >
          {typeof logo === 'string' ? (
            <span className="font-bold">{logo}</span>
          ) : (
            logo
          )}
        </a>

        <button
          onClick={handleToggle}
          aria-label={menuAriaLabel}
          className="pointer-events-auto w-14 h-14 rounded-full flex flex-col items-center justify-center gap-1.5 transition-transform hover:scale-105"
          style={{ background: menuBg }}
        >
          <span
            className="menu-line block w-6 h-0.5 rounded-full"
            style={{
              background: menuContentColor,
              transform: isMenuOpen ? 'rotate(45deg) translateY(4px)' : 'none'
            }}
          />
          <span
            className="menu-line block w-6 h-0.5 rounded-full"
            style={{
              background: menuContentColor,
              opacity: isMenuOpen ? 0 : 1
            }}
          />
          <span
            className="menu-line block w-6 h-0.5 rounded-full"
            style={{
              background: menuContentColor,
              transform: isMenuOpen ? 'rotate(-45deg) translateY(-4px)' : 'none'
            }}
          />
        </button>
      </div>

      {showOverlay && (
        <div
          ref={overlayRef}
          className="bubble-menu-items fixed inset-0 z-[1000] flex items-center justify-center p-8"
          style={{ 
            background: 'hsl(var(--background) / 0.95)', 
            backdropFilter: 'blur(20px)',
            display: 'none' 
          }}
        >
          <div className="pill-list flex flex-wrap justify-center items-center gap-6 max-w-4xl">
            {menuItems.map((item, idx) => (
              <div
                key={item.label}
                className="pill-col flex-shrink-0"
                style={{ flex: '0 0 calc(33.333% - 1.5rem)' }}
              >
                <a
                  href={item.href}
                  aria-label={item.ariaLabel}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  ref={(el) => {
                    if (el) bubblesRef.current[idx] = el;
                  }}
                  className="pill-link flex items-center justify-center rounded-full px-8 py-6 text-2xl md:text-3xl font-bold capitalize transition-all duration-300 cursor-pointer"
                  style={{
                    background: menuBg,
                    color: menuContentColor,
                    '--item-rot': `${item.rotation ?? 0}deg`,
                    '--hover-bg': item.hoverStyles?.bgColor || 'hsl(42 58% 58%)',
                    '--hover-color': item.hoverStyles?.textColor || '#ffffff',
                    minHeight: '100px'
                  } as CSSProperties}
                >
                  <span
                    ref={(el) => {
                      if (el) labelRefs.current[idx] = el;
                    }}
                  >
                    {item.label}
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
