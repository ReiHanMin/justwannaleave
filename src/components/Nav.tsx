"use client";

import Link from "next/link";

export default function Nav() {
  const links = [
    { label: "Countries", href: "/#countries" },
    { label: "The Map", href: "/#map" },
    { label: "Guides", href: "/guides" },
    { label: "Stories", href: "/#stories" },
  ];

  return (
    <nav className="nav">
      <div className="wrap nav__in">
        <Link className="logo" href="/">
          justwannaleave<span className="dot">.</span>
        </Link>
        <div className="nav__links">
          {links.map((l) => (
            <Link key={l.label} href={l.href}>
              {l.label}
            </Link>
          ))}
          <Link className="btn btn--primary btn--sm" href="/#signup">
            Get the free guide
          </Link>
        </div>
        <Link className="nav__burger" href="/guides" aria-label="Guides">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </Link>
      </div>
    </nav>
  );
}
