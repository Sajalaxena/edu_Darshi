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
import TopInstitutes from "./TopInstitutes";
import MathematicalBackground from "./MathematicalBackground";
import EduDarshiYoutubeSection from "./EduDarshiYoutubeSection";

export default function Home() { 
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Mathematical Background */}
      <MathematicalBackground />    
      {/* Main Content with Glass Effect */}
      <div className="relative z-10 space-y-0">
        <Hero />
         <div className="py-8 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-slate-900/50 dark:to-indigo-900/50" >
          <NewsWebinarsSection />
        </div>
          <div className="py-8 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-slate-900/50 dark:to-indigo-900/50" >
          <EduDarshiYoutubeSection />
        </div>
        <div className="py-8 bg-white/30 dark:bg-slate-900/30 ">
          <WhyChoose />
        </div>
          <div className="py-8 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-slate-900/50 dark:to-indigo-900/50">
          <PricingCard /> 
        </div>
        <div className="py-8"> 
          <TopInstitutes />
        </div>
        <div className="py-8 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-slate-900/50 dark:to-indigo-900/50">
          <MentorCard />
        </div>
        <div className="py-8">
          <ReviewCard />
        </div>
      
     
        <div className="pt-8">
          <ContactSection />
        </div>
           <div className="py-8">
          <FAQ />
        </div>
      </div>
    </div>
  );
}
