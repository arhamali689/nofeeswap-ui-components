# NoFeeSwap UI Components

React 18 + TypeScript + Vite + TailwindCSS + Storybook + Vitest

## Quick Start

1. **Install**
   ```bash
   npm i
   ```

2. **Run demo app**
   ```bash
   npm run dev
   # open http://localhost:5173
   ```

3. **Run Storybook (component docs & playground)**
   ```bash
   npm run storybook
   # open http://localhost:6006
   ```

4. **Tests**
   ```bash
   npm run test
   ```

5. **Build**
   ```bash
   npm run build
   ```

## Deploy Storybook

- **Chromatic**: connect your repo and run `npx chromatic --project-token=XXXX`.
- **Vercel**: add project, set build command `npm run build-storybook`, output `.storybook-static/`.

## Notes

- Components are typed with generics where applicable and include basic ARIA attributes.
- Styling uses Tailwind; dark mode enabled by adding `class="dark"` on `html`/`body`.
- `DataTable` supports sorting, selection, loading and empty states.
