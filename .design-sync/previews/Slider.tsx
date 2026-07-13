import { Slider, Label } from "aurora-ui";

export const SingleValue = () => (
  <div style={{ display: "grid", gap: 10, width: 280 }}>
    <Label htmlFor="volume">Volume</Label>
    <Slider id="volume" defaultValue={[50]} max={100} step={1} />
  </div>
);

export const PriceRange = () => (
  <div style={{ display: "grid", gap: 10, width: 280 }}>
    <Label htmlFor="price">Price range</Label>
    <Slider id="price" defaultValue={[25, 75]} max={100} step={1} />
  </div>
);

export const SteppedTemperature = () => (
  <div style={{ display: "grid", gap: 10, width: 280 }}>
    <Label htmlFor="temp">Thermostat (60–85°F)</Label>
    <Slider id="temp" defaultValue={[84]} min={60} max={85} step={1} />
  </div>
);
