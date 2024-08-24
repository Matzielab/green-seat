import { CTAFooter } from "landing/components/CTAFooter";
import { FeatureSection } from "landing/components/FeatureSection";
import { HeroSection } from "landing/components/HeroSection";
import { WhyGoogleSection } from "landing/components/WhyGoogleSection";

export const LandingScreen = () => {
  return (
    <div>
      <HeroSection />
      <FeatureSection />
      <WhyGoogleSection />
      <CTAFooter />
    </div>
  );
};
