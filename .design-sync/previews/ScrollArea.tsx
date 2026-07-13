import { ScrollArea, Separator } from "aurora-ui";

const commits = [
  { hash: "a1b2c3d", msg: "Fix diagram edge rendering" },
  { hash: "e4f5g6h", msg: "Declare vitest globals for typecheck" },
  { hash: "i7j8k9l", msg: "Refresh OG image to updated hero" },
  { hash: "m0n1o2p", msg: "Add recruiter-polish plan" },
  { hash: "q3r4s5t", msg: "Tighten negative tests" },
  { hash: "u6v7w8x", msg: "Reroute edges clear of nodes" },
  { hash: "y9z0a1b", msg: "Recapture hero screenshot" },
  { hash: "c2d3e4f", msg: "Bump Vite to 6.1" },
  { hash: "g5h6i7j", msg: "Extract Projects metadata" },
  { hash: "k8l9m0n", msg: "Wire Tailwind v4 tokens" },
  { hash: "o1p2q3r", msg: "Archive Seraphone app" },
  { hash: "s4t5u6v", msg: "Initial landing page scaffold" },
];

export const Commits = () => (
  <ScrollArea type="auto" className="rounded-md border" style={{ height: 160, width: 260 }}>
    <div style={{ padding: 12 }}>
      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Recent commits</div>
      {commits.map((c, i) => (
        <div key={c.hash}>
          {i > 0 && <Separator style={{ margin: "8px 0" }} />}
          <div style={{ display: "flex", gap: 8, fontSize: 13, alignItems: "baseline" }}>
            <code style={{ fontSize: 11, opacity: 0.7 }}>{c.hash}</code>
            <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {c.msg}
            </span>
          </div>
        </div>
      ))}
    </div>
  </ScrollArea>
);

const tags = [
  "typescript", "react", "vite", "tailwind", "shadcn", "radix",
  "vitest", "eslint", "vercel", "oklch", "space-grotesk", "aurora",
];

export const Tags = () => (
  <ScrollArea type="auto" className="rounded-md border" style={{ height: 160, width: 260 }}>
    <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ fontSize: 13, fontWeight: 600 }}>Topics</div>
      {tags.map((t) => (
        <div key={t} style={{ fontSize: 13 }}>#{t}</div>
      ))}
    </div>
  </ScrollArea>
);
