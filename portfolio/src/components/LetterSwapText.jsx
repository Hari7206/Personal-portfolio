"use client"

import { useRef, useEffect } from "react"
import gsap from "@/libs/gsap"

const LetterSwapText = ({
    text,
    className = "",
    revealDuration = 0.67,
    revealStagger = 0.085,
    revealDelay = 0,
    revealEase = "power3.out",
    hoverDuration = 0.5,
    hoverStagger = 0.04,
}) => {
    const containerRef = useRef(null)

    useEffect(() => {
        const words = containerRef.current.querySelectorAll("[data-word]")

        gsap.set(words, { yPercent: 110 })

        gsap.to(words, {
            yPercent: 0,
            duration: revealDuration,
            ease: revealEase,
            stagger: {
                each: revealStagger,
                from: "start",
            },
            delay: revealDelay,
        })
    }, [revealDuration, revealStagger, revealDelay, revealEase])

    const handleEnter = () => {
        const stacks = containerRef.current.querySelectorAll("[data-stack]")
        gsap.to(stacks, {
            xPercent: -50,
            duration: hoverDuration,
            ease: "power3.out",
            stagger: hoverStagger,
            overwrite: true,
        })
    }

    const handleLeave = () => {
        const stacks = containerRef.current.querySelectorAll("[data-stack]")
        gsap.to(stacks, {
            xPercent: 0,
            duration: hoverDuration,
            ease: "power3.out",
            stagger: hoverStagger,
            overwrite: true,
        })
    }

    const words = text.split(" ")

    return (
        <span
            ref={containerRef}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            className={`inline-flex gap-[0.25em] cursor-pointer overflow-hidden ${className}`}
        >
            {words.map((word, wordIdx) => (
                <span
                    key={wordIdx}
                    data-word
                    className="inline-block will-change-transform"
                >
                    {word.split("").map((char, charIdx) => (
                        <span
                            key={charIdx}
                            className="relative inline-block overflow-hidden align-bottom"
                        >
                            <span className="invisible">{char}</span>

                            <span
                                data-stack
                                className="absolute top-0 left-0 flex whitespace-nowrap"
                                style={{ width: "200%" }}
                            >
                                <span className="w-1/2">{char}</span>
                                <span className="w-1/2">{char}</span>
                            </span>
                        </span>
                    ))}
                </span>
            ))}
        </span>
    )
}

export default LetterSwapText