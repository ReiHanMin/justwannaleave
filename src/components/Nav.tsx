"use client";

export default function Nav() {
  const links = [
    { label: "Countries", href: "#countries" },
    { label: "The Map", href: "#map" },
    { label: "Guides", href: "#guides" },
    { label: "Stories", href: "#stories" },
  ];

  return (
    <nav className="nav">
      <div className="wrap nav__in">
        <a className="logo" href="#top">
          justwannaleave<span className="dot">.</span>
        </a>
        <div className="nav__links">
          {links.map((l) => (
            <a key={l.label} href={l.href}>
              {l.label}
            </a>
          ))}
          <a className="btn btn--primary btn--sm" href="#signup">
            Get the free guide
          </a>
        </div>
        <button
          className="nav__burger"
          aria-label="Menu"
          onClick={() => {
            const t = document.querySelector("#countries");
            if (t) window.scrollTo({ top: (t as HTMLElement).offsetTop - 60, behavior: "smooth" });
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
