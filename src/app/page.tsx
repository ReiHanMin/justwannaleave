import Hero from "@/components/Hero";
import StatStrip from "@/components/StatStrip";
import CountryCards from "@/components/CountryCards";
import MapSection from "@/components/MapSection";
import Guides from "@/components/Guides";
import Stories from "@/components/Stories";
import EmailCapture from "@/components/EmailCapture";

export const revalidate = 60;

export default function Home() {
  return (
    <>
      <Hero />
      <StatStrip />
      <CountryCards />
      <MapSection />
      <Guides />
      <Stories />
      <EmailCapture />
    </>
  );
}
