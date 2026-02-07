import { useRef, useState } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

interface LiquidHoverProps {
    imageSrc: string;
    alt: string;
    className?: string;
    intensity?: number;
}

const LiquidHover = ({ imageSrc, alt, className, intensity = 0.4 }: LiquidHoverProps) => {
    // We'll use a potent SVG filter effect for the liquid distortion
    const idRef = useRef(`liquid-filter-${Math.random().toString(36).substr(2, 9)}`);

    // Motion values for the turbulent displacement
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Create smooth spring-based movement for the distortion origin
    const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const [isHovered, setIsHovered] = useState(false);

    // Map mouse position to turbulence frequency/scale
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Normalize -1 to 1
        const xPct = (mouseX / rect.width - 0.5) * 2;
        const yPct = (mouseY / rect.height - 0.5) * 2;

        x.set(xPct * 50); // Move distortion focus
        y.set(yPct * 50);
    };

    return (
        <div
            className={`relative overflow-hidden ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                x.set(0);
                y.set(0);
            }}
            onMouseMove={handleMouseMove}
        >
            <svg className="hidden">
                <defs>
                    <filter id={idRef.current}>
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency={isHovered ? "0.01 0.04" : "0 0"}
                            numOctaves="2"
                            result="noise"
                        >
                            {/* Only animate when hovered to save CPU */}
                            {isHovered && (
                                <animate
                                    attributeName="baseFrequency"
                                    dur="4s"
                                    values="0.01 0.04; 0.02 0.05; 0.01 0.04"
                                    repeatCount="indefinite"
                                />
                            )}
                        </feTurbulence>
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="noise"
                            scale={isHovered ? 20 : 0}
                            xChannelSelector="R"
                            yChannelSelector="G"
                        />
                    </filter>
                </defs>
            </svg>

            <motion.img
                src={imageSrc}
                alt={alt}
                className="w-full h-full object-cover"
                style={{
                    // Using CSS filter instead of direct style prop to reference the SVG filter
                    filter: isHovered ? `url(#${idRef.current}) brightness(1.1)` : "none",
                    transition: "filter 0.2s ease-out"
                }}
                animate={{
                    scale: isHovered ? 1.05 : 1,
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Glitch Overlay layers */}
            {isHovered && (
                <>
                    <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" style={{ transform: "translate(2px, 0)" }} />
                    <div className="absolute inset-0 bg-blue-500/20 mix-blend-overlay" style={{ transform: "translate(-2px, 0)" }} />
                </>
            )}
        </div>
    );
};

export default LiquidHover;
