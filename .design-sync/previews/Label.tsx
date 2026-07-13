import { Label, Input, Switch } from "aurora-ui";

export const FieldLabel = () => (
  <div style={{ display: "grid", gap: 8, minWidth: 280 }}>
    <Label htmlFor="company">Company</Label>
    <Input id="company" type="text" placeholder="Acme Inc." />
  </div>
);

export const SwitchRow = () => (
  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
    <Switch id="remember" defaultChecked />
    <Label htmlFor="remember">Remember me on this device</Label>
  </div>
);

export const StackedFields = () => (
  <div style={{ display: "grid", gap: 16, minWidth: 280 }}>
    <div style={{ display: "grid", gap: 8 }}>
      <Label htmlFor="first">First name</Label>
      <Input id="first" type="text" defaultValue="Alexander" />
    </div>
    <div style={{ display: "grid", gap: 8 }}>
      <Label htmlFor="last">Last name</Label>
      <Input id="last" type="text" defaultValue="Bauer" />
    </div>
  </div>
);
