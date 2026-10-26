import type { Architecture } from "@/lib/site";

const W = 360;
const PAD = 8;
const GAP = 8;
const LABEL_H = 18;
const NODE_H = 46;
const ROW_GAP = 30;
const ROW_H = LABEL_H + NODE_H + ROW_GAP;

type Box = { x: number; y: number; w: number };

/**
 * Layered system diagram rendered as SVG. Rows are laid out top to bottom, nodes share
 * each row equally, and edges connect bottom-centre to top-centre with a soft curve.
 * The 360-unit width matches a phone screen so text stays legible without zooming.
 */
export function ArchitectureDiagram({ id, title, architecture }: { id: string; title: string; architecture: Architecture }) {
  const boxes = new Map<string, Box>();
  architecture.rows.forEach((row, r) => {
    const n = row.nodes.length;
    const w = (W - PAD * 2 - GAP * (n - 1)) / n;
    row.nodes.forEach((node, i) => {
      boxes.set(node.id, { x: PAD + i * (w + GAP), y: r * ROW_H + LABEL_H, w });
    });
  });
  const height = architecture.rows.length * ROW_H - ROW_GAP + PAD;
  const titleOf = new Map(architecture.rows.flatMap((r) => r.nodes.map((n) => [n.id, n.title] as const)));
  const desc = architecture.edges.map(([a, b]) => `${titleOf.get(a)} connects to ${titleOf.get(b)}`).join(". ");
  const marker = `arrow-${id}`;

  return (
    <figure className="rounded-xl border border-line bg-raised p-3 md:p-5">
      <svg
        viewBox={`0 0 ${W} ${height}`}
        role="img"
        aria-labelledby={`${id}-title ${id}-desc`}
        className="mx-auto block h-auto w-full max-w-[560px]"
      >
        <title id={`${id}-title`}>{title}</title>
        <desc id={`${id}-desc`}>{desc}.</desc>
        <defs>
          <marker id={marker} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L8 4 L0 8 z" className="fill-accent" />
          </marker>
        </defs>

        {architecture.edges.map(([from, to]) => {
          const a = boxes.get(from);
          const b = boxes.get(to);
          if (!a || !b) return null;
          const x1 = a.x + a.w / 2;
          const y1 = a.y + NODE_H;
          const x2 = b.x + b.w / 2;
          const y2 = b.y - 2;
          const my = (y1 + y2) / 2;
          return (
            <path
              key={`${from}-${to}`}
              d={`M${x1} ${y1} C${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`}
              className="fill-none stroke-accent/70"
              strokeWidth={1.25}
              markerEnd={`url(#${marker})`}
            />
          );
        })}

        {architecture.rows.map((row, r) => (
          <g key={row.label}>
            <text x={PAD} y={r * ROW_H + 11} className="fill-muted font-mono" fontSize={9} letterSpacing="0.08em">
              {row.label.toUpperCase()}
            </text>
            {row.nodes.map((node) => {
              const b = boxes.get(node.id)!;
              const cx = b.x + b.w / 2;
              return (
                <g key={node.id}>
                  <rect x={b.x} y={b.y} width={b.w} height={NODE_H} rx={8} className="fill-surface stroke-line-strong" strokeWidth={1} />
                  <text x={cx} y={b.y + (node.sub ? 20 : 28)} textAnchor="middle" className="fill-fg font-sans" fontSize={11.5} fontWeight={600}>
                    {node.title}
                  </text>
                  {node.sub && (
                    <text x={cx} y={b.y + 35} textAnchor="middle" className="fill-muted font-sans" fontSize={9.5}>
                      {node.sub}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        ))}
      </svg>
      <figcaption className="mt-3 text-center text-xs text-muted">{title}</figcaption>
    </figure>
  );
}
