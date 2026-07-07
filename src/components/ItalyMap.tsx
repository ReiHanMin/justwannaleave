"use client";

import { useRef, useState } from "react";
import { MAP_GEOMETRY, MAP_VIEWBOX } from "@/lib/map-geometry";
import { CURRENT_ACADEMIC_YEAR, type RegionDSU, type RegionStatus } from "@/lib/dsu";

const STATUS_META: Record<RegionStatus, { label: string; chip: string }> = {
  live: { label: "2026/27 bando open now", chip: "green" },
  soon: { label: "Agency verified — bando expected", chip: "amber" },
  unknown: { label: "Not yet verified by us", chip: "gray" },
};

function eur(n: number | null): string | null {
  if (n == null) return null;
  return "€" + Math.round(n).toLocaleString("en-US");
}

function fmtDate(iso: string | null): string | null {
  if (!iso) return null;
  return new Date(iso + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ItalyMap({ regions }: { regions: RegionDSU[] }) {
  const [active, setActive] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // On stacked (mobile) layout the panel sits below the map — bring it into
  // view on selection, or a tap appears to do nothing.
  const select = (code: string | null) => {
    setActive(code);
    if (code && typeof window !== "undefined" && window.innerWidth <= 900) {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      requestAnimationFrame(() => {
        panelRef.current?.scrollIntoView({
          behavior: reduced ? "auto" : "smooth",
          block: "nearest",
        });
      });
    }
  };

  const byCode = new Map(regions.map((r) => [r.code, r]));
  const sel = active ? (byCode.get(active) ?? null) : null;
  // Only current-year figures render; prior-year baselines stay internal.
  const fig =
    sel?.figures.find((f) => f.yearLabel === CURRENT_ACADEMIC_YEAR) ?? null;
  const applyUrl =
    fig?.bando_url ??
    sel?.agencies.find((a) => a.bando_page_url)?.bando_page_url ??
    sel?.agencies.find((a) => a.website_url)?.website_url ??
    null;

  return (
    <div className="map-grid">
      {/* LEFT — the map */}
      <div>
        <div className="map-stage">
          <svg
            className={"map-svg" + (active ? " has-active" : "")}
            viewBox={MAP_VIEWBOX}
            role="img"
            aria-label="Map of Italy by region, colour-coded by 2026/27 scholarship bando status"
          >
            {MAP_GEOMETRY.map((g) => {
              const data = byCode.get(g.code);
              const status: RegionStatus = data?.status ?? "unknown";
              return (
                <g
                  key={g.code}
                  className={"region" + (active === g.code ? " is-active" : "")}
                  onClick={() => select(g.code === active ? null : g.code)}
                  role="button"
                  aria-label={(data?.name ?? g.code) + " — " + STATUS_META[status].label}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      select(g.code === active ? null : g.code);
                    }
                  }}
                >
                  <polygon className={`tier-${status}-f`} points={g.points} />
                  <text className="region__lab" x={g.label[0]} y={g.label[1]}>
                    {g.code}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="legend">
            {(Object.keys(STATUS_META) as RegionStatus[]).map((k) => (
              <div className="legend__row" key={k}>
                <span className={`legend__sw tier-${k}-bg`} />
                {STATUS_META[k].label}
              </div>
            ))}
          </div>
        </div>
        <p className="map-hint">
          ↳ Tap any region for verified amounts, deadlines &amp; where to apply
        </p>
      </div>

      {/* RIGHT — detail panel */}
      <div className="rpanel" ref={panelRef}>
        {!sel && (
          <div className="rpanel__empty">
            <p className="big">
              Pick a region.
              <br />
              The rules aren&apos;t the same.
            </p>
            <p>
              Italy&apos;s DSU scholarship is run by ~28 regional agencies. Award
              amounts, income ceilings and deadlines are set region by region —
              we verify each one against the official bando.
            </p>
            <p className="arrow-note">Start with the green ones — their 2026/27 bandi are open now.</p>
          </div>
        )}
        {sel && (
          <>
            <button
              className="rpanel__close"
              onClick={() => setActive(null)}
              aria-label="Close"
            >
              ×
            </button>
            <span className={"rpanel__tierbar " + STATUS_META[sel.status].chip}>
              <span className={`d tier-${sel.status}-bg`} />
              {STATUS_META[sel.status].label}
            </span>
            <h3 className="rpanel__name">{sel.name}</h3>
            <p className="rpanel__sub">
              {sel.agencies.length > 0
                ? sel.agencies.map((a) => a.name).join(" · ")
                : "Administering agency being confirmed"}
            </p>

            {fig ? (
              <>
                <div className="rpanel__stats">
                  {eur(fig.award_fuori_sede) ? (
                    <>
                      <div className="rstat">
                        <div className="rstat__lab">Away-from-home award ({fig.yearLabel})</div>
                        <div className="rstat__val">{eur(fig.award_fuori_sede)}</div>
                      </div>
                      <div className="rstat">
                        <div className="rstat__lab">Commuter / local</div>
                        <div className="rstat__val">
                          {eur(fig.award_pendolare) ?? "—"}
                          <span className="rstat__minor"> / {eur(fig.award_in_sede) ?? "—"}</span>
                        </div>
                      </div>
                    </>
                  ) : fig.isee_ceiling ? (
                    <>
                      <div className="rstat">
                        <div className="rstat__lab">Income ceiling — ISEE ({fig.yearLabel})</div>
                        <div className="rstat__val">{eur(fig.isee_ceiling)}</div>
                      </div>
                      <div className="rstat">
                        <div className="rstat__lab">Asset ceiling — ISPE</div>
                        <div className="rstat__val">{eur(fig.ispe_ceiling) ?? "—"}</div>
                      </div>
                    </>
                  ) : (
                    <div className="rstat">
                      <div className="rstat__lab">Award amounts</div>
                      <div className="rstat__val odds">In the bando</div>
                    </div>
                  )}
                  <div className="rstat">
                    <div className="rstat__lab">Application deadline</div>
                    <div className="rstat__val odds">
                      {fmtDate(fig.application_deadline) ?? "See bando"}
                    </div>
                  </div>
                </div>

                {fig.verified_at && (
                  <p className="rpanel__verified">
                    ✓ Verified{" "}
                    {new Date(fig.verified_at).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                    {fig.source_url && (
                      <>
                        {" · "}
                        <a href={fig.source_url} target="_blank" rel="noopener noreferrer">
                          source ↗
                        </a>
                      </>
                    )}
                  </p>
                )}
              </>
            ) : (
              <p className="rpanel__note">
                {sel.status === "soon"
                  ? "The agency is confirmed but its 2026/27 bando hasn't been published (or verified by us) yet. Most bandi drop June–September."
                  : "We haven't verified this region yet — it's in the research queue. Nothing here is worse or better; we just don't publish numbers we haven't checked."}
              </p>
            )}

            {fig && (
              <p className="rpanel__gloss">
                ISEE is Italy&apos;s household means-test number — think FAFSA.
                US applicants get an equivalent (&ldquo;ISEE parificato&rdquo;)
                calculated from family income documents.
              </p>
            )}

            {applyUrl && (
              <a
                className="btn btn--primary btn--sm rpanel__cta"
                href={applyUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Official bando page (in Italian) ↗
              </a>
            )}
          </>
        )}
      </div>
    </div>
  );
}
