"use client"

import { useRef, useEffect } from "react"
import gsap from "@/libs/gsap"

const ScrollHighlightText = ({ text, className = "" }) => {
    const containerRef = useRef(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const chars = container.querySelectorAll("[data-char]")

        gsap.fromTo(
            chars,
            { color: "#3a3a3a", x: 0 },
            {
                color: "#ffffff",
                x: 3,
                ease: "none",
                stagger: {
                    each: 0.08,        
                    from: "start",
                },
                scrollTrigger: {
                    trigger: container,
                    start: "top 95%", 
                    end: "bottom 5%",
                    scrub: 1,
                },
            }
        )
    }, [])

    const words = text.split(" ")

    return (
        <p ref={containerRef} className={className}>
            {words.map((word, wordIdx) => (
                <span
                    key={wordIdx}
                    className="inline-block whitespace-nowrap mr-[0.25em]"
                >
                    {word.split("").map((char, charIdx) => (
                        <span key={charIdx} data-char className="inline-block">
                            {char}
                        </span>
                    ))}
                </span>
            ))}
        </p>
    )
}

export default ScrollHighlightText