import { AppCard, Badge } from "aurora-ui";

export const Default = () => (
  <AppCard
    title="Production deploy"
    subtitle="aebauer.dev · main"
    icon={<span aria-hidden>⚡</span>}
    style={{ width: 320 }}
  >
    <div style={{ display: "grid", gap: 8, fontSize: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ opacity: 0.7 }}>Status</span>
        <Badge>Live</Badge>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ opacity: 0.7 }}>Build time</span>
        <span>24s</span>
      </div>
    </div>
  </AppCard>
);

export const Glass = () => (
  <AppCard
    glass
    title="Aurora analytics"
    subtitle="Last 7 days"
    icon={<span aria-hidden>📈</span>}
    style={{ width: 320 }}
  >
    <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
      <span style={{ fontSize: 28, fontWeight: 700 }}>12,480</span>
      <span style={{ fontSize: 13, opacity: 0.7 }}>page views</span>
    </div>
  </AppCard>
);

export const Dense = () => (
  <AppCard
    dense
    title="Storage usage"
    subtitle="team-workspace · pro plan"
    icon={<span aria-hidden>💾</span>}
    style={{ width: 320 }}
  >
    <div style={{ display: "grid", gap: 8, fontSize: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ opacity: 0.7 }}>Used</span>
        <Badge>8.2 GB</Badge>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ opacity: 0.7 }}>Quota</span>
        <span>10 GB</span>
      </div>
    </div>
  </AppCard>
);
