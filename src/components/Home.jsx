// src/components/Home.jsx
import React from "react";
import Hero from "./Hero";
import WhyChoose from "./WhyChoose";
import MentorCard from "./MentorCard";
import ReviewCard from "./ReviewCard";
import PricingCard from "./PricingCard";
import FAQ from "./FAQ";
import ContactSection from "./ContactSection";
import NewsWebinarsSection from "./NewsWebinarsSection";

export default function Home() {
  return (
    <>
     <div >
      <Hero />
      <NewsWebinarsSection />
      <WhyChoose />
      <PricingCard />
      <MentorCard />
      <ReviewCard />
      <FAQ />
      <ContactSection />
      </div>
    </>
  );
}
