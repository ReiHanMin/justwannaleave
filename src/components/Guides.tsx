import Link from "next/link";
import { getAllGuides } from "@/lib/queries";
import { guides as fallbackGuides } from "@/lib/data";

export default async function Guides() {
  let items: { href: string; tag: string; tone: string; title: string; read: string; updated: string }[] = [];

  try {
    const sanityGuides = await getAllGuides();
    if (sanityGuides.length > 0) {
      items = sanityGuides.map((g) => ({
        href: `/guides/${g.slug.current}`,
        tag: g.tag,
        tone: g.tagColor || "green",
        title: g.title,
        read: g.readTime || "",
        updated: g.publishedAt
          ? "Updated " + new Date(g.publishedAt).toLocaleDateString("en-GB", { month: "short", year: "numeric" })
          : "",
      }));
    }
  } catch {
    // Sanity not configured yet — fall back to static data
  }

  if (items.length === 0) {
    items = fallbackGuides.map((g) => ({
      href: "/guides",
      tag: g.tag,
      tone: g.tone,
      title: g.title,
      read: g.read,
      updated: g.updated,
    }));
  }

  return (
    <section className="section" id="guides">
      <div className="wrap">
        <div className="sec-head">
          <span className="kicker">Latest guides</span>
          <h2 className="h-sec">
            The stuff <em>nobody else</em> writes.
          </h2>
          <p className="sec-sub">
            No fluff. No &ldquo;ten reasons to study abroad.&rdquo; Just the
            practical information you need to actually do this.
          </p>
        </div>
        <div className="guides">
          {items.map((g, i) => (
            <Link className="guide" href={g.href} key={i}>
              <span className="guide__num">{String(i + 1).padStart(2, "0")}</span>
              <div className="guide__body">
                <span className={`tag tag--${g.tone}`}>{g.tag}</span>
                <h3 className="guide__title">{g.title}</h3>
                <div className="guide__meta">
                  {g.read && <span>{g.read} read</span>}
                  {g.updated && <span>{g.updated}</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
