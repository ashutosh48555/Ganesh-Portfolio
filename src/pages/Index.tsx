import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Tools from "@/components/Tools";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import ClickSpark from "@/components/ClickSpark";
import Cursor from "@/components/Cursor";

const Index = () => {
  return (
    <ClickSpark
      sparkColor="hsl(var(--primary))"
      sparkSize={10}
      sparkRadius={20}
      sparkCount={8}
      duration={400}
    >
      <Cursor />
      <div className="relative min-h-screen bg-background text-foreground film-grain">
        <AnimatedBackground />
        <Navigation />
        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Tools />
          <Portfolio />
          <Contact />
        </main>
        <Footer />
      </div>
    </ClickSpark>
  );
};

export default Index;
