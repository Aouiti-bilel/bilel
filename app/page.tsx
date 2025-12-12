
import Hero from "@/components/Hero";
import DocumentationPreview from "@/components/DocumentationPreview";
import ProjectsHero from "@/components/ProjectsHero";
import ModulesHero from "@/components/ModulesHero";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProjectsHero />
      <ModulesHero />
      <DocumentationPreview />
    </>
  );
}
