import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { getGuideBySlug, getGuideSlugs } from "@/lib/queries";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getGuideSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);
  if (!guide) return {};
  return {
    title: `${guide.title} — Just Wanna Leave`,
    description: guide.excerpt,
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const ptComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
  types: {
    callout: ({ value }) => (
      <div className={`callout callout--${value.tone || "info"}`}>
        {value.text}
      </div>
    ),
  },
};

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);

  if (!guide) notFound();

  return (
    <main>
      <article className="article">
        <header className="article__header">
          <div className="wrap article__header-in">
            <Link className="article__back" href="/guides">
              ← All guides
            </Link>
            <span className={`tag tag--${guide.tagColor || "green"}`}>
              {guide.tag}
            </span>
            <h1 className="article__title">{guide.title}</h1>
            {guide.excerpt && (
              <p className="article__excerpt">{guide.excerpt}</p>
            )}
            <div className="article__meta">
              {guide.readTime && <span>{guide.readTime} read</span>}
              {guide.publishedAt && (
                <span>Updated {formatDate(guide.publishedAt)}</span>
              )}
            </div>
          </div>
        </header>

        {guide.body && (
          <div className="wrap">
            <div className="article__body">
              <PortableText value={guide.body as Parameters<typeof PortableText>[0]["value"]} components={ptComponents} />
            </div>
          </div>
        )}

        <footer className="article__footer">
          <div className="wrap">
            <p className="article__disclaimer">
              Figures and deadlines change every year. Always verify with the
              official DSU bando or the relevant government body before you act.
            </p>
            <div className="article__cta-row">
              <Link className="btn btn--primary" href="/#signup">
                Get deadline reminders <span className="arr">→</span>
              </Link>
              <Link className="btn btn--ghost" href="/guides">
                More guides
              </Link>
            </div>
          </div>
        </footer>
      </article>
    </main>
  );
}
