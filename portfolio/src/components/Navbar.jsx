"use client"

import { useState, useEffect } from "react"
import LetterSwapText from "./LetterSwapText"

const Navbar = () => {
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        const check = () => {
            const about = document.querySelector("[data-about]")
            if (!about) return

            const rect = about.getBoundingClientRect()
            const navH = window.innerHeight * 0.06
            const overlapping = rect.top <= navH && rect.bottom >= navH
            setIsDark(overlapping)
        }

        check()
        window.addEventListener("scroll", check, { passive: true })
        window.addEventListener("resize", check)

        return () => {
            window.removeEventListener("scroll", check)
            window.removeEventListener("resize", check)
        }
    }, [])

    const textColor = isDark ? "text-white" : "text-black"

    const scrollToTop = () => {
        if (window.__lenis) {
            window.__lenis.scrollTo(0, { duration: 1.4 })
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" })
        }
    }

    const scrollToSection = (id) => {
        const el = document.getElementById(id)
        if (!el) return

        if (window.__lenis) {
            window.__lenis.scrollTo(el, { offset: -60, duration: 1.4 })
        } else {
            let top = 0
            let node = el
            while (node) {
                top += node.offsetTop
                node = node.offsetParent
            }
            window.scrollTo({ top: top - 60, behavior: "smooth" })
        }
    }

    return (
        <div className="fixed z-[30] px-[3rem] top-0 left-0 h-[6vh] w-full flex items-center justify-between">
            <div
                className="leftNameSide cursor-pointer"
                onClick={scrollToTop}
            >
                <LetterSwapText
                    text="Hari Thapa"
                    className={`text-[1.2rem] ${textColor} transition-colors duration-300`}
                    revealDelay={0.2}
                    revealDuration={0.9}
                    revealStagger={0.2}
                />
            </div>

            <div className="rightLinkSide flex items-center gap-[1.6rem]">
                <div className="cursor-pointer" onClick={scrollToTop}>
                    <LetterSwapText
                        text="Home"
                        className={`text-[1.1rem] ${textColor} transition-colors duration-300`}
                        revealDelay={0.5}
                        revealDuration={0.7}
                        revealStagger={0.1}
                    />
                </div>

                <div className="cursor-pointer" onClick={() => scrollToSection("about")}>
                    <LetterSwapText
                        text="About"
                        className={`text-[1.1rem] ${textColor} transition-colors duration-300`}
                        revealDelay={0.6}
                        revealDuration={0.7}
                        revealStagger={0.1}
                    />
                </div>

                <div className="cursor-pointer" onClick={() => scrollToSection("contact")}>
                    <LetterSwapText
                        text="Contact"
                        className={`text-[1.1rem] ${textColor} transition-colors duration-300`}
                        revealDelay={0.8}
                        revealDuration={0.7}
                        revealStagger={0.1}
                    />
                </div>

                <a
                    href="/hari_Resume.pdf"
                    download="hari_Resume.pdf"
                    className="cursor-pointer"
                >
                    <LetterSwapText
                        text="Resume"
                        className={`text-[1.1rem] ${textColor} transition-colors duration-300`}
                        revealDelay={0.7}
                        revealDuration={0.7}
                        revealStagger={0.1}
                    />
                </a>
            </div>
        </div>
    )
}

export default Navbar