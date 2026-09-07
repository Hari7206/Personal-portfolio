import TextReveal from "@/components/TextReveal";


export default function Home() {
  return (
   <main className="h-[300vh] w-full bg-black">
       <TextReveal trigger="mount" className="text-[3rem] text-white">
        hello everyone
       </TextReveal>
    </main>
  );
}
