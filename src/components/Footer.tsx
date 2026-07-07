import Link from "next/link";

const links = [
  { label: "Guides", href: "/guides" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Privacy", href: "/privacy" },
  { label: "Contact", href: "mailto:hello@justwannaleave.com" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <Link className="logo" href="/">
            justwannaleave<span className="dot">.</span>
          </Link>
          <div className="footer__links">
            {links.map((l) =>
              l.href.startsWith("mailto:") ? (
                <a key={l.label} href={l.href}>
                  {l.label}
                </a>
              ) : (
                <Link key={l.label} href={l.href}>
                  {l.label}
                </Link>
              )
            )}
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
