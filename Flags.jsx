// Simple, reliable SVG country flags (emoji flags don't render on all platforms).
function Flag({ code }) {
  const common = { width: "100%", height: "100%", viewBox: "0 0 60 40", preserveAspectRatio: "none" };
  let inner = null;
  if (code === "IT") {
    inner = (<g>
      <rect x="0" y="0" width="20" height="40" fill="#149954"/>
      <rect x="20" y="0" width="20" height="40" fill="#fff"/>
      <rect x="40" y="0" width="20" height="40" fill="#CD212A"/>
    </g>);
  } else if (code === "DE") {
    inner = (<g>
      <rect x="0" y="0" width="60" height="13.34" fill="#111"/>
      <rect x="0" y="13.34" width="60" height="13.33" fill="#DD0000"/>
      <rect x="0" y="26.67" width="60" height="13.33" fill="#FFCE00"/>
    </g>);
  } else if (code === "JP") {
    inner = (<g>
      <rect x="0" y="0" width="60" height="40" fill="#fff"/>
      <circle cx="30" cy="20" r="11" fill="#BC002D"/>
    </g>);
  } else if (code === "NO") {
    inner = (<g>
      <rect x="0" y="0" width="60" height="40" fill="#BA0C2F"/>
      <rect x="16" y="0" width="10" height="40" fill="#fff"/>
      <rect x="0" y="15" width="60" height="10" fill="#fff"/>
      <rect x="18.5" y="0" width="5" height="40" fill="#00205B"/>
      <rect x="0" y="17.5" width="60" height="5" fill="#00205B"/>
    </g>);
  } else if (code === "FR") {
    inner = (<g>
      <rect x="0" y="0" width="20" height="40" fill="#0055A4"/>
      <rect x="20" y="0" width="20" height="40" fill="#fff"/>
      <rect x="40" y="0" width="20" height="40" fill="#EF4135"/>
    </g>);
  } else if (code === "TW") {
    // red field, blue canton, simplified white 12-ray sun
    const rays = [];
    for (let i = 0; i < 12; i++) {
      const a = (i * 30) * Math.PI / 180;
      const cx = 15, cy = 10, r1 = 3.4, r2 = 7;
      const w = 0.32;
      const p = (rad, ang) => [cx + rad * Math.cos(ang), cy + rad * Math.sin(ang)];
      const a1 = a - w, a2 = a + w;
      const [x1, y1] = p(r1, a1), [x2, y2] = p(r2, a);
      const [x3, y3] = p(r1, a2);
      rays.push(<polygon key={i} points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`} fill="#fff"/>);
    }
    inner = (<g>
      <rect x="0" y="0" width="60" height="40" fill="#FE0000"/>
      <rect x="0" y="0" width="30" height="20" fill="#000095"/>
      {rays}
      <circle cx="15" cy="10" r="3.4" fill="#fff"/>
      <circle cx="15" cy="10" r="2.4" fill="#000095"/>
    </g>);
  }
  return <svg {...common} aria-hidden="true">{inner}</svg>;
}

window.Flag = Flag;
