import Hero from "@/components/Hero";
import InfiniteCarousel from "@/components/InfiniteCarousel";
import { projects } from "@/data/projects";

export default function Home() {
    return (
        <main className="w-full">
            <Hero />
            <InfiniteCarousel projects={projects} />
        </main>
    );
}