import { getUpcomingDeadlines, type UpcomingDeadline } from "@/lib/dsu";

function daysLeft(iso: string): number {
  const due = new Date(iso + "T23:59:59").getTime();
  return Math.max(0, Math.ceil((due - Date.now()) / 86_400_000));
}

function fmt(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

export default async function DeadlineStrip() {
  let items: UpcomingDeadline[] = [];
  try {
    items = await getUpcomingDeadlines(3);
  } catch {
    // DB unreachable — strip simply doesn't render
  }
  if (items.length === 0) return null;

  return (
    <aside className="dstrip" aria-label="Upcoming scholarship deadlines">
      <div className="wrap dstrip__in">
        <span className="dstrip__label">Live deadlines</span>
        {items.map((d) => {
          const days = daysLeft(d.due_on);
          const inner = (
            <>
              <b>{d.label}</b>
              <span className="dstrip__when">
                {fmt(d.due_on)} · {days === 0 ? "today" : `${days} days left`}
              </span>
            </>
          );
          return d.url ? (
            <a
              className="dstrip__item"
              key={d.label}
              href={d.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {inner}
            </a>
          ) : (
            <span className="dstrip__item" key={d.label}>
              {inner}
            </span>
          );
        })}
      </div>
    </aside>
  );
}
