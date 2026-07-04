import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section">
      <div className="wrap">
        <span className="kicker">404</span>
        <h1 className="h-sec">
          This page <em>already left</em>.
        </h1>
        <p className="sec-sub" style={{ marginBottom: 28 }}>
          Whatever was here doesn&apos;t exist — or never did. The stuff that
          does exist is worth a look though.
        </p>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Link className="btn btn--primary" href="/">
            Back home <span className="arr">→</span>
          </Link>
          <Link className="btn btn--ghost" href="/guides">
            Read the guides
          </Link>
        </div>
      </div>
    </main>
  );
}
