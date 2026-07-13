import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel, SelectSeparator,
} from "aurora-ui";

// Rendered open so the item list shows in the card (see cfg.overrides.Select).
export const PlanMenu = () => (
  <Select open defaultValue="pro">
    <SelectTrigger style={{ width: 240 }}>
      <SelectValue placeholder="Select a plan" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Plans</SelectLabel>
        <SelectItem value="free">Free</SelectItem>
        <SelectItem value="pro">Pro</SelectItem>
        <SelectItem value="team">Team</SelectItem>
      </SelectGroup>
      <SelectSeparator />
      <SelectItem value="enterprise">Enterprise</SelectItem>
    </SelectContent>
  </Select>
);
