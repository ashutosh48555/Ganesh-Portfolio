import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

const MagneticChar = ({ children }: { children: string }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 200, mass: 0.5 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current!.getBoundingClientRect();
        const center = { x: left + width / 2, y: top + height / 2 };

        const distanceX = clientX - center.x;
        const distanceY = clientY - center.y;
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

        if (distance < 100) {
            const magnetStrength = 0.3;
            x.set(distanceX * magnetStrength);
            y.set(distanceY * magnetStrength);
        } else {
            x.set(0);
            y.set(0);
        }
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.span
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY, display: "inline-block" }}
            className="cursor-default hover:text-primary transition-colors duration-200"
        >
            {children === " " ? "\u00A0" : children}
        </motion.span>
    );
};

export const MagneticText = ({ children, className }: { children: string, className?: string }) => {
    return (
        <div className={`flex flex-wrap justify-center gap-[2px] ${className}`}>
            {children.split("").map((char, i) => (
                <MagneticChar key={i}>{char}</MagneticChar>
            ))}
        </div>
    );
};
