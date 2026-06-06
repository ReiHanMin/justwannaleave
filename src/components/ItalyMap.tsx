"use client";

import { useState } from "react";
import { regions, tierMeta } from "@/lib/data";

export default function ItalyMap() {
  const [active, setActive] = useState<string | null>(null);
  const sel = regions.find((r) => r.id === active) ?? null;

  return (
    <div className="map-grid">
      {/* LEFT — the map */}
      <div>
        <div className="map-stage">
          <svg
            className={"map-svg" + (active ? " has-active" : "")}
            viewBox="80 64 462 620"
            role="img"
            aria-label="Map of Italy divided by region, colour-coded by scholarship funding odds"
          >
            {regions.map((r) => (
              <g
                key={r.id}
                className={"region" + (active === r.id ? " is-active" : "")}
                onClick={() => setActive(r.id === active ? null : r.id)}
                role="button"
                aria-label={r.name + " — " + tierMeta[r.tier].label}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActive(r.id === active ? null : r.id);
                  }
                }}
              >
                <polygon className={"tier-" + r.tier + "-f"} points={r.points} />
                <text className="region__lab" x={r.label[0]} y={r.label[1]}>
                  {r.id}
                </text>
              </g>
            ))}
          </svg>

          <div className="legend">
            {Object.entries(tierMeta).map(([k, m]) => (
              <div className="legend__row" key={k}>
                <span
                  className="legend__sw"
                  style={{ background: `var(--tier-${k})` }}
                />
                {m.label}
              </div>
            ))}
          </div>
        </div>
        <p className="map-hint">
          ↳ Tap any region for stipend, income threshold &amp; your real odds
        </p>
      </div>

      {/* RIGHT — detail panel */}
      <div className="rpanel">
        {!sel ? (
          <div className="rpanel__empty">
            <p className="big">
              Pick a region.
              <br />
              The numbers aren&apos;t the same.
            </p>
            <p>
              The DSU stipend, the income (ISEE) ceiling, and your actual odds
              of being funded all change depending on which region you study in.
            </p>
            <p className="arrow-note">
              ← Start with the green ones if you want certainty.
            </p>
          </div>
        ) : (
          <>
            <button
              className="rpanel__close"
              onClick={() => setActive(null)}
              aria-label="Close"
            >
              ×
            </button>
            <span className={`rpanel__tierbar ${sel.tier}`}>
              <span
                className="d"
                style={{ background: `var(--tier-${sel.tier})` }}
              />
              {tierMeta[sel.tier].label}
            </span>
            <h3 className="rpanel__name">{sel.name}</h3>
            <p className="rpanel__sub">
              DSU regional scholarship · illustrative figures
            </p>
            <div className="rpanel__stats">
              <div className="rstat">
                <div className="rstat__lab">Max annual stipend</div>
                <div className="rstat__val">{sel.stipend}</div>
              </div>
              <div className="rstat">
                <div className="rstat__lab">Income ceiling (ISEE)</div>
                <div className="rstat__val">{sel.isee}</div>
              </div>
              <div className="rstat">
                <div className="rstat__lab">Eligible applicants funded</div>
                <div className="rstat__val odds">{sel.odds}</div>
              </div>
            </div>
            <p className="rpanel__note">{sel.note}</p>
            <a className="btn btn--primary btn--sm rpanel__cta" href="#guides">
              Read the {sel.name} breakdown <span className="arr">→</span>
            </a>
          </>
        )}
      </div>
    </div>
  );
}
