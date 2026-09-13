import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Rail from "./components/Rail";
import Skills from "./components/Skills";

export default function Home() {
  return (
    <>
      <Rail />
      <div className="md:pl-[var(--rail-w)]">
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
