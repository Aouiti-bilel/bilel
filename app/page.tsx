
import Hero from "@/components/Hero";
import DocumentationPreview from "@/components/DocumentationPreview";
import ProjectsHero from "@/components/ProjectsHero";
import ModulesHero from "@/components/ModulesHero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20">
        <Hero />
        <ProjectsHero />
        <ModulesHero />
        <DocumentationPreview />
      </main>

      <Footer />

    </>
  );
}
