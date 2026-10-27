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
            className="relative z-20 w-full min-h-screen bg-black text-white rounded-t-[3rem] overflow-hidden flex flex-col"
        >
            <FlowLines />

            <div className="relative z-10 flex-1 flex flex-col px-8 md:px-16 pt-12 md:pt-16 pb-10">
                
                {/* Top row: Counter */}
                <div className="flex justify-end mb-4">
                    <span className="text-xs md:text-sm tracking-widest text-neutral-500">
                        02 / 05
                    </span>
                </div>

                {/* Big /ABOUT Heading */}
                <div className="overflow-hidden mb-8">
                    <h2 className="text-[22vw] md:text-[15vw] font-black leading-[0.8] tracking-tight">
                        /ABOUT
                    </h2>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center flex-1">
                    
                    {/* Arrow */}
                    <div className="md:col-span-2 flex justify-start">
                        <svg
                            viewBox="0 0 120 120"
                            className="w-24 h-24 md:w-40 md:h-40 text-neutral-700"
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
                        <span className="text-xs tracking-widest text-neutral-500 uppercase">
                            Currently building with MERN + AI
                        </span>
                    </div>

                    {/* Tech Grid (Takes up the remaining 5 columns) */}
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