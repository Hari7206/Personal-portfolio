"use client";

import gsap, { useGSAP } from "@/libs/gsap";
import { useRef } from "react";

const socials = [
    { label: "GitHub", href: "https://github.com/Hari7206" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/hari-thapa-67827835b/" },
    { label: "Instagram", href: "https://www.instagram.com/heaariii" },
    { label: "Email", href: "mailto:harithapa4654@gmail.com" },
];

const HeroSocials = ({ className = "" }) => {
    const socialsRef = useRef(null);

    useGSAP(
        () => {
            gsap.set(".hero-social-item", {
                y: 80,
                scale: 1,
                opacity: 0,
            });

            gsap.to(".hero-social-item", {
                y: 0,
                scale: 1,
                opacity: 1,
                duration: 0.8,
                delay: 1.3,
                ease: "power3.out",
                stagger: {
                    each: 0.08,
                    from: "end",
                },
            });
        },
        { scope: socialsRef }
    );

    return (
        <div ref={socialsRef} className={`flex flex-col gap-3 ${className}`}>
            {socials.map((s) => (
                <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                   className="hero-social-item inline-flex items-center justify-center rounded-full border border-neutral-300 px-7 py-3 text-sm text-neutral-700 hover:bg-black hover:text-white hover:border-black transition-colors"
                >
                    {s.label}
                </a>
            ))}
        </div>
    );
};

export default HeroSocials;