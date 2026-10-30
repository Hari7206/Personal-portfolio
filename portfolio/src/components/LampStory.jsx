"use client"

import { useEffect, useRef, useState } from "react"
import gsap, { ScrollTrigger } from "@/libs/gsap"

const ACCENT = "#A3E635"

// Updated text to read like your personal work process
const STAGES = [
    { title: "Idea", text: "Every project starts with a blank canvas: a problem to solve, a sketch on paper, or a requirement I need to bring to life." },
    { title: "Architecture", text: "Before writing code, I map out the database and the API. I ensure the foundation is strong enough to handle real traffic." },
    { title: "Design", text: "I draft the user interface and component structure. I care about how it looks, but more about how it flows." },
    { title: "Code", text: "This is where I spend most of my time. Writing clean React components and connecting them to the backend." },
    { title: "Style", text: "I add the final touches. Tailwind CSS and smooth animations make the application feel alive and premium." },
    { title: "Ship", text: "Deploying is the best part. Seeing the lights turn on and the application live on the internet." },
]

const SCATTER = {
    base: { x: -190, y: -330, rotation: 35 },
    arm1: { x: 160, y: -380, rotation: -80 },
    joint: { x: -190, y: -170, rotation: 120 },
    arm2: { x: 230, y: 180, rotation: 70 },
    shade: { x: -250, y: 250, rotation: -60 },
    bulb: { x: -30, y: -200, rotation: 90 },
}

const ORIGIN = {
    base: "300 512",
    arm1: "275 420",
    joint: "250 340",
    arm2: "295 270",
    shade: "340 200",
    bulb: "357 236",
}

const FILLS = {
    base: "#52525b",
    arm1: "#a1a1aa",
    arm2: "#a1a1aa",
    joint: ACCENT,
    shade: ACCENT,
    bulb: "#3f3f46",
}

const TAGS = [
    { label: "<html>", x: 30, y: 170 },
    { label: "<React />", x: 20, y: 270 },
    { label: "Mongo", x: 40, y: 370 },
    { label: "Express", x: 30, y: 470 },
    { label: "{ JS }", x: 500, y: 150 },
    { label: "Node", x: 505, y: 250 },
]

const BOX = { x: 190, y: 130, w: 290, h: 410 }
const NODES = [
    [BOX.x, BOX.y],
    [BOX.x + BOX.w, BOX.y],
    [BOX.x, BOX.y + BOX.h],
    [BOX.x + BOX.w, BOX.y + BOX.h],
    [BOX.x + BOX.w / 2, BOX.y],
    [BOX.x + BOX.w / 2, BOX.y + BOX.h],
    [BOX.x, BOX.y + BOX.h / 2],
    [BOX.x + BOX.w, BOX.y + BOX.h / 2],
]

const LampStory = () => {
    const rootRef = useRef(null)
    const captionRef = useRef(null)
    const [stage, setStage] = useState(0)

    useEffect(() => {
        const root = rootRef.current
        if (!root) return

        const q = gsap.utils.selector(root)
        const mm = gsap.matchMedia()

        const build = (animated) => {
            const names = Object.keys(SCATTER)

            names.forEach((n) =>
                gsap.set(q(`[data-part="${n}"]`), { ...SCATTER[n], svgOrigin: ORIGIN[n] })
            )
            gsap.set(q("[data-shape]"), {
                fill: "rgba(163,230,53,0)",
                stroke: ACCENT,
                strokeWidth: 2,
                strokeDasharray: "6 6",
            })
            gsap.set(q("[data-ui]"), { opacity: 0 })
            gsap.set(q("[data-tag]"), { opacity: 0, y: 20 })
            gsap.set(q("[data-light]"), { opacity: 0 })
            gsap.set(q("[data-scene]"), { visibility: "visible" })

            const tl = gsap.timeline({
                defaults: { ease: "none" },
                scrollTrigger: animated
                    ? {
                          trigger: root,
                          start: "top top",
                          end: "+=3200",
                          pin: true,
                          scrub: 1,
                          anticipatePin: 1,
                          invalidateOnRefresh: true,
                      }
                    : undefined,
            })

            const partEls = names.map((n) => q(`[data-part="${n}"]`)[0])
            const bulb = q('[data-shape="bulb"]')
            const light = q("[data-light]")
            const lamp = q("[data-lamp]")

            tl.to(partEls, { y: "-=18", rotation: "+=22", duration: 1 }, 0)

            tl.to(
                partEls,
                { x: 0, y: 0, rotation: 0, duration: 0.7, ease: "power3.inOut", stagger: 0.06 },
                1
            )

            tl.to(q("[data-ui]"), { opacity: 1, duration: 0.6, stagger: 0.2 }, 2)

            tl.to(
                q("[data-tag]"),
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.08 },
                3
            )

            tl.to(
                q("[data-shape]"),
                { stroke: "rgba(255,255,255,0.25)", strokeWidth: 1.5, strokeDasharray: "100 0", duration: 1 },
                4
            )
            Object.entries(FILLS).forEach(([n, c]) =>
                tl.to(q(`[data-shape="${n}"]`), { fill: c, duration: 1 }, 4)
            )
            tl.to(q("[data-tag]"), { opacity: 0.45, duration: 1 }, 4)

            tl.to(bulb, { fill: "#FEF3C7", duration: 0.12 }, 5)
                .to(light, { opacity: 1, duration: 0.12 }, 5)
                .to(bulb, { fill: "#3f3f46", duration: 0.1 }, 5.22)
                .to(light, { opacity: 0, duration: 0.1 }, 5.22)
                .to(bulb, { fill: "#FEF3C7", duration: 0.12 }, 5.42)
                .to(light, { opacity: 1, duration: 0.12 }, 5.42)
                .to(lamp, { rotation: -1.5, svgOrigin: "300 524", duration: 0.3, ease: "sine.inOut" }, 5.55)
                .to(lamp, { rotation: 0, duration: 0.15, ease: "sine.inOut" }, 5.85)

            tl.eventCallback("onUpdate", () =>
                setStage(Math.min(STAGES.length - 1, Math.floor(tl.progress() * STAGES.length)))
            )

            return tl
        }

        mm.add("(prefers-reduced-motion: no-preference)", () => {
            build(true)

            q("[data-tag-text]").forEach((el, i) =>
                gsap.to(el, {
                    y: "+=8",
                    duration: 2 + i * 0.3,
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut",
                })
            )
        })

        mm.add("(prefers-reduced-motion: reduce)", () => {
            const tl = build(false)
            tl.progress(1)
            setStage(STAGES.length - 1)
        })

        return () => mm.revert()
    }, [])

    useEffect(() => {
        if (!captionRef.current) return
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
        gsap.fromTo(
            captionRef.current,
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.45, ease: "power2.out" }
        )
    }, [stage])

    const current = STAGES[stage]

    return (
        <section
            ref={rootRef}
            className="relative z-10 h-screen w-full overflow-hidden bg-[#0a0a0a] text-white px-8 md:px-16 py-10 flex flex-col md:flex-row items-center gap-6 md:gap-12"
        >
            {/* Added the dark green radial glow to match the About section */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#15370D]/30 via-[#0a0a0a] to-[#0a0a0a] pointer-events-none -z-10" />

            <div className="relative z-10 w-full md:w-5/12 flex flex-col gap-5">
                
                {/* NEW MAIN HEADING */}
                <div className="mb-4">
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                        HOW I <span className="text-[#A3E635]">WORK</span>
                    </h2>
                </div>

                <div className="flex items-center gap-1.5">
                    {STAGES.map((_, i) => (
                        <span
                            key={i}
                            className={`h-1 w-8 transition-colors duration-300 ${
                                i <= stage ? "bg-[#A3E635]" : "bg-neutral-800"
                            }`}
                        />
                    ))}
                </div>

                <div ref={captionRef}>
                    <p className="text-sm text-neutral-500 font-semibold">
                        {String(stage + 1).padStart(2, "0")} / {String(STAGES.length).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 text-[14vw] md:text-[5.5vw] font-black leading-[0.85] tracking-tight uppercase text-[#A3E635]">
                        /{current.title}
                    </h3>
                    <p className="mt-4 md:mt-6 max-w-md text-base md:text-xl text-neutral-400 leading-relaxed min-h-[5.5rem]">
                        {current.text}
                    </p>
                </div>
            </div>

            <div className="relative z-10 w-full md:w-7/12 flex-1 min-h-0 flex items-center justify-center">
                <svg
                    data-scene
                    viewBox="0 0 600 600"
                    className="h-full w-full max-h-[75vh]"
                    style={{ visibility: "hidden" }}
                    fill="none"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                >
                    <defs>
                        <pattern id="lamp-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                            <path d="M 30 0 L 0 0 0 30" stroke="#262626" strokeWidth="1" />
                        </pattern>
                        <radialGradient id="lamp-fade">
                            <stop offset="0.25" stopColor="#fff" />
                            <stop offset="1" stopColor="#000" />
                        </radialGradient>
                        <mask id="lamp-mask">
                            <rect width="600" height="600" fill="url(#lamp-fade)" />
                        </mask>
                        <linearGradient id="lamp-beam" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" stopColor="#FDE68A" stopOpacity="0.55" />
                            <stop offset="1" stopColor="#FDE68A" stopOpacity="0" />
                        </linearGradient>
                        <radialGradient id="lamp-glow">
                            <stop offset="0" stopColor="#FDE68A" stopOpacity="0.8" />
                            <stop offset="1" stopColor="#FDE68A" stopOpacity="0" />
                        </radialGradient>
                    </defs>

                    <rect data-ui="grid" width="600" height="600" fill="url(#lamp-grid)" mask="url(#lamp-mask)" />

                    <g data-ui="box">
                        <rect
                            x={BOX.x}
                            y={BOX.y}
                            width={BOX.w}
                            height={BOX.h}
                            stroke="#525252"
                            strokeWidth="1"
                            strokeDasharray="4 4"
                        />
                        <line x1={BOX.x} y1="524" x2={BOX.x + BOX.w} y2="524" stroke="#3f3f46" strokeWidth="1" />
                        {NODES.map(([x, y], i) => (
                            <rect key={i} x={x - 4} y={y - 4} width="8" height="8" fill={ACCENT} />
                        ))}
                    </g>

                    <g data-lamp>
                        <g data-light>
                            <polygon
                                points="-50,45 50,45 130,300 -130,300"
                                transform="translate(340 200) rotate(-25)"
                                fill="url(#lamp-beam)"
                            />
                        </g>
                        <g data-light>
                            <circle cx="357" cy="236" r="90" fill="url(#lamp-glow)" />
                        </g>

                        <g data-part="arm1">
                            <rect
                                data-shape="arm1"
                                x="-6"
                                y="-168"
                                width="12"
                                height="168"
                                rx="6"
                                transform="translate(300 500) rotate(-17.4)"
                            />
                        </g>
                        <g data-part="arm2">
                            <rect
                                data-shape="arm2"
                                x="-6"
                                y="-166"
                                width="12"
                                height="166"
                                rx="6"
                                transform="translate(250 340) rotate(32.8)"
                            />
                        </g>
                        <g data-part="joint">
                            <circle data-shape="joint" cx="250" cy="340" r="14" />
                        </g>
                        <g data-part="base">
                            <path data-shape="base" d="M 225 524 L 237 500 L 363 500 L 375 524 Z" />
                        </g>
                        <g data-part="shade">
                            <path
                                data-shape="shade"
                                d="M -20 -34 L 20 -34 L 64 40 L -64 40 Z"
                                transform="translate(340 200) rotate(-25)"
                            />
                        </g>
                        <g data-part="bulb">
                            <circle
                                data-shape="bulb"
                                cx="0"
                                cy="44"
                                r="15"
                                transform="translate(340 200) rotate(-25)"
                            />
                        </g>
                    </g>

                    {TAGS.map((t) => (
                        <g key={t.label} data-tag>
                            <text
                                data-tag-text
                                x={t.x}
                                y={t.y}
                                fontSize="20"
                                fontWeight="700"
                                fill={ACCENT}
                                stroke="none"
                            >
                                {t.label}
                            </text>
                        </g>
                    ))}
                </svg>
            </div>
        </section>
    )
}

export default LampStory