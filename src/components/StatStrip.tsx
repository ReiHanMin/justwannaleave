const stats = [
  { num: "$0", unit: "", lab: "tuition at German public universities, even for international students" },
  { num: "€6,600", unit: "/yr", lab: "max stipend Italy pays low-income students just to study there" },
  { num: "12", unit: "+", lab: "countries where you can study free or heavily subsidised" },
];

export default function StatStrip() {
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
