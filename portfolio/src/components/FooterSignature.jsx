"use client"

const FooterSignature = () => {
    return (
        <div className="relative w-full overflow-hidden bg-neutral-100 pt-10 pb-0 text-center">
            <h2
                className="
                    text-center text-[18vw] font-black leading-[0.75] tracking-tighter
                    text-black uppercase
                    select-none cursor-pointer whitespace-nowrap
                    transition-all duration-500
                    hover:text-transparent
                    hover:[-webkit-text-stroke:2px_black]
                    md:hover:[-webkit-text-stroke:3px_black]
                "
                style={{ marginBottom: "-0.08em" }}
            >
                Developer
            </h2>
        </div>
    )
}

export default FooterSignature