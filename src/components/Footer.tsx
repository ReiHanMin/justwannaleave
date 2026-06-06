const links = ["About", "Disclaimer", "Privacy", "Contact"];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <a className="logo" href="#top">
            justwannaleave<span className="dot">.</span>
          </a>
          <div className="footer__links">
            {links.map((l) => (
              <a key={l} href="#signup">
                {l}
              </a>
            ))}
          </div>
        </div>
        <div className="footer__fine">
          Information only — we&apos;re a guide, not an agency, and we&apos;re
          not affiliated with any government. Programmes, figures and deadlines
          change; always verify with official sources before you act.
          <br />
          &copy; 2026 Just Wanna Leave. Made for people who just wanna leave.
        </div>
      </div>
    </footer>
  );
}
