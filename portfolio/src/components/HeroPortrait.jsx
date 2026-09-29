"use client";

import gsap, { useGSAP } from "@/libs/gsap";
import { useRef } from "react";

const HeroPortrait = ({
    src,
    alt = "Portrait",
    className = "",
    duration = 1.0,
    delay = 2.0,
    ease = "power2.inOut",
}) => {
    const wrapperRef = useRef(null);
    const colorLayerRef = useRef(null);
    const wipeTweenRef = useRef(null);

    useGSAP(
        () => {
            const colorLayer = colorLayerRef.current;

            // 1. Start state: mask fully hides the color layer.
            //    Gradient stops both on the left edge → nothing visible.
            gsap.set(colorLayer, {
                "--mask-pos": "0%",
            });

            // 2. Entrance: whole portrait rises from below.
            gsap.from(wrapperRef.current, {
                y: 140,
                scale: 0.7,
                transformOrigin: "bottom center",
                opacity: 0,
                duration: 1.3,
                delay,
                ease: "power3.out",
            });

            // 3. Hover tween: sweep the gradient stop across the width.
            //    Paused until mouseenter.
            wipeTweenRef.current = gsap.to(colorLayer, {
                "--mask-pos": "130%",
                duration,
                ease,
                paused: true,
            });

            // 4. Cleanup
            return () => {
                wipeTweenRef.current?.kill();
            };
        },
        { scope: wrapperRef }
    );

    return (
        <div
            ref={wrapperRef}
            className={`relative cursor-pointer select-none ${className}`}
            onMouseEnter={() => wipeTweenRef.current?.play()}
            onMouseLeave={() => wipeTweenRef.current?.reverse()}
        >
            {/* Bottom layer — grayscale, always visible */}
            <img
                src={src}
                alt={alt}
                className="block w-full h-full object-contain grayscale"
                draggable={false}
            />

            {/* Top layer — same image in color, revealed by animated mask */}
            <img
                ref={colorLayerRef}
                src={src}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-contain hero-mask"
                draggable={false}
            />
        </div>
    );
};

export default HeroPortrait;