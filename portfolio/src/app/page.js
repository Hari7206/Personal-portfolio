import Hero from "@/components/Hero";
import Services from "@/components/Services";
import InfiniteCarousel from "@/components/InfiniteCarousel";
import { projects } from "@/data/projects";

export default function Home() {
    return (
        <main className="w-full bg-neutral-100">
            <Hero />
            <Services />
            <InfiniteCarousel projects={projects} />
        </main>
    );
}