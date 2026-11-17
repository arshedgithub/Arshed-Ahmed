import type { ProjectFacts } from "@/lib/site";

/**
 * Redrawn, data-free schematics that stand in for product screenshots until real ones are supplied, and for
 * company work whose real screens can't be shown. Shapes only: no names, numbers or client details.
 * Always labelled "Illustration, not a screenshot" by the caller.
 */
export function ProjectSchematic({ kind }: { kind: ProjectFacts["schematic"] }) {
  return (
    <svg viewBox="0 0 320 200" aria-hidden="true" className="block size-full" preserveAspectRatio="xMidYMid slice">
      <rect width="320" height="200" className="fill-raised" />
      {kind === "marketplace" && <Pos />}
      {kind === "dashboard" && <Dashboard />}
      {kind === "editor" && <Editor />}
      {kind === "chat" && <Chat />}
    </svg>
  );
}

const line = "fill-line-strong";
const soft = "fill-line";
const card = "fill-surface stroke-line";
const accent = "fill-accent";

function Pos() {
  const tiles = [0, 1, 2].flatMap((r) => [0, 1, 2].map((c) => ({ x: 16 + c * 64, y: 40 + r * 50 })));
  return (
    <g>
      <rect x="16" y="14" width="120" height="14" rx="4" className={soft} />
      {tiles.map(({ x, y }, i) => (
        <g key={i}>
          <rect x={x} y={y} width="56" height="42" rx="6" className={card} />
          <rect x={x + 8} y={y + 8} width="22" height="14" rx="3" className={soft} />
          <rect x={x + 8} y={y + 28} width="34" height="5" rx="2" className={line} />
        </g>
      ))}
      <rect x="216" y="14" width="88" height="172" rx="8" className={card} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="226" y={30 + i * 22} width="44" height="5" rx="2" className={line} />
          <rect x="280" y={30 + i * 22} width="14" height="5" rx="2" className={soft} />
        </g>
      ))}
      <rect x="226" y="128" width="68" height="1" className={soft} />
      <rect x="226" y="140" width="30" height="6" rx="2" className={line} />
      <rect x="226" y="158" width="68" height="18" rx="5" className={accent} />
    </g>
  );
}

function Dashboard() {
  const bars = [46, 70, 38, 88, 62, 96, 74, 110, 84];
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={16 + i * 98} y="14" width="90" height="40" rx="6" className={card} />
          <rect x={26 + i * 98} y="24" width="34" height="5" rx="2" className={soft} />
          <rect x={26 + i * 98} y="36" width="50" height="9" rx="2" className={line} />
        </g>
      ))}
      <rect x="16" y="64" width="184" height="122" rx="6" className={card} />
      {bars.map((h, i) => (
        <rect key={i} x={30 + i * 18} y={176 - h} width="10" height={h} rx="2" className={i === 7 ? accent : soft} />
      ))}
      <rect x="208" y="64" width="96" height="122" rx="6" className={card} />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <circle cx="222" cy={84 + i * 22} r="4" className={i === 0 ? accent : soft} />
          <rect x="232" y={81 + i * 22} width="40" height="5" rx="2" className={line} />
          <rect x="280" y={81 + i * 22} width="14" height="5" rx="2" className={soft} />
        </g>
      ))}
    </g>
  );
}

function Editor() {
  return (
    <g>
      <rect x="16" y="14" width="150" height="172" rx="6" className={card} />
      <rect x="30" y="28" width="70" height="8" rx="2" className={line} />
      <rect x="30" y="42" width="50" height="5" rx="2" className={soft} />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <rect key={i} x="30" y={62 + i * 11} width={i % 4 === 3 ? 70 : 120} height="4" rx="2" className={i === 4 || i === 5 ? accent : soft} />
      ))}
      <rect x="178" y="14" width="126" height="84" rx="6" className={card} />
      <circle cx="210" cy="56" r="20" className="fill-none stroke-line-strong" strokeWidth="6" />
      <path d="M210 36 a20 20 0 1 1 -17.3 30" className="fill-none stroke-accent" strokeWidth="6" strokeLinecap="round" />
      <rect x="240" y="44" width="50" height="5" rx="2" className={line} />
      <rect x="240" y="56" width="38" height="5" rx="2" className={soft} />
      <rect x="178" y="106" width="126" height="80" rx="6" className={card} />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x="190" y={120 + i * 15} width={i === 3 ? 60 : 100} height="5" rx="2" className={soft} />
      ))}
    </g>
  );
}

function Chat() {
  const bubbles = [
    { x: 92, w: 110, me: false },
    { x: 150, w: 78, me: true },
    { x: 92, w: 128, me: false },
    { x: 140, w: 88, me: true },
    { x: 92, w: 96, me: false },
  ];
  return (
    <g>
      <rect x="80" y="8" width="160" height="200" rx="18" className={card} />
      <rect x="80" y="8" width="160" height="30" rx="18" className={soft} />
      <circle cx="100" cy="23" r="7" className={line} />
      <rect x="114" y="20" width="50" height="6" rx="2" className={line} />
      {bubbles.map((b, i) => (
        <rect key={i} x={b.x} y={50 + i * 28} width={b.w} height="20" rx="8" className={b.me ? accent : "fill-raised stroke-line"} opacity={b.me ? 0.85 : 1} />
      ))}
    </g>
  );
}
