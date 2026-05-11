import { SideDock } from "@/components/navigation/SideDock";
import { InteractiveBackground } from "@/components/effects/InteractiveBackground";
import { Hero } from "@/components/sections/Hero";
import { Capabilities } from "@/components/sections/Capabilities";
import { Contact } from "@/components/sections/Contact";
import { CaseStudyModal } from "@/components/sections/CaseStudyModal";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Experience } from "@/components/sections/Experience";
import { Footer } from "@/components/sections/Footer";
export default function Home() {
  return (
    <main className="portfolio-page desktop-rail-offset">
      <InteractiveBackground />
      <div className="grain-layer" />
      <div className="page-vignette" />

      <SideDock />
      <Hero />
      <SelectedWork />
      <Experience />
      <Capabilities />
      <Contact />
      <Footer />

      <CaseStudyModal />
    </main>
  );
}