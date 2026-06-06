import { guides } from "@/lib/data";

export default function Guides() {
  return (
    <section className="section" id="guides">
      <div className="wrap">
        <div className="sec-head">
          <span className="kicker">Latest guides</span>
          <h2 className="h-sec">
            The stuff <em>nobody else</em> writes.
          </h2>
          <p className="sec-sub">
            No fluff. No &ldquo;ten reasons to study abroad.&rdquo; Just the
            practical information you need to actually do this.
          </p>
        </div>
        <div className="guides">
          {guides.map((g, i) => (
            <a className="guide" href="#signup" key={i}>
              <span className="guide__num">{String(i + 1).padStart(2, "0")}</span>
              <div className="guide__body">
                <span className={`tag tag--${g.tone}`}>{g.tag}</span>
                <h3 className="guide__title">{g.title}</h3>
                <div className="guide__meta">
                  <span>{g.read} read</span>
                  <span>{g.updated}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
