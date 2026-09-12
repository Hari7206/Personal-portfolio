import gsap from "@/libs/gsap"
import TextReveal from "./TextReveal"
import { useRef } from "react"

const CARD_W = 300
const CARD_H = 420
const SCALE = 1.35
const CarouselCard = ({ project, onHoverStart, onHoverEnd }) => {


    const cardRef = useRef(null)
    const imgRef = useRef(null)
    const numberRef = useRef(null)
    const titleRef = useRef(null)

    const onEnter = () => {
        onHoverStart?.()

        gsap.to(cardRef.current, {
            width: CARD_W * SCALE,
            height: CARD_H * SCALE,
            duration: 0.4,
            ease: 'power3.out'
        })


        gsap.to(imgRef.current, {
            scale: 1,
            duration: 0.42,
            ease: 'power3.out'
        })

        numberRef.current?.play()
        titleRef.current?.play()

    }

    const onLeave = () => {
        onHoverEnd?.()

        gsap.to(cardRef.current, {
            width: CARD_W,
            height: CARD_H,
            duration: 0.24,
            ease: 'power3.out'
        })


        gsap.to(imgRef.current, {
            scale: 1.6,
            duration: 0.35,
            ease: 'power3.out'
        })

        numberRef.current?.reverse()
        titleRef.current?.reverse()

    }

    return (
        <div
            ref={cardRef}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            style={{
                width: CARD_W,
                height: CARD_H,
                perspective: 1000,
                flexShrink: 0,
                overflow: "visible",
                cursor: "pointer",
            }}
            className="relative bg-red-300">
            {/* title panel */}
            <div style={{
                bottom: 'calc(100% + 1.5rem)',
            }}
                className="titlePanel absolute left-0 pointer-events-none flex flex-col 
                gap-[0.8rem] "
            >
                <TextReveal
                    ref={numberRef}
                    duration={0.25}
                    trigger="manual"
                    splitBy="chars"
                >
                    <h3 className="text-[1.2rem] text=[#010101]">
                        {project.number}
                    </h3>
                </TextReveal>
                <TextReveal
                    ref={titleRef}
                    trigger="manual"
                    duration={0.25}
                    splitBy="words"
                >
                    <h3 className="text-[1.2rem] text=[#010101]">
                        {project.title}
                    </h3>
                </TextReveal>
            </div>



            <div className="imgDiv absolute h-full w-full overflow-hidden">
                <img
                    style={{
                        transformOrigin: 'center center',
                        userSelect: 'none',
                    }}
                    className="h-full w-full object-cover scale-[1.6]"
                    ref={imgRef}
                    src={project.coverImage} alt={project.title} />
            </div>
        </div>
    )
}

export default CarouselCard