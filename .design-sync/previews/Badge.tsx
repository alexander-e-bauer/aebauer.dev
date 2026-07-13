import { Badge } from "aurora-ui";

export const Variants = () => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
    <Badge>New</Badge>
    <Badge variant="secondary">Beta</Badge>
    <Badge variant="outline">Draft</Badge>
    <Badge variant="destructive">Error</Badge>
  </div>
);

export const Statuses = () => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
    <Badge>Passing</Badge>
    <Badge variant="secondary">12 online</Badge>
    <Badge variant="outline">Archived</Badge>
    <Badge variant="destructive">Rate limited</Badge>
  </div>
);
