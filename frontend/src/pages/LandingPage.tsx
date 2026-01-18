import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="pt-16">
      <HeroSection />
      <Features />
      <Testimonials />
      <Pricing />
      <CTASection />
      <Footer />
    </div>
  );
}
