import { Switch, Label } from "aurora-ui";

export const SettingsList = () => (
  <div style={{ display: "grid", gap: 16, minWidth: 320 }}>
    <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
      <Label htmlFor="email-notifs">Email notifications</Label>
      <Switch id="email-notifs" defaultChecked />
    </div>
    <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
      <Label htmlFor="weekly-digest">Weekly digest</Label>
      <Switch id="weekly-digest" />
    </div>
    <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
      <Label htmlFor="two-factor">Two-factor auth</Label>
      <Switch id="two-factor" defaultChecked />
    </div>
  </div>
);

export const OnAndOff = () => (
  <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Switch id="dark-mode" defaultChecked />
      <Label htmlFor="dark-mode">Dark mode</Label>
    </div>
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Switch id="analytics" />
      <Label htmlFor="analytics">Share analytics</Label>
    </div>
  </div>
);

export const Disabled = () => (
  <div style={{ display: "grid", gap: 16, minWidth: 320 }}>
    <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
      <Label htmlFor="beta-locked-on">Beta features (org-enforced)</Label>
      <Switch id="beta-locked-on" defaultChecked disabled />
    </div>
    <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
      <Label htmlFor="beta-locked-off">SSO required</Label>
      <Switch id="beta-locked-off" disabled />
    </div>
  </div>
);
