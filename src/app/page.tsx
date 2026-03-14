"use client";

import { Box } from "@mui/material";
import Navbar from "./components/Navbar";
import CryptoTicker from "@/app/components/widgets/CryptoTicker";
import Hero from "./components/Hero";
import VideoSection from "./components/VideoSection";
import TradeSection from "./components/TradeSection";
import FeatureCards from "./components/FeatureCards";
import WhyPrimeMax from "./components/WhyPrimeMax";
import LiveChartSection from "./components/LiveChartSection";
import CommunitySection from "./components/CommunitySection";
import Advisor from "./components/advisor";
import PrinciplesSection from "./components/PrinciplesSection";
import MarketOverviewSection from "./components/MarketOverviewSection";
import ServicesSection from "./components/ServicesSection";
import TestimonialsSection from "./components/TestimonialsSection";
import CreditCard from "./components/CreditCard";
import MissionSection from "./components/MissionSection";
import PlansSection from "./components/PlansSection";
import TradingHero from "./components/TradingHero";
import FAQSection from "./components/FAQSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <Box sx={{ bgcolor: "var(--background)" }}>
      <Navbar />
      <CryptoTicker />
      <Hero />
      <VideoSection />
      {/* <CryptoStats /> */}
      <TradeSection />
      <FeatureCards />
      <WhyPrimeMax />
      <LiveChartSection />
      <CommunitySection />
      <Advisor />
      <PrinciplesSection />
      <MarketOverviewSection />
      <ServicesSection />
      <TestimonialsSection />
      <CreditCard />
      <MissionSection />
      <PlansSection />
      <TradingHero />
      <FAQSection />
      <Footer />
    </Box>
  );
}
