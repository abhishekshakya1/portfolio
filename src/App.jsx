import Navbar from "./components/navbar/Navbar";

import Hero from "./components/home/Hero";
import About from "./components/about/About";
import TechStack from "./components/skills/TechStack";
import SelectedProjects from "./components/projects/SelectedProjects";

import SectionDivider from "./components/common/SectionDivider";
import Timeline from "./components/timeline/Timeline";
import Contact from "./components/contact/Contact";

import CustomCursor from "./components/common/CustomCursor";
import AmbientBackground from "./components/common/AmbientBackground";

function App() {
  return (
    <>
      <CustomCursor />
      <AmbientBackground />
      
      <Navbar />

      <main className="relative z-10">
        <section id="home">
          <Hero />
        </section>

        <SectionDivider />

        <section id="about">
          <About />
        </section>

        <SectionDivider />

        <section id="skills">
          <TechStack />
        </section>

        <SectionDivider />

        <section id="projects">
          <SelectedProjects />
        </section>

        <section id="timeline">
          <Timeline />
        </section>

        <section id="contact">
          <Contact />
        </section>

      </main>
    </>
  );
}

export default App;