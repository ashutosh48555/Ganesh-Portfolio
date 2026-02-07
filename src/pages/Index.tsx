import Navigation from "@/components/navigation/Navigation";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Tools from "@/components/sections/Tools";
import Portfolio from "@/components/sections/Portfolio";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import AnimatedBackground from "@/components/effects/AnimatedBackground";
import ClickSpark from "@/components/effects/ClickSpark";
import Cursor from "@/components/effects/Cursor";

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
