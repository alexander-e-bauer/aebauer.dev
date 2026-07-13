import { Skeleton } from "aurora-ui";

export const ProfileRow = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, width: 300 }}>
    <Skeleton className="size-12 rounded-full" style={{ width: 48, height: 48, borderRadius: 9999 }} />
    <div style={{ display: "grid", gap: 8, flex: 1 }}>
      <Skeleton className="h-4" style={{ height: 16, width: "80%", borderRadius: 6 }} />
      <Skeleton className="h-4" style={{ height: 16, width: "55%", borderRadius: 6 }} />
    </div>
  </div>
);

export const CardPlaceholder = () => (
  <div style={{ display: "grid", gap: 12, width: 300 }}>
    <Skeleton className="rounded-xl" style={{ height: 140, width: "100%", borderRadius: 12 }} />
    <Skeleton className="h-4" style={{ height: 16, width: "90%", borderRadius: 6 }} />
    <Skeleton className="h-4" style={{ height: 16, width: "70%", borderRadius: 6 }} />
    <Skeleton className="h-4" style={{ height: 16, width: "45%", borderRadius: 6 }} />
  </div>
);
