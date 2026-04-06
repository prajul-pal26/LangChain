import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ExploreCards from "@/components/ExploreCards";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative z-10 light-sections">
      <Navbar />
      <Hero />
      <ExploreCards />
      <About />
      <Experience />
      <Education />
      <Contact />
      <Footer />
    </main>
  );
}
