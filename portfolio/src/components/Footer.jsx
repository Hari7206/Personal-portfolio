"use client"

import { useRef, useState } from "react"
import LetterSwapText from "./LetterSwapText"

const Footer = () => {
    const footerRef = useRef(null)
    const backToTopRef = useRef(null)
    const letsTalkRef = useRef(null)
    const githubRef = useRef(null)
    const linkedinRef = useRef(null)
    const resumeRef = useRef(null)
    const builtByRef = useRef(null)
    const ctaRef = useRef(null)

    const scrollToTop = () => {
        if (window.__lenis) {
            window.__lenis.scrollTo(0, { duration: 1.4 })
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" })
        }
    }

    return (
        <footer
            id="contact"
            ref={footerRef}
            className="relative w-full bg-neutral-100 px-6 md:px-12 py-16 md:py-20 overflow-hidden"
        >
            <div className="flex items-center justify-between mb-16 md:mb-24">
                <span className="text-sm text-neutral-500">
                    © {new Date().getFullYear()}
                </span>

                <button
                    onClick={scrollToTop}
                    onMouseEnter={() => backToTopRef.current?.swap()}
                    onMouseLeave={() => backToTopRef.current?.unswap()}
                    className="group flex items-center gap-3 text-sm font-medium tracking-widest text-black uppercase cursor-pointer"
                >
                    <LetterSwapText 
                        ref={backToTopRef}
                        text="Back to top" 
                        disableReveal 
                    />
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white transition-transform duration-300 group-hover:-translate-y-1">
                        ↑
                    </span>
                </button>
            </div>

            <div className="relative w-full mb-16 md:mb-24 flex justify-center mt-12 md:mt-16">
                <div 
                    className="relative inline-block cursor-pointer"
                    onMouseEnter={() => letsTalkRef.current?.swap()}
                    onMouseLeave={() => letsTalkRef.current?.unswap()}
                >
                    {/* Small heading */}
                    <span className="absolute -top-6 md:-top-8 left-0 text-sm md:text-base font-medium tracking-widest text-black uppercase">
                        Have a project in mind?
                    </span>

                    {/* Ghost text */}
                    <h2 className="text-[28vw] md:text-[15vw] font-black leading-[0.85] tracking-tight text-neutral-200 select-none whitespace-nowrap">
                       {letsTalkRef.current?.text || "LET'S TALK"}
                    </h2>
                </div>
            </div>

            {/* ─── Pills + credit ─────────────────────────────── */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-20">

                {/* Social + resume pills */}
                <div className="flex flex-wrap gap-3">
                    <a
                        href="https://github.com/Hari7206"
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => githubRef.current?.swap()}
                        onMouseLeave={() => githubRef.current?.unswap()}
                        className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-7 py-3 text-xs font-medium tracking-widest text-neutral-700 hover:bg-black hover:text-white hover:border-black transition-colors uppercase"
                    >
                        <LetterSwapText ref={githubRef} text="GitHub" disableReveal />
                    </a>

                    <a
                        href="https://www.linkedin.com/in/hari-thapa-67827835b/"
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => linkedinRef.current?.swap()}
                        onMouseLeave={() => linkedinRef.current?.unswap()}
                        className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-7 py-3 text-xs font-medium tracking-widest text-neutral-700 hover:bg-black hover:text-white hover:border-black transition-colors uppercase"
                    >
                        <LetterSwapText ref={linkedinRef} text="LinkedIn" disableReveal />
                    </a>

                    <a
                        href="/hari_Resume.pdf"
                        download="hari_Resume.pdf"
                        onMouseEnter={() => resumeRef.current?.swap()}
                        onMouseLeave={() => resumeRef.current?.unswap()}
                        className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-7 py-3 text-xs font-medium tracking-widest text-neutral-700 hover:bg-black hover:text-white hover:border-black transition-colors uppercase"
                    >
                        <LetterSwapText ref={resumeRef} text="Resume" disableReveal />
                    </a>
                </div>

                {/* Credit */}
                <div 
                    className="text-sm text-neutral-500 md:text-right cursor-pointer"
                    onMouseEnter={() => builtByRef.current?.swap()}
                    onMouseLeave={() => builtByRef.current?.unswap()}
                >
                    Built by <span className="font-medium text-black">
                        <LetterSwapText ref={builtByRef} text="Hari Thapa" disableReveal />
                    </span>
                </div>
            </div>

            <div className="flex justify-center">
                <a
                    href="mailto:harithapa4654@gmail.com"
                    onMouseEnter={() => ctaRef.current?.swap()}
                    onMouseLeave={() => ctaRef.current?.unswap()}
                    className="inline-flex items-center gap-3 rounded-full bg-black text-white px-8 py-4 text-sm font-medium tracking-wide hover:bg-neutral-800 transition-colors group"
                >
                    <LetterSwapText ref={ctaRef} text="Let's work together" disableReveal />
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                    </span>
                </a>
            </div>
        </footer>
    )
}

export default Footer