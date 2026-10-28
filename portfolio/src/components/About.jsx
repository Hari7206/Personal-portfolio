"use client"

import AboutTicker from "./AboutTicker"
import ScrollHighlightText from "./ScrollHighlightText"
import FlowLines from "./Flowline"
import TechGrid from "./TechGrid"

const About = () => {
    return (
        <section
            data-about
            id="about"
            className="relative z-20 w-full min-h-screen bg-[#0a0a0a] text-white rounded-t-[3rem] overflow-hidden flex flex-col"
        >
            {/* ─── Subtle Dark Vignette ─── */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#15370D]/30 via-[#0a0a0a] to-[#0a0a0a] pointer-events-none -z-10" />

            <FlowLines />

            <div className="relative z-10 flex-1 flex flex-col px-8 md:px-16 pt-12 md:pt-16 pb-10">
        

                {/* ─── Heading Section with Selection Box ────────────────── */}
                <div className="relative w-full mb-12 md:mb-16 group">
                    
                    {/* The Dashed Selection Border */}
                    <div className="absolute inset-0 border border-dashed border-neutral-700/60 pointer-events-none -m-4 md:-m-8 z-0" />
                    
                    {/* The Corner Nodes (Green Squares) */}
                    <div className="absolute -top-[21px] -left-[21px] md:-top-[37px] md:-left-[37px] w-2.5 h-2.5 bg-[#A3E635] z-10" />
                    <div className="absolute -top-[21px] -right-[21px] md:-top-[37px] md:-right-[37px] w-2.5 h-2.5 bg-[#A3E635] z-10" />
                    <div className="absolute -bottom-[21px] -left-[21px] md:-bottom-[37px] md:-left-[37px] w-2.5 h-2.5 bg-[#A3E635] z-10" />
                    <div className="absolute -bottom-[21px] -right-[21px] md:-bottom-[37px] md:-right-[37px] w-2.5 h-2.5 bg-[#A3E635] z-10" />
                    {/* Mid-point nodes */}
                    <div className="hidden md:block absolute -top-[37px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#A3E635] z-10" />
                    <div className="hidden md:block absolute -bottom-[37px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#A3E635] z-10" />
                    <div className="hidden md:block absolute top-1/2 -translate-y-1/2 -left-[37px] w-2.5 h-2.5 bg-[#A3E635] z-10" />
                    <div className="hidden md:block absolute top-1/2 -translate-y-1/2 -right-[37px] w-2.5 h-2.5 bg-[#A3E635] z-10" />

                    {/* The Actual Text Content */}
                    <div className="relative z-10 pl-2 md:pl-4 pt-4 md:pt-6">
                        {/* Small Label */}
                     
                        
                        {/* Big Heading with Glow */}
                        <div className="relative">
                            {/* The White Glow Effect */}
                            <div className="absolute left-[20%] top-1/2 -translate-y-1/2 w-[30vw] h-[30vw] max-w-[300px] max-h-[300px] bg-white rounded-full blur-[80px] opacity-20 pointer-events-none -z-10" />

                            <h2 className="text-[22vw] md:text-[16vw] font-black leading-[0.8] tracking-tight uppercase">
                                /ABOUT
                            </h2>
                        </div>
                    </div>
                </div>

                {/* ─── Main Content Grid ───────────────────────────────── */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center flex-1">
                    
                    {/* Arrow */}
                    <div className="md:col-span-2 flex justify-start">
                        <svg
                            viewBox="0 0 120 120"
                            className="w-24 h-24 md:w-40 md:h-40 text-[#15370D] transition-colors duration-500 hover:text-[#A3E635]"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="10"
                            strokeLinecap="square"
                        >
                            <line x1="20" y1="100" x2="100" y2="20" />
                            <polyline points="50,20 100,20 100,70" />
                        </svg>
                    </div>

                    {/* Bio Text */}
                    <div className="md:col-span-5 flex flex-col gap-6">
                        <ScrollHighlightText
                            text='"I am a Full Stack Developer focused on building scalable MERN applications with real-time features, AI integrations, and clean, user-focused interfaces. With a foundation in Data Structures, REST APIs, and secure authentication committed to shipping impactful solutions in fast-paced development environments."'
                            className="text-xl md:text-3xl font-bold leading-[1.4] tracking-tight"
                        />
                        
                        {/* Small Caption */}
                        <div className="flex items-center gap-2 mt-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#A3E635]" />
                            <span className="text-[10px] md:text-xs tracking-[0.2em] text-neutral-400 uppercase font-semibold">
                                Currently building with MERN + AI
                            </span>
                        </div>
                    </div>

                    {/* Tech Grid */}
                    <div className="md:col-span-5 h-full relative min-h-[300px]">
                        <TechGrid />
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