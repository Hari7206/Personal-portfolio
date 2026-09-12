import TextReveal from "./TextReveal"

const Navbar = () => {
  return (
    <div className="fixed z-[30] px-[3rem] top-0 left-0 h-[6vh] w-full flex items-center justify-between ">
        <div className="leftNameSide ">
            <TextReveal>
                <h3 className="text-[1.2rem] text=[#010101]">Hari Thapa</h3>
            </TextReveal>
        </div>
        <div className="rightLinkSide flex gap-[1.6rem]">
              <TextReveal>
                <h3 className="text-[1.1rem] text=[#010101]">Home</h3>
            </TextReveal>
              <TextReveal>
                <h3 className="text-[1.1rem] text=[#010101]">About</h3>
            </TextReveal>
              <TextReveal>
                <h3 className="text-[1.1rem] text=[#010101]">Contact</h3>
            </TextReveal>
        </div>
    </div>
  )
}

export default Navbar