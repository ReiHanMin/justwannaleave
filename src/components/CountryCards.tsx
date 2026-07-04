import Flag from "@/components/Flag";
import { countries } from "@/lib/data";

export default function CountryCards() {
  return (
    <section className="section" id="countries">
      <div className="wrap">
        <div className="sec-head">
          <span className="kicker">Where to look</span>
          <h2 className="h-sec">
            Pick a country. We&apos;ll tell you <em>everything</em>.
          </h2>
          <p className="sec-sub">
            Not the clickbait version. The real version — income thresholds,
            what you actually get, and what the catch is.
          </p>
        </div>
        <div className="cards">
          {countries.map((c) => (
            <article className="ccard" key={c.code}>
              <div className="ccard__top">
                <span className="ccard__flag">
                  <Flag code={c.code} />
                </span>
                <span className="ccard__tier">{c.tier}</span>
              </div>
              <h3 className="ccard__name">{c.name}</h3>
              <div className="ccard__hook">&ldquo;{c.hook}&rdquo;</div>
              <p className="ccard__blurb">{c.blurb}</p>
              <div className="ccard__foot">
                <div className="ccard__big">{c.headline}</div>
                <div className="ccard__catch">
                  <b>Catch:</b> {c.catch}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
