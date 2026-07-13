import { Separator } from "aurora-ui";

export const Sectioned = () => (
  <div style={{ width: 260 }}>
    <div>
      <div style={{ fontSize: 15, fontWeight: 600 }}>Aurora UI</div>
      <div style={{ fontSize: 13, opacity: 0.7 }}>Design system toolkit</div>
    </div>
    <Separator style={{ margin: "12px 0" }} />
    <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13 }}>
      <span>Documentation</span>
      <span>Components</span>
      <span>Changelog</span>
    </div>
  </div>
);

export const Inline = () => (
  <div style={{ display: "flex", height: 20, alignItems: "center", gap: 12, fontSize: 13 }}>
    <span>Overview</span>
    <Separator orientation="vertical" />
    <span>Docs</span>
    <Separator orientation="vertical" />
    <span>Settings</span>
  </div>
);
