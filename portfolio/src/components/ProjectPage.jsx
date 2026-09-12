"use client"

import TextReveal from "./TextReveal"
import gsap, { useGSAP } from '@/libs/gsap'
import { useRef } from "react"

const ProjectPage = ({ project }) => {
    const containerRef = useRef(null)
    const imageRef = useRef(null)


    useGSAP(() => {

        const sections  = gsap.utils.toArray('section');

        gsap.to(imageRef.current, {
            clipPath: `inset(0 0 0% 0)`,
            scale: 1,
            duration: 1.4,
            ease: "expo.out",
            delay: 0.61,

        })



        sections.forEach((section , idx) => {
            const container = section.children[0]


            gsap.to(container, {
                rotate: 0,
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom 20%",
                    scrub: true,
                }
        })
    })
    }, {
        scope: containerRef,
    })
    return (
        <>
            <main ref={containerRef} >
                <section className="h-screen  w-full ">
                    <div

                        className="sectionContainer h-full w-full flex pt-[7rem] pb-[4rem] px-[3rem]">
                        <div className="firstSegment h-full w-[10%] ">
                            <TextReveal>
                                <h3 className="text-[2rem]">{project.number}</h3>
                            </TextReveal>
                        </div>
                        <div className="secondSegment h-[85%] w-[30%]  ">
                            <div

                                className="imageDiv overflow-hidden h-full w-full">
                                <img
                                    ref={imageRef}
                                    style={
                                        {
                                            clipPath: `inset(0 0 100% 0)`,
                                        }
                                    }
                                    className="h-full scale-[1.4] w-full object-cover"
                                    src={project.coverImage} alt="" />
                            </div>
                        </div>
                        <div className="thirdSegment pl-[8rem] h-[85%] w-[60%] flex flex-col justify-end">
                            <div className="heading">
                                <TextReveal delay={0.70} ease="power4.out" splitBy="chars">
                                    <h1 className="text-[4rem] leading-[1.1]">{project.title}</h1>
                                </TextReveal>
                            </div>


                            <div className="subHeading flex gap-[3rem]">
                                <TextReveal delay={0.70} splitBy="words">
                                    <h1 className="text-[2rem]">{project.subtitle}</h1>
                                </TextReveal>
                                <TextReveal delay={0.70} splitBy="chars">
                                    <h1 className="text-[2rem]">{project.year}</h1>
                                </TextReveal>
                            </div>


                            <div className="description mt-[2rem] w-[70%]  text-balance">
                                <TextReveal delay={0.70} splitBy="lines">
                                    <p className="text-[1.5rem] leading-[1.2]">{project.description}</p>
                                </TextReveal>
                            </div>
                        </div>
                    </div>
                </section>

                {project.gallery.map((elem, index) => {
                    return (
                        <section key={index} className="h-screen w-full">
                            <div
                                style={
                                    {
                                        transformOrigin: 'bottom left'
                                    }
                                }
                                className="section-container rotate-[30deg] h-full w-full ">
                                <img
                                    className="h-full w-full object-cover"
                                    src={elem} alt="" />
                            </div>
                        </section>
                    )
                })}

                <footer></footer>
            </main>
        </>
    )
}

export default ProjectPage