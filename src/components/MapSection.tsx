import ItalyMap from "@/components/ItalyMap";
import { getItalyRegions, type RegionDSU } from "@/lib/dsu";

export default async function MapSection() {
  let regions: RegionDSU[] = [];
  try {
    regions = await getItalyRegions();
  } catch {
    // DB unreachable — map renders with all regions in "not yet verified" state
  }

  return (
    <section className="section map-sec" id="map">
      <div className="wrap">
        <div className="sec-head">
          <span className="kicker">The tool nobody else built</span>
          <h2 className="h-sec">
            Not all Italian regions are equal. <em>Here&apos;s the difference.</em>
          </h2>
          <p className="sec-sub">
            Italy&apos;s DSU scholarship is administered region by region — the
            award amounts, income ceilings and deadlines are all set locally.
            We check every figure against the official bando and show you only
            what we&apos;ve verified, with the source.
          </p>
        </div>
        <ItalyMap regions={regions} />
      </div>
    </section>
  );
}
