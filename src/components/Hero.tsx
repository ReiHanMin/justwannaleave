export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="wrap hero__grid">
        <div>
          <span className="kicker">Plan your exit strategy here</span>
          <h1 className="h-display">
            Study in Europe.
            <br />
            <em>For free.</em> <span className="strike">No, really.</span>
          </h1>
          <p className="hero__sub">
            A dozen governments will fund your degree — tuition, and sometimes
            your rent and meals too. Almost nobody back home tells you this. We
            did the research so you can actually do it.
          </p>
          <div className="hero__cta">
            <a className="btn btn--primary" href="#countries">
              Explore your options <span className="arr">→</span>
            </a>
            <a className="btn btn--ghost" href="#map">
              How does this actually work?
            </a>
          </div>
          <p className="hero__fine">
            <b>*</b> Yes, there are catches. We explain those too.
          </p>
        </div>

        <aside className="hero__card" aria-label="Sample first-year cost comparison">
          <h4>First year, the honest math</h4>
          <div className="receipt">
            <div className="receipt__row">
              <span>Tuition (German public uni)</span>
              <span>€0</span>
            </div>
            <div className="receipt__row">
              <span>Semester admin fee</span>
              <span>€350</span>
            </div>
            <div className="receipt__row">
              <span>Rent + food (DSU covered)</span>
              <span>−€5,800</span>
            </div>
            <div className="receipt__row">
              <span>Flights, visa, setup</span>
              <span>€1,600</span>
            </div>
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
