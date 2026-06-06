import ItalyMap from "@/components/ItalyMap";

export default function MapSection() {
  return (
    <section className="section map-sec" id="map">
      <div className="wrap">
        <div className="sec-head">
          <span className="kicker">The tool nobody else built</span>
          <h2 className="h-sec">
            Not all Italian regions are equal.{" "}
            <em>Here&apos;s the difference.</em>
          </h2>
          <p className="sec-sub">
            Italy&apos;s DSU scholarship is administered region by region — so
            the stipend amount, the income threshold, and your odds of actually
            getting it swing a lot depending on where you study. This map shows
            you where.
          </p>
        </div>
        <ItalyMap />
      </div>
    </section>
  );
}
