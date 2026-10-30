"use client"

import useViewTransition from "@/hooks/useViewTransition"
import TextReveal from "./TextReveal"
import gsap, { useGSAP } from '@/libs/gsap'
import { useRef } from "react"

const SMALL = "inset(62% 2% 6% 63% round 8px)"
const FULL = "inset(0% 0% 0% 0% round 0px)"

const NEXT_BG = "#2b3cff"
const FOLDER_BACK = "#1f2cd1"

const SHAPE = "polygon(9% 4%, 100% 3%, 96% 65%, 0% 46%)"
const SHAPE_HOVER = "polygon(0% 0%, 100% 0%, 100% 92%, 0% 78%)"
const SHAPE_FULL = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"

const pad = (n) => String(n).padStart(2, "0")

const ProjectPage = ({ project, nextProject }) => {
    const containerRef = useRef(null)
    const heroRef = useRef(null)
    const imageBoxRef = useRef(null)
    const imageRef = useRef(null)

    const detailsRef = useRef(null)
    const footerRef = useRef(null)
    const nextBoxRef = useRef(null)
    const nextImageRef = useRef(null)
    const cursorRef = useRef(null)
    const cursorMove = useRef({})
    const leaving = useRef(false)

    const { navigateTo } = useViewTransition()

    const step = Math.min(2.6, 17 / project.tags.length)

    useGSAP(() => {
       
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "+=100%",
                scrub: true,
                pin: true,
            }
        })

        tl.to(imageBoxRef.current, { clipPath: FULL, ease: "none" })
        tl.to(imageRef.current, { scale: 1, ease: "none" }, 0)

        const cards = gsap.utils.toArray('.tagCard', containerRef.current)
        gsap.fromTo(cards,
            {
                y: -500,
                opacity: 0,
                rotate: (i) => (i % 2 ? 1 : -1) * gsap.utils.random(6, 14),
            },
            {
                y: 0,
                opacity: 1,
                rotate: (i) => (i % 2 ? 1 : -1) * 1.2,
                ease: "power2.out",
                stagger: 0.15,
                scrollTrigger: {
                    trigger: detailsRef.current,
                    start: "top 75%",
                    end: "top 15%",
                    scrub: true,
                }
            }
        )

        gsap.from('.nextWord', {
            yPercent: 110,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.12,
            scrollTrigger: {
                trigger: footerRef.current,
                start: "top 50%",
            }
        })

        gsap.from(nextBoxRef.current, {
            y: 220,
            rotate: 5,
            ease: "none",
            scrollTrigger: {
                trigger: footerRef.current,
                start: "top bottom",
                end: "top 20%",
                scrub: true,
            }
        })

        gsap.set(nextImageRef.current, { scale: 1.25 })
        gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50, scale: 0 })
        cursorMove.current = {
            x: gsap.quickTo(cursorRef.current, "x", { duration: 0.5, ease: "power3" }),
            y: gsap.quickTo(cursorRef.current, "y", { duration: 0.5, ease: "power3" }),
        }
    }, { scope: containerRef })

    const handleEnter = () => {
        if (leaving.current) return
        gsap.to(nextBoxRef.current, { clipPath: SHAPE_HOVER, duration: 0.9, ease: "expo.out", overwrite: "auto" })
        gsap.to(nextImageRef.current, { scale: 1, duration: 1.2, ease: "expo.out", overwrite: "auto" })
        gsap.to(cursorRef.current, { scale: 1, duration: 0.4, ease: "back.out(2)", overwrite: "auto" })
    }

    const handleLeave = () => {
        if (leaving.current) return
        gsap.to(nextBoxRef.current, { clipPath: SHAPE, duration: 0.9, ease: "expo.out", overwrite: "auto" })
        gsap.to(nextImageRef.current, { scale: 1.25, duration: 1.2, ease: "expo.out", overwrite: "auto" })
        gsap.to(cursorRef.current, { scale: 0, duration: 0.3, ease: "power2.out", overwrite: "auto" })
    }

    const handleMove = (e) => {
        const rect = footerRef.current.getBoundingClientRect()
        cursorMove.current.x(e.clientX - rect.left)
        cursorMove.current.y(e.clientY - rect.top)
    }

    const handleClick = () => {
        if (!nextProject || leaving.current) return
        leaving.current = true

        const words = gsap.utils.toArray('.nextWord', footerRef.current)
        const texts = gsap.utils.toArray('.footerText', footerRef.current)

        const out = gsap.timeline({
            onComplete: () => navigateTo(`/project/${nextProject.slug}`)
        })

        out.to(cursorRef.current, { scale: 0, duration: 0.3 }, 0)
        out.to(texts, { opacity: 0, duration: 0.4 }, 0)
        out.to(words, { yPercent: -110, duration: 0.7, stagger: 0.08, ease: "power3.in" }, 0)
        out.to(nextBoxRef.current, {
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            y: 0,
            rotate: 0,
            clipPath: SHAPE_FULL,
            duration: 1.1,
            ease: "expo.inOut",
            overwrite: "auto",
        }, 0)
        out.to(nextImageRef.current, { scale: 1, duration: 1.1, ease: "expo.inOut", overwrite: "auto" }, 0)
    }

    return (
        <main ref={containerRef}>

            <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
                <div className="absolute top-[7rem] left-[3rem] z-0">
                    <TextReveal>
                        <h3 className="text-[2rem]">{project.number}</h3>
                    </TextReveal>
                </div>

                <div className="absolute top-[5rem] right-[1.5rem] z-0 text-right">
                    <TextReveal delay={0.7} splitBy="words">
                        <h1 className="text-[9vw] leading-[0.95] uppercase">
                            {project.title}
                        </h1>
                    </TextReveal>
                </div>

                <div className="absolute bottom-[2rem] left-[2rem] w-[30%] z-0">
                    <TextReveal delay={0.7} splitBy="lines">
                        <p className="text-[1.5rem] leading-[1.2]">{project.description}</p>
                    </TextReveal>
                </div>

                <div
                    ref={imageBoxRef}
                    style={{ clipPath: SMALL }}
                    className="absolute inset-0 z-10">
                    <img
                        ref={imageRef}
                        className="h-full w-full object-cover scale-[1.3]"
                        src={project.coverImage}
                        alt={project.title} />
                </div>
            </section>

            <section
                ref={detailsRef}
                className="sticky top-0 z-0 h-screen w-full flex items-center gap-[4rem] px-[3rem] pt-[6rem] pb-[3rem]">

                <div className="w-[48%]">
                    <h2 className="text-[3rem] leading-[1.05] text-balance">{project.subtitle}</h2>

                    <div className="mt-[1.5rem] flex gap-[3rem] text-[1rem] leading-[1.3]">
                        <div>
                            <p className="opacity-50">Category</p>
                            <p>{project.category}</p>
                        </div>
                        <div>
                            <p className="opacity-50">Role</p>
                            <p>{project.role}</p>
                        </div>
                        <div>
                            <p className="opacity-50">Year</p>
                            <p>{project.year}</p>
                        </div>
                    </div>

                    <p className="mt-[2rem] text-[1.5rem] leading-[1.25] text-balance">
                        {project.description}
                    </p>
                    <p className="mt-[1.5rem] w-[85%] text-[1rem] leading-[1.5] opacity-70">
                        {project.longDescription}
                    </p>
                </div>

                <div className="flex w-[52%] justify-center">
                    <div className="relative h-[32rem] w-[26rem]">

                        <div
                            style={{ background: FOLDER_BACK }}
                            className="absolute left-0 top-0 h-[2.5rem] w-[9rem] rounded-t-[0.8rem]" />
                        <div
                            style={{ background: FOLDER_BACK }}
                            className="absolute left-0 top-[1.5rem] bottom-0 w-full rounded-[0.8rem] rounded-tl-none" />

                        {/* the cards */}
                        <div className="absolute inset-x-[1.2rem] top-[3rem]">
                            {project.tags.map((tag, i) => (
                                <div
                                    key={tag}
                                    style={{ top: `${i * step}rem`, zIndex: i + 1 }}
                                    className="tagCard absolute inset-x-0 h-[20rem] rounded-t-[0.5rem] border border-black/15 bg-white px-[1rem]">
                                    <div
                                        style={{ height: `${step}rem` }}
                                        className="flex items-center justify-between text-[1rem] leading-none">
                                        <span>{tag}</span>
                                        <span className="opacity-40">{pad(i + 1)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div
                            style={{ background: NEXT_BG, zIndex: 50 }}
                            className="absolute inset-x-0 bottom-0 h-[10rem] rounded-[0.8rem] px-[1.5rem] py-[1.2rem] flex items-end justify-between text-white">
                            <p className="text-[2rem] leading-none">Tech stack</p>
                            <p className="text-[1rem]">({pad(project.tags.length)})</p>
                        </div>
                    </div>
                </div>
            </section>

            <footer
                ref={footerRef}
                style={{ background: NEXT_BG }}
                className="relative z-10 h-screen w-full overflow-hidden text-white">

                <h1 className="absolute top-[4rem] left-[3rem] z-0 text-[13vw] font-semibold leading-[0.85] uppercase">
                    <span className="block overflow-hidden py-[0.05em]">
                        <span className="nextWord block">Next</span>
                    </span>
                    <span className="ml-[18%] block overflow-hidden py-[0.05em]">
                        <span className="nextWord block">Project</span>
                    </span>
                </h1>

                <div
                    ref={nextBoxRef}
                    style={{ clipPath: SHAPE }}
                    onMouseEnter={handleEnter}
                    onMouseLeave={handleLeave}
                    onMouseMove={handleMove}
                    onClick={handleClick}
                    className="absolute left-[30%] top-[26%] z-10 h-[72%] w-[56%] cursor-pointer">
                    <img
                        ref={nextImageRef}
                        className="h-full w-full object-cover"
                        src={nextProject?.coverImage}
                        alt={nextProject?.title} />
                </div>

                <div className="footerText absolute bottom-[3rem] left-[3rem] z-20">
                    <h2 className="text-[3.5vw] leading-[1]">{nextProject?.title}</h2>
                    <p className="mt-[0.5rem] text-[1.2rem]">{nextProject?.category}</p>
                </div>

                <p className="footerText absolute bottom-[2rem] right-[3rem] z-20 text-[10vw] leading-[0.8]">
                    {nextProject?.number}
                </p>

                <div
                    ref={cursorRef}
                    className="pointer-events-none absolute left-0 top-0 z-30 flex h-[6.5rem] w-[6.5rem] items-center justify-center rounded-full bg-white text-[1rem] text-black">
                    View
                </div>
            </footer>

        </main>
    )
}

export default ProjectPage