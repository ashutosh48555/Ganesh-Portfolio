import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import React, { MouseEvent, useCallback, useEffect } from "react";

export interface MagicCardProps {
    children: React.ReactNode;
    className?: string;
    gradientSize?: number;
    gradientColor?: string;
    hoverColor?: string;
    opacity?: number;
    alwaysShow?: boolean;
    borderWidth?: number; // New prop for thickness
}

export const MagicCard = React.forwardRef<HTMLDivElement, MagicCardProps>(({
    children,
    className = "",
    gradientSize = 200,
    gradientColor = "#262626", // Default dark grey
    hoverColor = "#FFD700", // Gold/Primary default
    opacity = 1, // Default opacity for the effect
    alwaysShow = false,
    borderWidth = 2, // Default slightly thicker
}, ref) => {
    const mouseX = useMotionValue(-gradientSize);
    const mouseY = useMotionValue(-gradientSize);

    const handleMouseMove = useCallback(
        (e: MouseEvent<HTMLDivElement>) => {
            const { left, top } = e.currentTarget.getBoundingClientRect();
            mouseX.set(e.clientX - left);
            mouseY.set(e.clientY - top);
        },
        [mouseX, mouseY]
    );

    const handleMouseLeave = useCallback(() => {
        mouseX.set(-gradientSize);
        mouseY.set(-gradientSize);
    }, [gradientSize, mouseX, mouseY]);

    useEffect(() => {
        mouseX.set(-gradientSize);
        mouseY.set(-gradientSize);
    }, [gradientSize, mouseX, mouseY]);

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`group relative flex size-full overflow-hidden rounded-xl border border-white/10 bg-zinc-900/50 text-white backdrop-blur-sm ${className}`}
        >
            {/* Animated Border Beam (Conic Gradient Spin) */}
            <div
                className={`absolute inset-[-100%] z-0 animate-[spin_3s_linear_infinite] transition-opacity duration-500 will-change-transform ${alwaysShow ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
            >
                {/* Made gradient HOTTER and WIDER for visibility */}
                <div className="h-full w-full bg-[conic-gradient(from_0deg,transparent_0_300deg,#FFF_340deg,var(--primary)_360deg)]" />
            </div>

            {/* Inner Content Mask - Controlled by borderWidth */}
            <div
                className="absolute z-0 rounded-[inherit] bg-zinc-950/90"
                style={{ inset: `${borderWidth}px` }}
            />

            {/* Actual Content - z-10 ensures it sits on top of mask */}
            <div className="relative z-10 size-full rounded-[inherit]">{children}</div>

            {/* Spotlight Effect (Mouse Follow) */}
            <motion.div
                className="pointer-events-none absolute -inset-px z-10 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${hoverColor}, transparent 100%)
          `,
                    opacity: 0.15, // Subtle spotlight
                }}
            />
        </div>
    );
});

MagicCard.displayName = "MagicCard";
