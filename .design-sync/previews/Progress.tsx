import { Progress } from "aurora-ui";

const labelStyle = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: 13,
  opacity: 0.85,
} as const;

export const BuildStages = () => (
  <div style={{ display: "grid", gap: 18 }}>
    <div style={{ display: "grid", gap: 6, width: 300 }}>
      <span style={labelStyle}>
        <span>Installing dependencies</span>
        <span>30%</span>
      </span>
      <Progress value={30} />
    </div>
    <div style={{ display: "grid", gap: 6, width: 300 }}>
      <span style={labelStyle}>
        <span>Building bundle</span>
        <span>66%</span>
      </span>
      <Progress value={66} />
    </div>
    <div style={{ display: "grid", gap: 6, width: 300 }}>
      <span style={labelStyle}>
        <span>Deploy complete</span>
        <span>100%</span>
      </span>
      <Progress value={100} />
    </div>
  </div>
);

export const Uploading = () => (
  <div style={{ display: "grid", gap: 6, width: 300 }}>
    <span style={labelStyle}>
      <span>Uploading portfolio.zip…</span>
      <span>66%</span>
    </span>
    <Progress value={66} />
  </div>
);
