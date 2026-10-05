import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import InfiniteCarousel from "@/components/InfiniteCarousel";
import Footer from "@/components/Footer";
import FooterSignature from "@/components/FooterSignature";
import { projects } from "@/data/projects";

export default function Home() {
    return (
        <main className="w-full bg-neutral-100">
            <Hero />
            <About />
            <Services />
            <InfiniteCarousel projects={projects} />
            <Footer />
            <FooterSignature />
        </main>
    );
}