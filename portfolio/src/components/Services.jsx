"use client"

import gsap, { useGSAP } from "@/libs/gsap"
import { useRef, useState } from "react"
import { services } from "@/data/services"
import TextRevealScrub from "./TextRevealScrub"

const Services = () => {
    const containerRef = useRef(null)
    const barRef = useRef(null)
    const rowRefs = useRef([])
    const windowRef = useRef(null)
    const stripRef = useRef(null)
    const prevIndexRef = useRef(0)
    const [activeIndex, setActiveIndex] = useState(0)

    useGSAP(() => {
        const firstRow = rowRefs.current[0]
        if (firstRow && barRef.current) {
            gsap.set(barRef.current, {
                y: firstRow.offsetTop,
                height: firstRow.offsetHeight,
            })
        }

        const windowH = windowRef.current.offsetHeight
        Array.from(stripRef.current.children).forEach((img) => {
            img.style.height = `${windowH}px`
        })

        const handleResize = () => {
            const newH = windowRef.current.offsetHeight
            Array.from(stripRef.current.children).forEach((img) => {
                img.style.height = `${newH}px`
            })
            gsap.set(stripRef.current, { y: -prevIndexRef.current * newH })
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, { scope: containerRef })

    const handleHover = (index) => {
        if (index === activeIndex) return

        const prevIndex = prevIndexRef.current
        const targetRow = rowRefs.current[index]

        setActiveIndex(index)

        gsap.to(barRef.current, {
            y: targetRow.offsetTop,
            height: targetRow.offsetHeight,
            duration: 0.45,
            ease: "power3.out",
        })

        const windowH = windowRef.current.offsetHeight
        gsap.to(stripRef.current, {
            y: -index * windowH,
            duration: 0.8,
            ease: "power3.inOut",
        })

        prevIndexRef.current = index
    }

    return (
        <section
            ref={containerRef}
            className="relative w-full bg-neutral-100 py-32 px-6 md:px-12"
        >
            {/* ─── Heading with scrubbed reveal ──────────────── */}
            <div className="relative w-full mb-16 select-none">
                <TextRevealScrub
                    scrollStart="top 95%"
                    scrollEnd="top 50%"
                    splitBy="chars"
                    duration={0.6}
                    stagger={0.03}
                    className="text-center text-[8vw] font-black leading-none tracking-tight text-neutral-200/70 pointer-events-none"
                >
                    HOW I CAN HELP YOU
                </TextRevealScrub>

                <div className="absolute inset-x-0 top-[-10%] right-[7%] flex justify-end pointer-events-none">
                    <TextRevealScrub
                        scrollStart="top 95%"
                        scrollEnd="top 50%"
                        splitBy="chars"
                        duration={0.5}
                        stagger={0.05}
                        delay={0.2}
                        className="text-right text-4xl md:text-3xl tracking-widest text-neutral-500"
                    >
                        (SERVICES)
                    </TextRevealScrub>
                </div>
            </div>

            {/* ─── Two columns ─────────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-stretch">

                {/* LEFT — service list (static text, no scrub) */}
                <div className="md:col-span-6 relative">
                    <div
                        ref={barRef}
                        className="absolute left-0 top-0 w-[3px] bg-black"
                    />

                    {services.map((service, i) => (
                        <div
                            key={service.number}
                            ref={(el) => (rowRefs.current[i] = el)}
                            onMouseEnter={() => handleHover(i)}
                            className={`relative cursor-pointer pl-8 pr-4 py-8 border-b border-neutral-200 transition-colors duration-300
                                ${i === 0 ? "border-t border-neutral-200" : ""}
                                ${activeIndex === i ? "text-black" : "text-neutral-300"}`}
                        >
                            <span className="block text-sm text-neutral-400 mb-2">
                                ({service.number})
                            </span>
                            <h3 className="text-3xl md:text-5xl font-medium tracking-tight whitespace-nowrap">
                                {service.title}
                            </h3>
                        </div>
                    ))}
                </div>

                {/* RIGHT — filmstrip window */}
                <div className="md:col-span-6 h-full">
                    <div
                        ref={windowRef}
                        className="relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden"
                    >
                        <div
                            ref={stripRef}
                            className="absolute inset-x-0 top-0 flex flex-col"
                        >
                            {services.map((service, i) => (
                                <img
                                    key={service.number}
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full object-cover block"
                                    draggable={false}
                                />
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Services