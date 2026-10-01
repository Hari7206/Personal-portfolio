"use client";

import gsap, { useGSAP } from "@/libs/gsap";
import { useRef } from "react";
import LetterSwapText from "./LetterSwapText";

const HeroPanel = ({ className = "" }) => {
    const panelRef = useRef(null);

    useGSAP(
        () => {
            gsap.set(".hero-panel-item", {
                y: 60,
                opacity: 0,
            });

            gsap.to(".hero-panel-item", {
                y: 0,
                opacity: 1,
                duration: 0.9,
                delay: 1.0,
                ease: "power3.out",
                stagger: 0.12,
            });
        },
        { scope: panelRef }
    );

    return (
        <div ref={panelRef} className={className}>
            <h2 className="hero-panel-item text-2xl font-semibold tracking-tight">
                Full Stack Developer
            </h2>

            <p className="hero-panel-item mt-3 text-sm text-neutral-500 leading-relaxed max-w-xs">
                Building scalable MERN apps with real-time features,
                AI integrations, and clean, user-focused interfaces.
            </p>

            <a
                href="mailto:harithapa4654@gmail.com"
                className="hero-panel-item mt-6 inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm text-white hover:bg-neutral-800 transition-colors"
            >
                <LetterSwapText
                    text="Let's collaborate"
                    revealDelay={1.6}
                    revealDuration={0.6}
                    revealStagger={0.06}
                />
                <span aria-hidden="true" className="shrink-0">↗</span>
            </a>
        </div>
    );
};

export default HeroPanel;