import { Tooltip, TooltipTrigger, TooltipContent, Button } from "aurora-ui";

// Rendered open so the tooltip content shows in the card (see cfg.overrides.Tooltip).
// The global preview provider already supplies TooltipProvider.
export const OnButton = () => (
  <Tooltip open>
    <TooltipTrigger asChild>
      <Button variant="outline">Add to library</Button>
    </TooltipTrigger>
    <TooltipContent side="bottom">Saves this item to your library</TooltipContent>
  </Tooltip>
);
