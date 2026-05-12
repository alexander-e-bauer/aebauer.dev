# aebauer.dev

Personal portfolio site for Alex Bauer — developer shipping AI-powered systems with a high-stakes client-communication background.

## Stack
- React 19 + TypeScript + Vite 6
- Tailwind CSS v4 (CSS-first tokens) + shadcn/ui primitives
- Single-page landing in `src/components/landing/`

## Run locally
```bash
npm install
npm run dev
```
Opens at http://localhost:5173.

## Build & test
```bash
npm run build   # tsc + vite build
npm run test    # vitest --run
```

## Layout
- `src/components/landing/` — page sections (Hero, Projects, About, Contact)
- `src/components/ui/` — shadcn primitives
- `src/styles/globals.css` — Tailwind v4 theme + aurora gradient tokens
- `public/assets/landing/` — logo, favicon set, hero backdrop
