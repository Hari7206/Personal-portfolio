import InfiniteCarousel from "@/components/InfiniteCarousel";
import TextReveal from "@/components/TextReveal";
import { projects } from "@/data/projects";



export default function Home() {
  return (
   <main className="h-screen w-full flex items-center">
      <InfiniteCarousel projects={projects}/>
    </main>
  );
}
