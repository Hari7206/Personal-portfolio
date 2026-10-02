"use client"

import { useRef, useEffect } from "react"
import gsap from "@/libs/gsap"

const items = [
  "JavaScript (ES6+)",
  "Java",
  "HTML5",
  "CSS3",
  "React",
  "Tailwind CSS",
  "SCSS",
  "Responsive Design",
  "Node.js",
  "Express.js",
  "MongoDB",
  "MySQL ",
  "Redis",
  "Git",
  "GitHub",
  "Vercel",
]

const AboutTicker = () => {
    const trackRef = useRef(null)
    const tweenRef = useRef(null)

    useEffect(() => {
        const track = trackRef.current
        if (!track) return

        const singleWidth = track.scrollWidth / 4

        tweenRef.current = gsap.to(track, {
            x: -singleWidth,
            duration: 30,
            ease: "none",
            repeat: -1,
        })

        return () => tweenRef.current?.kill()
    }, [])

    const repeated = [...items, ...items, ...items, ...items]

    return (
        <div className="w-full h-16 md:h-20 bg-black text-white overflow-hidden flex items-center">
            <div
                ref={trackRef}
                className="flex items-center gap-6 md:gap-10 whitespace-nowrap will-change-transform"
            >
                {repeated.map((item, i) => (
                    <div key={i} className="flex items-center gap-6 md:gap-10">
                        <span className="text-2xl md:text-5xl font-black uppercase tracking-tight">
                            {item}
                        </span>
                        <StarIcon />
                    </div>
                ))}
            </div>
        </div>
    )
}

const StarIcon = () => (
    <svg
        viewBox="0 0 24 24"
        className="w-6 h-6 md:w-8 md:h-8 text-white shrink-0"
        fill="currentColor"
    >
        <path d="M12 0 L13.5 9 L22 6 L15 12 L22 18 L13.5 15 L12 24 L10.5 15 L2 18 L9 12 L2 6 L10.5 9 Z" />
    </svg>
)

export default AboutTicker