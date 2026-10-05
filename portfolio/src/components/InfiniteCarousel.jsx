"use client"

import gsap from "@/libs/gsap"
import CarouselCard from "./CarouselCard"
import TextRevealScrub from "./TextRevealScrub"
import { useEffect, useRef } from "react"

const CARD_W = 300
const CARD_H = 420
const SCALE = 1.35
const CARD_GAP = 20

const DURATION = 25

const TRACK_H = CARD_H * SCALE

const InfiniteCarousel = ({ projects }) => {
    const trackRef = useRef(null)
    const tweenRef = useRef(null)

    useEffect(() => {
        const singleWidth = projects.length * (CARD_W + CARD_GAP)

        tweenRef.current = gsap.to(trackRef.current, {
            x: -singleWidth,
            ease: "none",
            duration: DURATION,
            repeat: -1,
        })

        return () => {
            tweenRef.current?.kill()
        }
    }, [projects])

    const doubled = [...projects, ...projects]

    return (
        <section className="relative w-full pt-5 bg-neutral-100">
            <div className="relative w-full select-none h-[14vw] overflow-hidden">
                {/* PORTFOLIO — scrubbed reveal */}
                <TextRevealScrub
                    scrollStart="top 90%"
                    scrollEnd="top 40%"
                    splitBy="chars"
                    duration={0.8}
                    stagger={0.04}
                    className="absolute inset-x-0 top-0 text-center text-[16vw] font-black leading-none tracking-tight text-neutral-200/70 pointer-events-none"
                >
                    PORTFOLIO
                </TextRevealScrub>

                {/* SELECTED WORK — scrubbed reveal */}
                <TextRevealScrub
                    scrollStart="top 90%"
                    scrollEnd="top 40%"
                    splitBy="words"
                    duration={0.7}
                    stagger={0.12}
                    delay={0.3}
                    className="absolute inset-x-0 bottom-[0%] z-10 text-center text-4xl md:text-6xl font-medium tracking-tight text-black"
                >
                    SELECTED WORK
                </TextRevealScrub>
            </div>

            <div
                style={{ padding: `${TRACK_H * 0.2}px 0 24px` }}
                className="overflow-hidden"
            >
                <div
                    ref={trackRef}
                    style={{
                        gap: `${CARD_GAP}px`,
                        width: "max-content",
                        height: `${TRACK_H}px`,
                    }}
                    className="track flex items-center"
                >
                    {doubled.map((project, i) => (
                        <CarouselCard
                            key={i}
                            project={project}
                            onHoverStart={() => tweenRef.current?.pause()}
                            onHoverEnd={() => tweenRef.current?.play()}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default InfiniteCarousel