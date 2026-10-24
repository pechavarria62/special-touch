# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

`special-touch` is the website for Special Touch Ministry, Inc.: a Vite single-page app written in TypeScript (strict) and Tailwind CSS v4. No UI framework (no Astro, React, Vue, etc.) and no router library.

- `index.html` (project root) is the only HTML file outside `src/`. It holds the page shell: skip links, `#site-header`, `<main id="main">`, `#site-footer`, the `#route-announcer` live region and the `src/main.ts` script.
- Every page is a `.tsx` file in `src/pages/` (no page `.html` or `.ts` files). It exports `render()` (returns JSX) and, optionally, `mount(root)` for behavior, which returns a cleanup function.
- JSX is rendered to HTML strings by our own tiny runtime in `src/jsx.ts` (`h` / `Fragment`; tsconfig `jsxFactory`, and `oxc.jsx` in `vite.config.ts`). It is NOT React: no hooks, no state, no event props. Write `class`, not `className`; text and attributes are escaped, and `raw()` marks trusted HTML. Every `.tsx` file imports `h` (and `Fragment` if it uses `<>…</>`) from `jsx.js`.
- Wire up behavior (forms, filters, toggles) in the page's `mount(root)` with normal DOM code.
- Shared JSX components (`Breadcrumb`, `Eyebrow`, `Icon`, `ArchTile`, `ArchIcon`, `ArchPhoto`, `Picture`, `Required`, `Honeypot`) live in `src/components/ui.tsx`; page data lives in `src/data/` (e.g. `camps.ts`); form validation lives in `src/forms.ts`.
- Build each page to match its mockups in `design/screens/` (PC, tablet and phone).
- Add every page to `src/routes.ts` (`{ path, title, page }`). Unknown URLs render `src/pages/not-found.ts`.
- `src/router.ts` intercepts same-site link clicks (History API). After each navigation it sets the title, updates `aria-current` in the nav, scrolls to the top or `#hash`, focuses the `h1`, announces "<Page> page" and fires a `route:change` event.
- The header and footer are HTML strings from `src/layout/header.ts` and `src/layout/footer.ts`; `setCurrentNav(path)` marks the current nav link.
- Icons: use `<Icon name="…" />` in `.tsx`; plain `.ts` modules (header, footer, forms) call `icon()` from `src/icons.ts`.
- Direct URLs on the host need an SPA fallback: `public/_redirects` (`/*  /index.html  200`) for Netlify.

## Commands

- `npm run dev` — start the Vite dev server (http://localhost:5173)
- `npm run build` — type-check (`tsc`), then build the site to `dist/`
- `npm start` — preview the built site (`vite preview`)
- `npm run typecheck` — type-check `src/` (`tsc`, no output files)
- `npm run test:e2e` — start the dev server and run all Cypress tests headlessly
- `npm run cy:open` — open the interactive Cypress runner (needs `npm run dev` running)
- `npm run screenshots` — full-page review screenshots into `cypress/screenshots/`

## Conventions

- Source lives in `src/`; build output goes to `dist/` (never edit `dist/`).
- TypeScript `strict` mode is on. Avoid `any`; prefer explicit types on exported functions.
- ES modules (`"type": "module"`, `NodeNext` resolution): relative imports need the `.js` extension, e.g. `import { x } from "./x.js"`.
- Images live in `public/images/` as a JPG/PNG plus a WebP copy; use `<picture>` with the WebP `<source>` first.

## Styling

- Use Tailwind CSS only (v4, via `@tailwindcss/vite`). Style with Tailwind utility classes.
- Do not write custom CSS files, inline `style` attributes, CSS-in-JS, or add any other styling framework or UI library.
- Design tokens live in the `@theme` block in `src/style.css`. The default Tailwind palette is cleared, so only approved colors and their shades exist (`navy-50`–`navy-900`, `sage-100`–`sage-800`, `cream`, `cream-200`, `cream-300`, `ink`, `ink-muted`). Add or change tokens there only.
- There is no white token. Anything that would be white (surfaces, text on navy, button text, focus halos) uses `cream` (#F5F0E6).
- Reusable component classes (`btn`, `btn-primary`, `card`, `arch`, `eyebrow`, `field-input`, …) are Tailwind `@utility` definitions in `src/style.css`. Reuse them before writing long class lists.
- Hand-written selectors are only allowed in `@layer base` in `src/style.css` (element defaults and the accessibility tool's `data-st-*` effects).
- Use arbitrary values (e.g. `bg-[#...]`) only for non-color values, and only when no theme value fits.

## Testing

- End-to-end tests use Cypress and live in `cypress/e2e/*.cy.ts`.
- `npm run test:e2e` — start the dev server and run all Cypress tests headlessly
- `npm run cy:open` — open the interactive Cypress runner (needs `npm run dev` running)
- Accessibility checks use `axe-core` directly through the `cy.checkA11y()` command in `cypress/support/e2e.ts` (`cypress-axe` does not support Cypress 16).
- A color guard test fails on pure white or any red, in rendered pages and in `src/`.
- If Cypress fails to start with `bad option: --no-sandbox`, the shell has `ELECTRON_RUN_AS_NODE` set (VS Code does this); run it with `env -u ELECTRON_RUN_AS_NODE`.
- Add or update e2e tests for any user-facing change.

## UI Design System and Color Guidelines

### 1. Approved Color Palette

Use this color palette consistently throughout the web application.

- **Primary: Navy Blue — `#1E3A5F`**
  - Use for primary buttons, navigation, headers, links, active states, and important UI elements.
- **Secondary: Sage Green — `#9CAF88`**
  - Use for secondary buttons, supporting elements, icons, subtle highlights, and decorative accents.
- **Neutral: Creamy White — `#F5F0E6` **
  - Use for page backgrounds, cards, forms, modals, content surfaces, and clean layouts.
  
### 2. Strict Color Restrictions

- Never use red anywhere in the application's UI.
- Do not use red for buttons, text, backgrounds, borders, icons, alerts, charts, validation messages, or error states.
- Do not use pure white (#FFFFFF) as a separate design color.
- Do not introduce additional accent colors without explicit approval.
- Avoid neon, overly saturated, or visually aggressive colors.
- Use only the approved palette and appropriate shades of these colors.
- For errors, warnings, and destructive actions, use accessible navy, sage, cream, or neutral treatments. Communicate the meaning through clear text and icons, not color alone.

### 3. Design Consistency

- Apply the design system to all pages, components, and user interface states.
- Use navy blue for primary actions and sage green for secondary actions.
- Use white and cream to establish visual hierarchy and separate content areas.
- Maintain consistent styles for buttons, forms, cards, navigation, tables, dropdowns, modals, notifications, and charts.
- Define reusable color tokens using the project's existing styling system.
- Avoid hardcoding repeated colors in individual components when shared design tokens are available.
- Ensure hover, focus, active, disabled, loading, and selected states remain consistent with the approved palette.

### 4. Accessibility

- Maintain accessible text-to-background contrast (WCAG AA minimum: 4.5:1 for body text, 3:1 for large text and UI components).
- Use navy blue or an accessible dark neutral for body text on light backgrounds.
- Do not use sage green for small text unless it meets contrast requirements.
- Keep keyboard focus indicators clearly visible.
- Never rely on color alone to communicate errors, warnings, success, or interactive states.
- Ensure all buttons, links, and form controls remain readable and usable.

### 5. Color Blindness (Color Vision Deficiency) Support

About 1 in 12 men and 1 in 200 women have some form of color blindness. The UI must be fully usable by people with protanopia, deuteranopia, tritanopia, and achromatopsia (no color vision at all).

**Core rule:** every piece of information shown with color must also be shown another way — text, an icon, a shape, a pattern, position, or an underline. If the screen were printed in grayscale, nothing important should be lost.

- **Rely on lightness, not hue.** Navy (dark) and sage (mid-light) are distinguishable mainly because of their difference in brightness. When two elements must look different, make sure they differ clearly in lightness, not just in color tone.
- **Do not distinguish elements by sage vs. another light tint alone.** Sage on cream or sage on white has low contrast and can disappear for some users. Pair it with a navy border, icon, or label.
- **Status and feedback messages** (error, warning, success, info) must always include:
  - A distinct icon per state (e.g. ⚠ warning, ✕ error, ✓ success, ⓘ info) — different *shapes*, not just different colors.
  - A clear text label or message ("Error: email is required"), not only a colored border.
- **Form validation:** show an icon and a written message next to the field; do not signal invalid fields with a border color change alone. Link the message to the field with `aria-describedby`.
- **Links** inside body text must be underlined (or otherwise visually distinct beyond color). Do not remove underlines from inline links.
- **Buttons and interactive states:** selected, active, and disabled states must differ by more than color — use a border-weight change, check mark, fill vs. outline, or opacity plus a text/ARIA change (`aria-pressed`, `aria-selected`, `aria-disabled`).
- **Charts and data visualizations:**
  - Label series directly on the chart (or with a legend that uses shapes/patterns), never by color alone.
  - Use different line styles (solid, dashed, dotted), marker shapes (circle, square, triangle), or fill patterns (stripes, dots) to separate series.
  - Prefer shades of navy (dark → light) for ordered/sequential data so the order reads by lightness.
  - Keep the number of colored series small; if more than 3–4 are needed, use labels and patterns.
- **Tables and lists:** do not use colored rows or cells as the only way to show status; add a text status column or icon.
- **Focus indicators:** use a thick (at least 2px) navy outline with offset so it is visible regardless of color perception.
- **Images and icons:** icons that convey meaning need an accessible name (`aria-label` or visible text).

### 6. Implementation Rules

- Inspect the existing codebase before making UI or styling changes.
- Identify the current framework, styling solution, and component library before implementing the design system.
- The project uses Tailwind CSS v4 exclusively. Follow v4 conventions (CSS-first config in `@theme`, no `tailwind.config.js`).
- Do not introduce a new styling framework or UI library.
- Override third-party component defaults when necessary to maintain the approved design system (including any default red error styles and color-only status indicators).
- Do not modify generated build files in `dist/`.
- Preserve existing functionality while making visual changes.

### 7. Pre-Completion UI Review

Before completing any task involving the UI:

- Verify that the approved color palette is being used consistently.
- Check for unauthorized colors, especially red.
- Verify that text, buttons, forms, and interactive states remain accessible.
- **Color-blindness check:**
  - Confirm no information is conveyed by color alone (every status has an icon and/or text).
  - Review the changed screens in grayscale and with color-blindness simulation (Chrome DevTools → Rendering → "Emulate vision deficiencies": protanopia, deuteranopia, tritanopia, achromatopsia).
  - Confirm inline links are underlined and focus outlines are clearly visible.
  - Confirm charts use labels, patterns, or shapes in addition to color.
- Confirm that existing components and application functionality have not been broken.
- Run the appropriate project checks when applicable, including `npm run typecheck` and `npm run build`.

These design rules are mandatory for all UI-related work. Do not deviate from the approved palette or the accessibility and color-blindness requirements unless explicitly instructed to do so.