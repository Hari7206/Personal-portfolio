"use client";

import HeroName from "./HeroName";
import HeroPanel from "./HeroPanel";
import HeroSocials from "./HeroSocials";
import HeroPortrait from "./HeroPortrait";

const Hero = () => {
    return (
        <section className="relative w-full h-screen bg-white overflow-hidden">

            {/* ─── NAME — spans full width, sits at top ─────────────── */}
            <div className="pt-[10vh] px-4">
                <HeroName className="text-center text-[15vw] font-black leading-[0.9] tracking-tight">
                    <span className="text-black">HARI</span>{" "}
                    <span className="text-transparent [-webkit-text-stroke:3px_black]">
                        THAPA
                    </span>
                </HeroName>
            </div>

            {/* ─── PORTRAIT — big, centered, overlapping the name ──── */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center pointer-events-none">
                <div className="pointer-events-auto">
                    <HeroPortrait
                        src="https://res.cloudinary.com/dczypoejb/image/upload/v1790693877/profile_zd1ubt.png"
                        alt="Hari Thapa"
                       className="h-[80vh] w-auto"
                    />
                </div>
            </div>

            {/* ─── SIDE CONTENT — anchored to bottom, tucked to edges ─ */}
            <div className="absolute inset-x-0 bottom-0 grid grid-cols-12 items-end px-6 md:px-12 pb-10">
                <div className="col-span-12 md:col-span-3 flex justify-center md:justify-start">
                    <HeroPanel />
                </div>

                <div className="hidden md:block md:col-span-6" />

                <div className="col-span-12 md:col-span-3 flex justify-center md:justify-end mt-6 md:mt-0">
                    <HeroSocials />
                </div>
            </div>

        </section>
    );
};

export default Hero;