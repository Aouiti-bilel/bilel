
import Hero from "@/components/Hero";
import DocumentationPreview from "@/components/DocumentationPreview";
import ProjectsHero from "@/components/ProjectsHero";
import ModulesHero from "@/components/ModulesHero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Serie } from "./generated/prisma/browser";
import SeriesComp from "@/components/SeriesComp";


type Props = {
    series: Serie[]
}
export default function HomePage({ series }: Props) {
    return (
        <>
            <Navbar />
            <main className="pt-32 pb-20">
                <Hero />
                <ProjectsHero />
                <ModulesHero />
                <DocumentationPreview />
                <SeriesComp series={series} />
            </main>
            <Footer />

        </>
    );
}
