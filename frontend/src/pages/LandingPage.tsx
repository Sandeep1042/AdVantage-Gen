import { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";
import AiTools from "../components/AiTools";

export default function LandingPage() {
 
  return (
    <div className="landing-page">
      <HeroSection />
      <Features />
      <AiTools />
      <Testimonials />
      <Pricing />
      <CTASection />
      <Footer />
  
    </div>
  );
}
