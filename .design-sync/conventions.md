# aurora-ui — how to build with this design system

**aurora-ui** is a React + Tailwind component library on the **"Dark Aurora"** brand: a single **dark** theme — deep indigo-black surfaces, an **aurora-magenta** primary, near-white text, and **Space Grotesk** for headings. Components are shadcn/ui primitives (Radix under the hood) exposed on `window.Aurora`.

## Setup — required
- **The system is dark-only.** Put page content on the brand surface: give the outermost element `className="bg-background text-foreground"`. Without it, near-white text renders on whatever the host background is. There is no light mode and no `dark` toggle to set.
- **Wrap the app in `TooltipProvider`** once (near the root) if you use `Tooltip`.
- Style with the token utility classes below — **do not hardcode hex colors**. Every color comes from a CSS variable so the brand stays consistent.

## Styling idiom — Tailwind utilities backed by brand tokens
Style by composing Tailwind classes; the meaningful ones map to design tokens (never invent color values):

| Purpose | Classes |
|---|---|
| Surfaces | `bg-background`, `bg-card`, `bg-popover`, `bg-muted`, `bg-secondary` |
| Brand / actions | `bg-primary` + `text-primary-foreground` (aurora magenta), `bg-destructive` |
| Text | `text-foreground`, `text-muted-foreground`, `text-primary`, `text-card-foreground` |
| Borders / focus | `border`, `border-border`, `border-input`, `ring-ring` |
| Signature gradient | `bg-aurora` (aurora gradient fill), `text-aurora` (gradient text — great for hero headlines) |
| Radius | `rounded-md` / `rounded-lg` / `rounded-xl` (base radius is `1rem`) |
| Headings | `font-heading` (Space Grotesk); body text uses the default sans |

`bg-aurora` / `text-aurora` are the brand's hero moment (orange→magenta→violet) — use sparingly for emphasis, not on every surface.

## Where the truth lives
- Tokens + utilities: the DS stylesheet reachable from `styles.css` (it `@import`s `_ds_bundle.css`, the full compiled Tailwind layer — all tokens and utilities).
- Per-component API + usage: each component's `<Name>.prompt.md` (its `<Name>Props` interface and a usage note). Compound components (Card, Dialog, Select, DropdownMenu, Tabs, Tooltip, Avatar, Alert) are composed from sub-parts (e.g. `Card` + `CardHeader`/`CardTitle`/`CardContent`/`CardFooter`) — all sub-parts are importable from the library too.

## Idiomatic example
```tsx
// A dark-aurora section built from library components.
<section className="bg-background text-foreground">
  <Card>
    <CardHeader>
      <CardTitle className="font-heading">Deploy to production</CardTitle>
      <CardDescription>Ship your project in one click.</CardDescription>
      <CardAction><Badge>Pro</Badge></CardAction>
    </CardHeader>
    <CardContent>Connected to <span className="text-primary">main</span>.</CardContent>
    <CardFooter className="flex gap-2">
      <Button>Deploy</Button>
      <Button variant="outline">Preview</Button>
    </CardFooter>
  </Card>
</section>
```
