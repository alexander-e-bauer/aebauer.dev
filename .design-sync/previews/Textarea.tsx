import { Textarea, Label } from "aurora-ui";

export const LabeledPlaceholder = () => (
  <div style={{ display: "grid", gap: 8, minWidth: 320 }}>
    <Label htmlFor="message">Message</Label>
    <Textarea
      id="message"
      rows={4}
      placeholder="Tell me about your project and timeline…"
    />
  </div>
);

export const WithContent = () => (
  <div style={{ display: "grid", gap: 8, minWidth: 320 }}>
    <Label htmlFor="bio">Bio</Label>
    <Textarea
      id="bio"
      rows={4}
      defaultValue={
        "Full-stack engineer building AI-native products.\n" +
        "Previously led platform work at Seraphone.\n" +
        "Currently exploring knowledge graphs and agents."
      }
    />
  </div>
);

export const Disabled = () => (
  <div style={{ display: "grid", gap: 8, minWidth: 320 }}>
    <Label htmlFor="notes">Internal notes</Label>
    <Textarea
      id="notes"
      rows={3}
      defaultValue="Read-only — edit access is limited to workspace admins."
      disabled
    />
  </div>
);
