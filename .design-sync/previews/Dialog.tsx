import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
  Button,
} from "aurora-ui";

// Rendered open so the composed content shows in the card (see cfg.overrides.Dialog).
// A trigger is included so the preview reads as "opened from a button".
export const Confirmation = () => (
  <Dialog open>
    <DialogTrigger asChild>
      <Button variant="destructive">Delete project</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete project?</DialogTitle>
        <DialogDescription>
          This permanently removes the project and all of its deployments. This action cannot be undone.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <Button variant="outline">Cancel</Button>
        <Button variant="destructive">Delete</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
