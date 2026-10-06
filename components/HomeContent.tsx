"use client";

import { useState } from "react";
import { AgeGroup } from "@/lib/data/activities";
import HeroSection from "@/components/sections/HeroSection";
import ActivitiesSection from "@/components/sections/ActivitiesSection";
import BirthdaySection from "@/components/sections/BirthdaySection";
import MembershipSection from "@/components/sections/MembershipSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import GallerySection from "@/components/sections/GallerySection";
import SafeguardingSection from "@/components/sections/SafeguardingSection";
import TeamSection from "@/components/sections/TeamSection";
import NewsletterSection from "@/components/sections/NewsletterSection";
import ContactSection from "@/components/sections/ContactSection";

export default function HomeContent() {
  const [activeGroup, setActiveGroup] = useState<AgeGroup>("toddlers");

  return (
    <>
      <HeroSection onSelectGroup={setActiveGroup} />
      <ActivitiesSection activeGroup={activeGroup} onSelectGroup={setActiveGroup} />
      <BirthdaySection />
      <MembershipSection />
      <TestimonialsSection />
      <GallerySection />
      <SafeguardingSection />
      <TeamSection />
      <NewsletterSection />
      <ContactSection />
    </>
  );
}
