"use client";

import { useState } from "react";
import Link from "next/link";

const links = [
  { label: "Countries", href: "/#countries" },
  { label: "The Map", href: "/#map" },
  { label: "Guides", href: "/guides" },
  { label: "Stories", href: "/#stories" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="wrap nav__in">
        <Link className="logo" href="/" onClick={() => setOpen(false)}>
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
        <button
          className="nav__burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div className="nav__menu" id="mobile-menu">
          <div className="wrap nav__menu-in">
            {links.map((l) => (
              <Link key={l.label} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            <Link
              className="btn btn--primary"
              href="/#signup"
              onClick={() => setOpen(false)}
            >
              Get the free guide
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
