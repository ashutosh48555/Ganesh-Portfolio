import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import MagicBento from "@/components/MagicBento";
import Tools from "@/components/Tools";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import ClickSpark from "@/components/ClickSpark";

const Index = () => {
  return (
    <ClickSpark
      sparkColor="hsl(42 58% 58%)"
      sparkSize={12}
      sparkRadius={25}
      sparkCount={10}
      duration={500}
      extraScale={1.2}
    >
      <div className="min-h-screen bg-background text-foreground film-grain">
        <AnimatedBackground />
        <Navigation />
        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <MagicBento />
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
