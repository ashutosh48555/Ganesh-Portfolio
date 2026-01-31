import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CinematicFrameProps {
    children: React.ReactNode;
    /** Color of the animated border stroke */
    color?: string;
    /** Gap between image and border in pixels */
    frameGap?: number;
    /** Border radius of the inner image container */
    imageRadius?: number;
    /** Additional class for the outer container */
    className?: string;
}

/**
 * CinematicFrame - A premium, physically separated animated border.
 * 
 * Architecture:
 * - The SVG border lives in its own layer OUTSIDE the image bounds
 * - The image container has overflow:hidden - the border NEVER touches image pixels
 * - Animation is subtle, slow, and cinematic (not flashy)
 */
const CinematicFrame: React.FC<CinematicFrameProps> = ({
    children,
    color = '#CBA45F',
    frameGap = 10,
    imageRadius = 20,
    className = '',
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    // Track container size for SVG viewBox
    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const { width, height } = containerRef.current.getBoundingClientRect();
                setDimensions({ width, height });
            }
        };

        updateDimensions();
        const observer = new ResizeObserver(updateDimensions);
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Frame geometry - sits OUTSIDE the image
    const frameRadius = imageRadius + (frameGap / 2); // Perfectly concentric radius
    const strokeWidth = 1.5;
    const perimeter = 2 * (dimensions.width + dimensions.height) + 2 * Math.PI * frameRadius;

    return (
        <div
            ref={containerRef}
            className={`relative ${className}`}
            style={{ padding: `${frameGap}px` }}
        >
            {/* LAYER 1: SVG Frame - Lives OUTSIDE image bounds */}
            <svg
                className="absolute inset-0 pointer-events-none z-10"
                width="100%"
                height="100%"
                viewBox={`0 0 ${dimensions.width || 100} ${dimensions.height || 100}`}
                preserveAspectRatio="none"
                style={{ overflow: 'visible' }}
            >
                <defs>
                    {/* Subtle glow filter */}
                    <filter id="frame-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Static base stroke (always visible, low opacity) */}
                <rect
                    x={frameGap / 2}
                    y={frameGap / 2}
                    width={Math.max(0, dimensions.width - frameGap)}
                    height={Math.max(0, dimensions.height - frameGap)}
                    rx={frameRadius}
                    ry={frameRadius}
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    opacity={0.25}
                />

                {/* Multiple staggered animated strokes for seamless continuous motion */}
                {[0, 1, 2].map((index) => (
                    <motion.rect
                        key={index}
                        x={frameGap / 2}
                        y={frameGap / 2}
                        width={Math.max(0, dimensions.width - frameGap)}
                        height={Math.max(0, dimensions.height - frameGap)}
                        rx={frameRadius}
                        ry={frameRadius}
                        fill="none"
                        stroke={color}
                        strokeWidth={strokeWidth * 1.5}
                        strokeLinecap="round"
                        filter="url(#frame-glow)"
                        opacity={0.4}
                        strokeDasharray={`${perimeter * 0.12} ${perimeter * 0.88}`}
                        initial={{ strokeDashoffset: -perimeter * (index / 3) }}
                        animate={{ strokeDashoffset: -perimeter * (1 + index / 3) }}
                        transition={{
                            duration: 10,
                            ease: 'linear',
                            repeat: Infinity,
                        }}
                    />
                ))}
            </svg>

            {/* LAYER 2: Static subtle glow behind the frame */}
            <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                    boxShadow: `0 0 30px ${color}20, inset 0 0 1px ${color}40`,
                    borderRadius: `${frameRadius + frameGap / 2}px`,
                }}
            />

            {/* LAYER 3: Image Container - overflow:hidden ensures no bleed */}
            <div
                className="relative z-20 h-full overflow-hidden bg-zinc-900/50 backdrop-blur-sm"
                style={{ borderRadius: `${imageRadius}px` }}
            >
                {children}
            </div>
        </div>
    );
};

export default CinematicFrame;
