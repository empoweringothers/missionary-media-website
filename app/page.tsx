import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Toolbox from "@/components/sections/Toolbox";
import Problem from "@/components/sections/Problem";
import Market from "@/components/sections/Market";
import Traction from "@/components/sections/Traction";
import Solution from "@/components/sections/Solution";
import Competitive from "@/components/sections/Competitive";
import Founder from "@/components/sections/Founder";
import Treasure from "@/components/sections/Treasure";
import Pricing from "@/components/sections/Pricing";
import Funds from "@/components/sections/Funds";
import Partners from "@/components/sections/Partners";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Toolbox />
        <Problem />
        <Market />
        <Traction />
        <Solution />
        <Competitive />
        <Founder />
        <Treasure />
        <Pricing />
        <Funds />
        <Partners />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
