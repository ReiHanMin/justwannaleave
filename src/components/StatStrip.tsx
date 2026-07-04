interface StatStripProps {
  italyAward?: number | null;
}

export default function StatStrip({ italyAward }: StatStripProps) {
  const italyStat = italyAward
    ? {
        num: "€" + Math.round(italyAward).toLocaleString("en-US"),
        unit: "/yr",
        lab: "verified 2026/27 scholarship for an away-from-home student in Emilia-Romagna",
      }
    : {
        num: "€7,072",
        unit: "/yr",
        lab: "minimum away-from-home scholarship set by national decree for 2026/27",
      };

  const stats = [
    {
      num: "$0",
      unit: "",
      lab: "tuition at German public universities, even for international students",
    },
    italyStat,
    {
      num: "12",
      unit: "+",
      lab: "countries where you can study free or heavily subsidised",
    },
  ];

  return (
    <section className="stats">
      <div className="wrap stats__grid">
        {stats.map((s, i) => (
          <div className="stat" key={i}>
            <div className="stat__num">
              {s.num}
              <span className="u">{s.unit}</span>
            </div>
            <div className="stat__lab">{s.lab}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
