import { Toggle } from "aurora-ui";

export const FormattingToolbar = () => (
  <div style={{ display: "flex", gap: 4 }}>
    <Toggle variant="outline" defaultPressed aria-label="Bold" style={{ fontWeight: 700 }}>
      B
    </Toggle>
    <Toggle variant="outline" aria-label="Italic" style={{ fontStyle: "italic" }}>
      I
    </Toggle>
    <Toggle variant="outline" aria-label="Underline" style={{ textDecoration: "underline" }}>
      U
    </Toggle>
  </div>
);

export const Sizes = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <Toggle variant="outline" size="sm" defaultPressed aria-label="Small">
      Sm
    </Toggle>
    <Toggle variant="outline" size="default" defaultPressed aria-label="Default">
      Default
    </Toggle>
    <Toggle variant="outline" size="lg" defaultPressed aria-label="Large">
      Lg
    </Toggle>
  </div>
);
