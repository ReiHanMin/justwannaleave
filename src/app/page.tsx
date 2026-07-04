import Hero from "@/components/Hero";
import StatStrip from "@/components/StatStrip";
import DeadlineStrip from "@/components/DeadlineStrip";
import CountryCards from "@/components/CountryCards";
import MapSection from "@/components/MapSection";
import Guides from "@/components/Guides";
import Stories from "@/components/Stories";
import EmailCapture from "@/components/EmailCapture";
import { getMaxVerifiedAward } from "@/lib/dsu";

export const revalidate = 60;

export default async function Home() {
  let italyAward: number | null = null;
  try {
    italyAward = await getMaxVerifiedAward();
  } catch {
    // DB unreachable — StatStrip falls back to the decree minimum
  }

  return (
    <>
      <Hero />
      <StatStrip italyAward={italyAward} />
      <DeadlineStrip />
      <CountryCards />
      <MapSection />
      <Guides />
      <Stories />
      <EmailCapture />
    </>
  );
}
