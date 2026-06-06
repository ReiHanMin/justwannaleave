type FlagCode = "IT" | "DE" | "JP" | "NO" | "FR" | "TW";

interface FlagProps {
  code: FlagCode | string;
}

export default function Flag({ code }: FlagProps) {
  const common = {
    width: "100%",
    height: "100%",
    viewBox: "0 0 60 40",
    preserveAspectRatio: "none" as const,
    "aria-hidden": true,
  };

  if (code === "IT") {
    return (
      <svg {...common}>
        <rect x="0" y="0" width="20" height="40" fill="#149954" />
        <rect x="20" y="0" width="20" height="40" fill="#fff" />
        <rect x="40" y="0" width="20" height="40" fill="#CD212A" />
      </svg>
    );
  }
  if (code === "DE") {
    return (
      <svg {...common}>
        <rect x="0" y="0" width="60" height="13.34" fill="#111" />
        <rect x="0" y="13.34" width="60" height="13.33" fill="#DD0000" />
        <rect x="0" y="26.67" width="60" height="13.33" fill="#FFCE00" />
      </svg>
    );
  }
  if (code === "JP") {
    return (
      <svg {...common}>
        <rect x="0" y="0" width="60" height="40" fill="#fff" />
        <circle cx="30" cy="20" r="11" fill="#BC002D" />
      </svg>
    );
  }
  if (code === "NO") {
    return (
      <svg {...common}>
        <rect x="0" y="0" width="60" height="40" fill="#BA0C2F" />
        <rect x="16" y="0" width="10" height="40" fill="#fff" />
        <rect x="0" y="15" width="60" height="10" fill="#fff" />
        <rect x="18.5" y="0" width="5" height="40" fill="#00205B" />
        <rect x="0" y="17.5" width="60" height="5" fill="#00205B" />
      </svg>
    );
  }
  if (code === "FR") {
    return (
      <svg {...common}>
        <rect x="0" y="0" width="20" height="40" fill="#0055A4" />
        <rect x="20" y="0" width="20" height="40" fill="#fff" />
        <rect x="40" y="0" width="20" height="40" fill="#EF4135" />
      </svg>
    );
  }
  if (code === "TW") {
    const cx = 15, cy = 10;
    const rays = Array.from({ length: 12 }, (_, i) => {
      const a = (i * 30 * Math.PI) / 180;
      const r1 = 3.4, r2 = 7, w = 0.32;
      const pt = (r: number, ang: number): [number, number] => [
        cx + r * Math.cos(ang),
        cy + r * Math.sin(ang),
      ];
      const [x1, y1] = pt(r1, a - w);
      const [x2, y2] = pt(r2, a);
      const [x3, y3] = pt(r1, a + w);
      return (
        <polygon
          key={i}
          points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`}
          fill="#fff"
        />
      );
    });
    return (
      <svg {...common}>
        <rect x="0" y="0" width="60" height="40" fill="#FE0000" />
        <rect x="0" y="0" width="30" height="20" fill="#000095" />
        {rays}
        <circle cx={cx} cy={cy} r="3.4" fill="#fff" />
        <circle cx={cx} cy={cy} r="2.4" fill="#000095" />
      </svg>
    );
  }
  return null;
}
