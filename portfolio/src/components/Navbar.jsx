"use client"

import { useRef, useState, useEffect } from "react"
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

    return (
        <div className="fixed z-[30] px-[3rem] top-0 left-0 h-[6vh] w-full flex items-center justify-between">
            <div className="leftNameSide">
                <LetterSwapText
                    text="Hari Thapa"
                    className={`text-[1.2rem] ${textColor} transition-colors duration-300`}
                    revealDelay={0.2}
                    revealDuration={0.9}
                    revealStagger={0.2}
                />
            </div>
            <div className="rightLinkSide flex gap-[1.6rem]">
                <LetterSwapText
                    text="Home"
                    className={`text-[1.1rem] ${textColor} transition-colors duration-300`}
                    revealDelay={0.5}
                    revealDuration={0.7}
                    revealStagger={0.1}
                />
                <LetterSwapText
                    text="About"
                    className={`text-[1.1rem] ${textColor} transition-colors duration-300`}
                    revealDelay={0.6}
                    revealDuration={0.7}
                    revealStagger={0.1}
                />
                <LetterSwapText
                    text="Contact"
                    className={`text-[1.1rem] ${textColor} transition-colors duration-300`}
                    revealDelay={0.7}
                    revealDuration={0.7}
                    revealStagger={0.1}
                />
            </div>
        </div>
    )
}

export default Navbar