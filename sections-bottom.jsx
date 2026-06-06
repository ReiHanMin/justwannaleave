// Bottom-of-page sections: Map wrapper, Guides, Stories, Email capture, Footer
const { useState: useStateBot } = React;

function MapSection() {
  return (
    <section className="section map-sec" id="map">
      <div className="wrap">
        <div className="sec-head">
          <span className="kicker">The tool nobody else built</span>
          <h2 className="h-sec">Not all Italian regions are equal. <em>Here's the difference.</em></h2>
          <p className="sec-sub">
            Italy's DSU scholarship is administered region by region — so the stipend amount, the income
            threshold, and your odds of actually getting it swing a lot depending on where you study.
            This map shows you where.
          </p>
        </div>
        <ItalyMap />
      </div>
    </section>
  );
}

function Guides() {
  const guides = window.JWL.guides;
  return (
    <section className="section" id="guides">
      <div className="wrap">
        <div className="sec-head">
          <span className="kicker">Latest guides</span>
          <h2 className="h-sec">The stuff <em>nobody else</em> writes.</h2>
          <p className="sec-sub">No fluff. No "ten reasons to study abroad." Just the practical information you need to actually do this.</p>
        </div>
        <div className="guides">
          {guides.map((g, i) => (
            <a className="guide" href="#signup" key={i}>
              <span className="guide__num">{String(i + 1).padStart(2, "0")}</span>
              <div className="guide__body">
                <span className={"tag tag--" + g.tone}>{g.tag}</span>
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

function Stories() {
  const stories = window.JWL.stories;
  return (
    <section className="section section--alt" id="stories">
      <div className="wrap">
        <div className="sec-head">
          <span className="kicker">Receipts</span>
          <h2 className="h-sec">People who <em>actually did it</em>.</h2>
          <p className="sec-sub">Not influencers. Not a brochure. Real names, real US states, real numbers.</p>
        </div>
        <div className="stories">
          {stories.map((s, i) => (
            <figure className="story" key={i}>
              <div className="story__mark">"</div>
              <blockquote className="story__quote">{s.quote}</blockquote>
              <figcaption className="story__who">
                <span className="story__avatar" aria-hidden="true">{s.name[0]}</span>
                <span>
                  <span className="story__name">{s.name}, {s.age}</span><br/>
                  <span className="story__loc">{s.place}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function EmailCapture() {
  const [email, setEmail] = useStateBot("");
  const [state, setState] = useStateBot("idle"); // idle | bad | done
  const submit = (e) => {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    setState(ok ? "done" : "bad");
  };
  return (
    <section className="section capture" id="signup">
      <div className="wrap capture__in">
        <div>
          <span className="kicker">Stay ahead of the deadline</span>
          <h2>The <em>bando</em> changes every year.<br/>We'll tell you when it does.</h2>
          <p>Sign up and get the full regional breakdown — plus deadline reminders sent before it's too late to apply.</p>
        </div>

        {state === "done" ? (
          <div className="form form--done">
            <div className="tick">✓</div>
            <h3 style={{ fontFamily: "var(--f-display)", fontWeight: 800, fontSize: 24, margin: "0 0 8px" }}>You're on the list.</h3>
            <p style={{ color: "var(--ink-soft)", margin: 0, fontSize: 15 }}>Check your inbox for the regional breakdown. We'll only email when the bando actually moves.</p>
          </div>
        ) : (
          <form className="form" onSubmit={submit} noValidate>
            <label htmlFor="jwl-email">Your email</label>
            <div className="form__row">
              <input
                id="jwl-email"
                type="email"
                placeholder="you@email.com"
                value={email}
                className={state === "bad" ? "err" : ""}
                onChange={(e) => { setEmail(e.target.value); if (state === "bad") setState("idle"); }}
                aria-invalid={state === "bad"}
              />
              <button className="btn btn--primary" type="submit">Get access — it's free</button>
            </div>
            <div className={"form__msg" + (state === "bad" ? " bad" : "")}>
              {state === "bad" ? "That doesn't look like an email — mind checking?" : "Free, forever. The guide is the product, not you."}
            </div>
            <div className="form__reassure">🔒 No spam. One email per month. Unsubscribe anytime.</div>
          </form>
        )}
      </div>
    </section>
  );
}

function Footer() {
  const links = ["About", "Disclaimer", "Privacy", "Contact"];
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <a className="logo" href="#top">justwannaleave<span className="dot">.</span></a>
          <div className="footer__links">
            {links.map(l => <a key={l} href="#signup">{l}</a>)}
          </div>
        </div>
        <div className="footer__fine">
          Information only — we're a guide, not an agency, and we're not affiliated with any government.
          Programmes, figures and deadlines change; always verify with official sources before you act.<br/>
          © 2026 Just Wanna Leave. Made for people who just wanna leave.
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { MapSection, Guides, Stories, EmailCapture, Footer });
