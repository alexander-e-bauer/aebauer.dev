import { Avatar, AvatarFallback } from "aurora-ui";

// External image URLs do not load in the capture, so every avatar relies on
// AvatarFallback initials to guarantee the cells are never blank. Sizes use
// inline width/height because size-10/size-12 utilities are not in the sheet.
export const Initials = () => (
  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
    <Avatar>
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarFallback>JS</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarFallback>MK</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarFallback>RT</AvatarFallback>
    </Avatar>
  </div>
);

export const Sizes = () => (
  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
    <Avatar style={{ width: 32, height: 32 }}>
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
    <Avatar style={{ width: 40, height: 40 }}>
      <AvatarFallback>JS</AvatarFallback>
    </Avatar>
    <Avatar style={{ width: 48, height: 48 }}>
      <AvatarFallback>MK</AvatarFallback>
    </Avatar>
  </div>
);

export const Stack = () => (
  <div style={{ display: "flex", alignItems: "center" }}>
    {[
      { initials: "AB", ml: 0 },
      { initials: "JS", ml: -12 },
      { initials: "MK", ml: -12 },
      { initials: "+5", ml: -12 },
    ].map((a) => (
      <Avatar
        key={a.initials}
        style={{
          width: 40,
          height: 40,
          marginLeft: a.ml,
          boxShadow: "0 0 0 2px var(--background)",
        }}
      >
        <AvatarFallback>{a.initials}</AvatarFallback>
      </Avatar>
    ))}
  </div>
);
