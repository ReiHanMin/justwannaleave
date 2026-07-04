import Link from "next/link";
import type { Metadata } from "next";
import { getAllGuides } from "@/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Guides — Just Wanna Leave",
  description:
    "Practical, honest guides on studying abroad for free. DSU scholarships, MEXT, Germany tuition — no fluff.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function GuidesPage() {
  const guides = await getAllGuides();

  return (
    <main>
      <div className="guides-hero">
        <div className="wrap">
          <span className="kicker">All guides</span>
          <h1 className="h-sec">
            The stuff <em>nobody else</em> writes.
          </h1>
          <p className="sec-sub">
            No fluff. No &ldquo;ten reasons to study abroad.&rdquo; Just the
            practical information you need to actually do this.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          {guides.length === 0 ? (
            <p className="guides-empty">
              Guides are being written — check back soon, or{" "}
              <Link href="/#signup">sign up to be notified</Link>.
            </p>
          ) : (
            <div className="guides">
              {guides.map((g, i) => (
                <Link className="guide" href={`/guides/${g.slug.current}`} key={g._id}>
                  <span className="guide__num">{String(i + 1).padStart(2, "0")}</span>
                  <div className="guide__body">
                    <span className={`tag tag--${g.tagColor || "green"}`}>{g.tag}</span>
                    <h2 className="guide__title">{g.title}</h2>
                    <div className="guide__meta">
                      {g.readTime && <span>{g.readTime} read</span>}
                      {g.publishedAt && <span>Updated {formatDate(g.publishedAt)}</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
