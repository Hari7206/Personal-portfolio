"use client"

import AboutTicker from "./AboutTicker"
import ScrollHighlightText from "./ScrollHighlightText"

const About = () => {
    return (
        <section
            data-about
             id="about"
            className="relative z-20 w-full h-screen bg-black text-white rounded-t-[3rem] overflow-hidden flex flex-col"
        >
            <div className="flex-1 flex flex-col px-8 md:px-16 pt-12 md:pt-16 pb-10 min-h-0">

                <div className="flex justify-end mb-8">
                    <span className="text-xs md:text-sm tracking-widest text-neutral-500">
                        02 / 05
                    </span>
                </div>

                <div className="overflow-hidden mb-6 md:mb-10">
                    <h2 className="text-[26vw] md:text-[18vw] font-black leading-[0.8] tracking-tight">
                        /ABOUT
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start md:items-end flex-1">

                    <div className="md:col-span-2 flex justify-start">
                        <svg
                            viewBox="0 0 120 120"
                            className="w-40 h-40 md:w-56 md:h-56 text-neutral-700"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="10"
                            strokeLinecap="square"
                        >
                            <line x1="20" y1="100" x2="100" y2="20" />
                            <polyline points="50,20 100,20 100,70" />
                        </svg>
                    </div>

                    <div className="md:col-span-7 flex flex-col gap-6">
                        <ScrollHighlightText
                            text='"I am a Full Stack Developer focused on building scalable MERN applications with real-time features, AI integrations, and clean, user-focused interfaces. With a foundation in Data Structures, REST APIs, and secure authentication  committed to shipping impactful solutions in fast-paced development environments."'
                            className="text-2xl md:text-4xl font-bold leading-[1.3] tracking-tight"
                        />

                        <span className="text-xs tracking-widest text-neutral-500 uppercase">
                            Currently building with MERN + AI
                        </span>
                    </div>

                </div>

            </div>

            <AboutTicker />
        </section>
    )
}

export default About