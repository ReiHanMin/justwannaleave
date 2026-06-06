// Top-of-page sections: Nav, Hero, Stat strip, Country cards
const { useState: useStateTop } = React;

function Nav() {
  const links = ["Countries", "The Map", "Guides", "Stories"];
  const hrefs = { "Countries": "#countries", "The Map": "#map", "Guides": "#guides", "Stories": "#stories" };
  return (
    <nav className="nav">
      <div className="wrap nav__in">
        <a className="logo" href="#top">justwannaleave<span className="dot">.</span></a>
        <div className="nav__links">
          {links.map(l => <a key={l} href={hrefs[l]}>{l}</a>)}
          <a className="btn btn--primary btn--sm" href="#signup">Get the free guide</a>
        </div>
        <button className="nav__burger" aria-label="Menu" onClick={() => { const t = document.querySelector('#countries'); if (t) window.scrollTo({ top: t.offsetTop - 60, behavior: 'smooth' }); }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header className="hero" id="top">
      <div className="wrap hero__grid">
        <div>
          <span className="kicker">Plan your exit strategy here</span>
          <h1 className="h-display">
            Study in Europe.<br/>
            <em>For free.</em> <span className="strike">No, really.</span>
          </h1>
          <p className="hero__sub">
            A dozen governments will fund your degree — tuition, and sometimes your rent and meals too.
            Almost nobody back home tells you this. We did the research so you can actually do it.
          </p>
          <div className="hero__cta">
            <a className="btn btn--primary" href="#countries">Explore your options <span className="arr">→</span></a>
            <a className="btn btn--ghost" href="#map">How does this actually work?</a>
          </div>
          <p className="hero__fine"><b>*</b> Yes, there are catches. We explain those too.</p>
        </div>

        <aside className="hero__card" aria-label="Sample first-year cost comparison">
          <h4>First year, the honest math</h4>
          <div className="receipt">
            <div className="receipt__row"><span>Tuition (German public uni)</span><span>€0</span></div>
            <div className="receipt__row"><span>Semester admin fee</span><span>€350</span></div>
            <div className="receipt__row"><span>Rent + food (DSU covered)</span><span>−€5,800</span></div>
            <div className="receipt__row"><span>Flights, visa, setup</span><span>€1,600</span></div>
            <div className="receipt__total">
              <span>You, roughly</span>
              <span className="big">≈ €0</span>
            </div>
          </div>
          <div className="receipt__stamp">Same year, US state school: $28,000+</div>
        </aside>
      </div>
    </header>
  );
}

function StatStrip() {
  const stats = [
    { num: "$0", unit: "", lab: "tuition at German public universities, even for international students" },
    { num: "€6,600", unit: "/yr", lab: "max stipend Italy pays low-income students just to study there" },
    { num: "12", unit: "+", lab: "countries where you can study free or heavily subsidised" },
  ];
  return (
    <section className="stats">
      <div className="wrap stats__grid">
        {stats.map((s, i) => (
          <div className="stat" key={i}>
            <div className="stat__num">{s.num}<span className="u">{s.unit}</span></div>
            <div className="stat__lab">{s.lab}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CountryCards() {
  const countries = window.JWL.countries;
  return (
    <section className="section" id="countries">
      <div className="wrap">
        <div className="sec-head">
          <span className="kicker">Where to look</span>
          <h2 className="h-sec">Pick a country. We'll tell you <em>everything</em>.</h2>
          <p className="sec-sub">Not the clickbait version. The real version — income thresholds, what you actually get, and what the catch is.</p>
        </div>
        <div className="cards">
          {countries.map(c => (
            <article className="ccard" key={c.code} onClick={() => { const t = document.querySelector('#guides'); if (t) window.scrollTo({ top: t.offsetTop - 60, behavior: 'smooth' }); }}>
              <div className="ccard__top">
                <span className="ccard__flag" aria-hidden="true"><Flag code={c.code} /></span>
                <span className="ccard__tier">{c.tier}</span>
              </div>
              <h3 className="ccard__name">{c.name}</h3>
              <div className="ccard__hook">"{c.hook}"</div>
              <p className="ccard__blurb">{c.blurb}</p>
              <div className="ccard__foot">
                <div className="ccard__big">{c.headline}</div>
                <div className="ccard__catch"><b>Catch:</b> {c.catch}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Nav, Hero, StatStrip, CountryCards });
