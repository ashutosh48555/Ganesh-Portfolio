import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const Cursor = () => {
    const [isPointer, setIsPointer] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 400 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };

        const checkPointer = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isHoveringPointer = window.getComputedStyle(target).cursor === "pointer";
            const isHoveringLink = target.tagName === "A" || target.tagName === "BUTTON";
            setIsPointer(isHoveringPointer || isHoveringLink);
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", checkPointer);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", checkPointer);
        };
    }, [cursorX, cursorY]);

    return (
        <>
            {/* Main Dot */}
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 rounded-full bg-primary pointer-events-none z-[9999] mix-blend-difference hidden md:block"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                }}
            />

            {/* Outer Ring / Spotlight */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary pointer-events-none z-[9998] hidden md:block"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: -8, // Center relative to dot (16px size vs 32px size offset difference)
                    translateY: -8,
                }}
                animate={{
                    scale: isPointer ? 1.5 : 1,
                    opacity: isPointer ? 1 : 0.5,
                    backgroundColor: isPointer ? "rgba(203, 164, 95, 0.1)" : "transparent",
                }}
                transition={{ duration: 0.15 }}
            />
        </>
    );
};

export default Cursor;
