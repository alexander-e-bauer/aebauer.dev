import { Input, Label } from "aurora-ui";

export const LabeledEmail = () => (
  <div style={{ display: "grid", gap: 8, minWidth: 280 }}>
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" placeholder="you@example.com" />
  </div>
);

export const Filled = () => (
  <div style={{ display: "grid", gap: 8, minWidth: 280 }}>
    <Label htmlFor="fullname">Full name</Label>
    <Input id="fullname" type="text" defaultValue="Alexander Bauer" />
  </div>
);

export const PasswordAndSearch = () => (
  <div style={{ display: "grid", gap: 16, minWidth: 280 }}>
    <div style={{ display: "grid", gap: 8 }}>
      <Label htmlFor="password">Password</Label>
      <Input id="password" type="password" defaultValue="correcthorse" />
    </div>
    <div style={{ display: "grid", gap: 8 }}>
      <Label htmlFor="search">Search</Label>
      <Input id="search" type="search" placeholder="Search projects…" />
    </div>
  </div>
);

export const Disabled = () => (
  <div style={{ display: "grid", gap: 8, minWidth: 280 }}>
    <Label htmlFor="workspace">Workspace URL</Label>
    <Input id="workspace" type="text" defaultValue="aebauer.dev" disabled />
  </div>
);
