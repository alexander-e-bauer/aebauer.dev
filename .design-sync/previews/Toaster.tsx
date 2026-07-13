import * as React from "react";
// Toaster + toast come from the same sonner instance so the toast actually
// renders in the preview. In app code, mount `Toaster` from aurora-ui and call
// `toast()` from sonner — aurora-ui's Toaster is this component pre-themed.
import { Toaster, toast } from "sonner";

// Rendered with a live toast so the card shows a real notification
// (see cfg.overrides.Toaster).
export const SuccessToast = () => {
  React.useEffect(() => {
    toast.success("Deployment successful", {
      description: "aurora-ui is live in production.",
    });
  }, []);
  return <Toaster theme="dark" position="top-center" richColors expand visibleToasts={1} />;
};
