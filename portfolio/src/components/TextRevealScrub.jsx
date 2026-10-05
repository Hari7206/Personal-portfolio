"use client"

import gsap, { ScrollTrigger, SplitText, useGSAP } from '@/libs/gsap'
import { forwardRef, useRef, useImperativeHandle } from "react"

const TextRevealScrub = forwardRef(
    (
        {
            children,
            className = "",
            scrollStart = "top 90%",
            scrollEnd = "top 40%",
            splitBy = "lines",
            duration = 0.67,
            stagger = 0.085,
            delay = 0,
            ease = "power3.out",
        },
        ref,
    ) => {
        const wrapperRef = useRef(null)
        const splitRef = useRef(null)
        const tlRef = useRef(null)

        useImperativeHandle(ref, () => ({
            play: () => tlRef.current?.play(),
            reverse: () => tlRef.current?.reverse(),
            reset: () => tlRef.current?.pause(0),
        }))

        useGSAP(() => {
            splitRef.current = new SplitText(wrapperRef.current, {
                type: splitBy,
                lineThreshold: 0.1,
            })

            const elements = splitRef.current[splitBy]

            gsap.set(elements, { yPercent: 110 })

            tlRef.current = gsap.timeline({
                paused: true,
                defaults: { delay },
            })

            tlRef.current.to(elements, {
                yPercent: 0,
                opacity: 1,
                duration,
                ease,
                stagger: {
                    each: stagger,
                    from: "start",
                },
            })

            // ─── Scrub: scroll down = play, scroll up = reverse ───
            ScrollTrigger.create({
                trigger: wrapperRef.current,
                start: scrollStart,
                end: scrollEnd,
                scrub: 1,
                animation: tlRef.current,
            })

            return () => {
                tlRef.current?.kill()
                splitRef.current?.revert()
            }
        }, {
            scope: wrapperRef,
            dependencies: [splitBy, stagger, duration, scrollStart, scrollEnd],
        })

        return (
            <div ref={wrapperRef} className={`overflow-hidden ${className}`}>
                {children}
            </div>
        )
    },
)

TextRevealScrub.displayName = "TextRevealScrub"

export default TextRevealScrub