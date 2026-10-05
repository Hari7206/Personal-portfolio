"use client"

import { useRef } from "react"

const Footer = () => {
    const footerRef = useRef(null)

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <footer
            id="contact"
            ref={footerRef}
            className="relative w-full bg-neutral-100 px-6 md:px-12 py-16 md:py-20"
        >
            {/* ─── Top row: copyright + back to top ───────────── */}
            <div className="flex items-center justify-between mb-16 md:mb-24">
                <span className="text-sm text-neutral-500">
                    © {new Date().getFullYear()}
                </span>

                <button
                    onClick={scrollToTop}
                    className="group flex items-center gap-3 text-sm font-medium tracking-widest text-black uppercase cursor-pointer"
                >
                    <span>Back to top</span>
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white transition-transform duration-300 group-hover:-translate-y-1">
                        ↑
                    </span>
                </button>
            </div>

            {/* ─── Big heading + ghost text ───────────────────── */}
            <div className="relative w-full mb-16 md:mb-24 flex justify-center">
                <div className="relative inline-block">

                    {/* Small heading — pinned to top-left of "LET'S TALK" */}
                    <span className="absolute -top-6 md:-top-8 left-0 text-sm md:text-base font-medium tracking-widest text-black uppercase">
                        Have a project in mind?
                    </span>

                    {/* Ghost text */}
                    <h2 className="text-[28vw] md:text-[15vw] font-black leading-[0.85] tracking-tight text-neutral-200 select-none pointer-events-none whitespace-nowrap">
                        LET&apos;S TALK
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
                        className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-7 py-3 text-xs font-medium tracking-widest text-neutral-700 hover:bg-black hover:text-white hover:border-black transition-colors uppercase"
                    >
                        GitHub
                    </a>

                    <a
                        href="https://www.linkedin.com/in/hari-thapa-67827835b/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-7 py-3 text-xs font-medium tracking-widest text-neutral-700 hover:bg-black hover:text-white hover:border-black transition-colors uppercase"
                    >
                        LinkedIn
                    </a>

                    <a
                        href="/hari_Resume.pdf"
                        download="hari_Resume.pdf"
                        className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-7 py-3 text-xs font-medium tracking-widest text-neutral-700 hover:bg-black hover:text-white hover:border-black transition-colors uppercase"
                    >
                        Resume
                    </a>
                </div>

                {/* Credit */}
                <p className="text-sm text-neutral-500 md:text-right">
                    Built by <span className="font-medium text-black">Hari Thapa</span>
                </p>
            </div>

            {/* ─── CTA button ─────────────────────────────────── */}
            <div className="flex justify-center">
                <a
                    href="mailto:harithapa4654@gmail.com"
                    className="inline-flex items-center gap-3 rounded-full bg-black text-white px-8 py-4 text-sm font-medium tracking-wide hover:bg-neutral-800 transition-colors group"
                >
                    Let&apos;s work together
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                    </span>
                </a>
            </div>
        </footer>
    )
}

export default Footer