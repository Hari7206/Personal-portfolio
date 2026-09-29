"use client";

import gsap, { SplitText, useGSAP } from "@/libs/gsap";
import { useRef } from "react";

const HeroName = ({
    children,
    className = "",
    duration = 1.1,
    stagger = 0.06,
    delay = 0.2,
    ease = "power4.out",
}) => {
    const wrapperRef = useRef(null);
    const splitRef = useRef(null);

    useGSAP(
        () => {
            // 1. Chop the text into individual lines (each wrapped in a <span>)
            splitRef.current = new SplitText(wrapperRef.current, {
                type: "lines",
            });

            const lines = splitRef.current.lines;

            // 2. Hide the lines ABOVE the visible area (top → down reveal)
            gsap.set(lines, {
                yPercent: -110,
            });

            // 3. Animate them down into place
            gsap.to(lines, {
                yPercent: 0,
                duration,
                delay,
                ease,
                stagger: {
                    each: stagger,
                    from: "start",
                },
            });

            // 4. Cleanup when component unmounts
            return () => {
                splitRef.current?.revert();
            };
        },
        { scope: wrapperRef }
    );

    return (
        <div ref={wrapperRef} className={`overflow-hidden ${className}`}>
            {children}
        </div>
    );
};

export default HeroName;