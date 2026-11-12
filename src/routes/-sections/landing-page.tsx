import { useEffect } from "react";
import { mountLandingMotion } from "./use-landing-motion";
import { AboutSection } from "./about-section";
import { CategoriesSection } from "./categories-section";
import { PortraitIntro } from "./portrait-intro";
import { HeroSection } from "./hero-section";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

import { BestSellersSection } from "./best-sellers-section";
import { FaqSection } from "./faq-section";
import { SkinQuestionsSection } from "./skin-questions-section";

export function LandingPage() {
  useEffect(mountLandingMotion, []);
  return (
    <>
      <SiteHeader />
      <main id="main">
        <PortraitIntro />
        <HeroSection />
        <CategoriesSection />
        <BestSellersSection />
        <AboutSection />
        <SkinQuestionsSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </>
  );
}
