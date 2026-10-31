"use client"

import AboutTicker from "./AboutTicker"
import ScrollHighlightText from "./ScrollHighlightText"
import FlowLines from "./Flowline"
import DeveloperGame from "./DeveloperGame"

const INTRO =
    "I'm a Full Stack Developer who builds complete web applications with JavaScript and the MERN stack. I work across frontend and backend, from responsive interfaces to REST APIs, authentication systems, and database-driven apps. I enjoy solving problems, exploring AI integrations, and turning ideas into working products, and I keep sharpening my skills through real-world projects and DSA."

const IDENTITY = [
    { label: "PRIMARY STACK", value: "MERN" },
    { label: "FOCUS", value: "Full Stack Development" },
    { label: "EXPLORING", value: "AI + Real-time Applications" },
    { label: "MINDSET", value: "Build. Solve. Improve." },
]

const About = () => {
    return (
        <section
            data-about
            id="about"
            className="relative z-20 w-full min-h-screen bg-[#0a0a0a] text-white rounded-t-[3rem] overflow-hidden flex flex-col"
        >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#15370D]/30 via-[#0a0a0a] to-[#0a0a0a] pointer-events-none -z-10" />
            <FlowLines />

            <div className="relative z-10 flex-1 flex flex-col px-8 md:px-16 pt-12 md:pt-16 pb-10">
                <div className="flex justify-end mb-4">
                    <span className="text-xs md:text-sm tracking-widest text-neutral-500">02 / 05</span>
                </div>

                {/* Heading with selection border — UNCHANGED */}
                <div className="relative w-full mb-12 md:mb-16 group">
                    <div className="absolute inset-0 border border-dashed border-neutral-700/60 pointer-events-none -m-4 md:-m-8 z-0" />
                    <div className="absolute -top-[21px] -left-[21px] md:-top-[37px] md:-left-[37px] w-2.5 h-2.5 bg-[#A3E635] z-10" />
                    <div className="absolute -top-[21px] -right-[21px] md:-top-[37px] md:-right-[37px] w-2.5 h-2.5 bg-[#A3E635] z-10" />
                    <div className="absolute -bottom-[21px] -left-[21px] md:-bottom-[37px] md:-left-[37px] w-2.5 h-2.5 bg-[#A3E635] z-10" />
                    <div className="absolute -bottom-[21px] -right-[21px] md:-bottom-[37px] md:-right-[37px] w-2.5 h-2.5 bg-[#A3E635] z-10" />

                    <div className="relative z-10 pl-2 md:pl-4 pt-4 md:pt-6">
                        <div className="text-sm md:text-base font-medium tracking-tight text-white mb-2 ml-2 md:ml-4">
                            Full Stack <span className="text-neutral-400">Developer</span>
                        </div>
                        <div className="relative">
                            <div className="absolute left-[20%] top-1/2 -translate-y-1/2 w-[30vw] h-[30vw] max-w-[300px] max-h-[300px] bg-white rounded-full blur-[80px] opacity-20 pointer-events-none -z-10" />
                            <h2 className="text-[22vw] md:text-[16vw] font-black leading-[0.8] tracking-tight uppercase">
                                /ABOUT
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 lg:gap-14 items-center flex-1">

                    {/* LEFT — introduction + identity */}
                    <div className="md:col-span-6 min-w-0 flex flex-col gap-6">
                        

                        <ScrollHighlightText
                            text={INTRO}
                            className="text-lg md:text-xl lg:text-2xl xl:text-[1.7rem] font-bold leading-[1.45] tracking-tight"
                        />

                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#A3E635]" />
                            <span className="text-[10px] md:text-xs tracking-[0.2em] text-neutral-400 uppercase font-semibold">
                                Currently building with MERN + AI
                            </span>
                        </div>

                        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-neutral-800/70 border border-neutral-800/70">
                            {IDENTITY.map(({ label, value }) => (
                                <div key={label} className="bg-[#0a0a0a]/90 px-4 py-3">
                                    <dt className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-neutral-500">
                                        <span className="w-1 h-1 bg-[#A3E635]" />
                                        {label}
                                    </dt>
                                    <dd className="mt-1 text-sm md:text-[15px] font-semibold text-neutral-100">{value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    {/* RIGHT — interactive platformer */}
                    <div className="md:col-span-6 min-w-0 w-full max-w-[600px] md:ml-auto">
                        <DeveloperGame />
                    </div>

                </div>
            </div>

            <div className="relative z-10">
                <AboutTicker />
            </div>
        </section>
    )
}

export default About