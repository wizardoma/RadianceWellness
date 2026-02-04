import { HeroSection } from "@/components/sections/hero";
import { WelcomeSection } from "@/components/sections/welcome";
import { ServicesOverview } from "@/components/sections/services-overview";
import { FeaturedServices } from "@/components/sections/featured-services";
import { AccommodationsPreview } from "@/components/sections/accommodations-preview";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { CTASection } from "@/components/sections/cta";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WelcomeSection />
      <ServicesOverview />
      <FeaturedServices />
      <AccommodationsPreview />
      <WhyChooseUs />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
