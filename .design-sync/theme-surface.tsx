import * as React from "react";

// Preview surface for the aurora-ui design system.
// The DS is single dark mode ("Dark Aurora"): tokens resolve to a deep
// indigo-black background with near-white foreground. The preview harness
// renders on a white page by default, so every preview card is wrapped in
// this surface to sit on the brand background with the correct text color —
// matching how the app themes its shell. It is registered as the DS provider
// in .design-sync/config.json.
export function ThemeSurface({ children }: { children?: React.ReactNode }) {
  return (
    <div
      className="bg-background text-foreground"
      style={{
        display: "inline-block",
        minWidth: 260,
        padding: 24,
        borderRadius: 16,
        boxSizing: "border-box",
      }}
    >
      {children}
    </div>
  );
}
