"use client"

import { useEffect, useRef } from "react"
import gsap from "@/libs/gsap"

const FlowLines = () => {
    const svgRef = useRef(null)

    useEffect(() => {
        if (!svgRef.current) return

        const paths = svgRef.current.querySelectorAll("path")

        paths.forEach((path, i) => {
            const length = path.getTotalLength()
            const visible = length * 0.12
            const gap = length - visible

            gsap.set(path, {
                strokeDasharray: `${visible} ${gap}`,
                strokeDashoffset: 0,
            })

            gsap.to(path, {
                strokeDashoffset: -(length + visible),
                duration: 10 + i * 2,
                ease: "none",
                repeat: -1,
            })
        })
    }, [])

    return (
        <svg
            ref={svgRef}
            className="absolute inset-0 w-full h-full pointer-events-none -z-10"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
            stroke="white"
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.1"
        >
            <path d="M 0 150 Q 250 100 500 200 T 1000 150" />
            <path d="M 0 250 Q 300 350 550 250 T 1000 300" />
            <path d="M 0 400 C 200 300 400 500 600 400 S 900 300 1000 450" />
            <path d="M 0 550 Q 300 450 500 600 T 1000 550" />
            <path d="M 0 700 C 250 800 450 650 700 750 S 900 850 1000 700" />
            <path d="M 0 850 Q 250 750 500 900 T 1000 850" />
        </svg>
    )
}

export default FlowLines