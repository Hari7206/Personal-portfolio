import TextReveal from "./TextReveal"

const CARD_W = 200
const CARD_H = 300
const SCALE = 1.35
const CarouselCard = ({ project }) => {


    const cardRef = useRef(null)
    const imgRef = useRef(null)
    const numberRef = useRef(null)
    const titleRef = useRef(null)
    return (
        <div ref={cardRef}
            style={{
                width: CARD_W,
                height: CARD_H,
                perspective: 1000,
                flexShrink: 0,
                overflow: visible,
                cursor: pointer,
            }}
            className="relative">
            {/* title panel */}
            <div style={{
                bottom: 'calc(100% + 3rem)',
            }}
                className="titlePanel absolute left-0 pointer-events-none flex flex-col 
                gap-[1rem] "
            >
                <TextReveal
                    ref={numberRef}
                    trigger="manual"
                    splitBy="chars"
                >
                    <h3 className="text-[1rem] text=[#010101]">
                        {project.number}
                    </h3>
                </TextReveal>
                <TextReveal
                    ref={numberRef}
                    trigger="manual"
                    splitBy="words"
                >
                    <h3 className="text-[1rem] text=[#010101]">
                        {project.Title}
                    </h3>
                </TextReveal>
            </div>



            <div className="imgDiv absolute h-full w-full overflow-hidden">
                <img ref={imgRef}
                src={project.coverImage} alt={project.title} />
            </div>

            CarouselCard</div>
    )
}

export default CarouselCard