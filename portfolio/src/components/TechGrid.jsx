"use client"

import { useRef } from "react"
import gsap from "@/libs/gsap"
import { 
    SiHtml5, 
    SiCss, 
    SiJavascript, 
    SiReact, 
    SiNodedotjs, 
    SiMongodb,
    SiExpress,
    SiVercel,
    SiLeetcode,
    SiSocketdotio,
    SiTypescript,
    SiNextdotjs,
    SiGreensock,
    SiRender,
    SiGit 
} from "react-icons/si"

// We import FaCloud as a placeholder for AWS
import { FaCloud } from "react-icons/fa"

const techs = [
    { name: "HTML", icon: SiHtml5, rotation: -15, top: "5%", left: "10%" },
    { name: "CSS", icon: SiCss, rotation: 10, top: "10%", left: "50%" },
    { name: "JS", icon: SiJavascript, rotation: -5, top: "25%", left: "80%" },
    { name: "React", icon: SiReact, rotation: 20, top: "20%", left: "25%" },
    { name: "Node", icon: SiNodedotjs, rotation: -25, top: "40%", left: "5%" },
    { name: "MongoDB", icon: SiMongodb, rotation: 8, top: "45%", left: "65%" },
    { name: "Express", icon: SiExpress, rotation: -10, top: "60%", left: "35%" },
    { name: "TypeScript", icon: SiTypescript, rotation: 15, top: "5%", left: "85%" },
    { name: "Next.js", icon: SiNextdotjs, rotation: -20, top: "35%", left: "90%" },
    { name: "Socket.io", icon: SiSocketdotio, rotation: 5, top: "65%", left: "80%" },
    { name: "AWS", icon: FaCloud, rotation: -15, top: "75%", left: "15%" }, // AWS Placeholder
    { name: "Vercel", icon: SiVercel, rotation: 12, top: "80%", left: "55%" },
    { name: "Render", icon: SiRender, rotation: -8, top: "60%", left: "95%" },
    { name: "LeetCode", icon: SiLeetcode, rotation: 18, top: "85%", left: "85%" },
    { name: "GSAP", icon: SiGreensock, rotation: -12, top: "30%", left: "45%" },
    { name: "Git", icon: SiGit, rotation: 6, top: "90%", left: "30%" },
]

const TechBox = ({ tech }) => {
    const boxRef = useRef(null)

    const handleEnter = () => {
        gsap.to(boxRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "back.out(2)",
            overwrite: true,
        })
    }

    const handleLeave = () => {
        gsap.to(boxRef.current, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            ease: "power2.inOut",
            overwrite: true,
        })
    }

    return (
        <div
            ref={boxRef}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            className="absolute flex items-center justify-center w-12 h-12 md:w-16 md:h-16 border-2 border-neutral-700 bg-neutral-900/80 rounded-xl backdrop-blur-sm cursor-pointer opacity-0 scale-90"
            style={{
                top: tech.top,
                left: tech.left,
                transform: `rotate(${tech.rotation}deg)`,
            }}
        >
            <div className="flex items-center justify-center">
                <tech.icon size={24} className="text-white md:w-8 md:h-8" />
            </div>
        </div>
    )
}

const TechGrid = () => {
    return (
        <div className="relative w-full h-[450px]">
            {techs.map((tech, i) => (
                <TechBox key={tech.name} tech={tech} />
            ))}
        </div>
    )
}

export default TechGrid