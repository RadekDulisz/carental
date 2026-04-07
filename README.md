# Carental - Premium Car Rental Web Experience

Modern, responsive car rental web application built with React and TypeScript.

The project focuses on clean UX, polished visual design, and strong front-end engineering practices: typed state management, accessible interactions, responsive navigation, booking validation, and automated test/build checks.

## Live Product Scope

- Premium hero and quick-search experience
- Fleet catalog with filtering and model search
- Interactive booking flow with real-time pricing
- Add-on pricing (insurance, GPS)
- Booking validation and confirmation reference generation
- Sticky responsive navbar with active-section highlighting
- Mobile menu toggle with animated hamburger-to-X transition
- FAQ, testimonials, and process sections with enhanced motion and hover interactions

## Tech Stack

- React 18
- TypeScript
- Vite (build tooling)
- Vitest + Testing Library (testing)
- CSS (custom design system)
- Redux Toolkit (app store foundation)

## Highlights

- Type-safe implementation across UI and booking logic
- Production-ready build setup using Vite
- Testable UI with Vitest and Testing Library
- Accessibility-conscious interactions:
	- `aria-live` confirmation feedback
	- form validation semantics
	- reduced-motion support for animations
- Mobile-first behavior with responsive layouts and navigation controls

## Project Structure

```text
carental/
	src/
		App.tsx
		App.css
		App.test.tsx
		app/
			store.ts
			components/
			containers/
	index.html
	vite.config.mts
	tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js 18.18+
- npm 8+

### Installation

```bash
npm install
```

### Run in Development

```bash
npm run dev
```

## Available Scripts

- `npm run dev` or `npm start`: start local development server
- `npm run build`: create production build
- `npm run preview`: preview production build
- `npm run typecheck`: run TypeScript checks
- `npm test`: run test suite once
- `npm run test:watch`: run tests in watch mode

## Quality Checks

Recommended local validation flow:

```bash
npm run typecheck
npm test
npm run build
```

## Key Functional Areas

### 1. Fleet Discovery

- Filter by vehicle type
- Search by model/type keywords
- Car card selection updates booking summary instantly

### 2. Booking Workflow

- Pickup/drop-off selection
- Date-range validation
- Contact information validation
- Optional extras pricing
- Dynamic total cost calculation

### 3. Navigation and UX

- Sticky header
- Active section indication during scroll
- Mobile slide-down navigation
- Polished motion system with reduced-motion fallback

## Testing

Current tests verify key landing/booking UI rendering and run under Vitest (`jsdom` environment).

To run tests:

```bash
npm test
```

## Deployment

This project is ready to deploy on any static hosting platform that supports Vite output, for example:

- Vercel
- Netlify
- GitHub Pages

Build output is generated to `dist/`.

## Future Enhancements

- Persist booking drafts (localStorage)
- API integration for real availability and pricing
- Multi-step checkout and payment integration
- Extended automated interaction tests for booking scenarios
- Component-level architecture split for larger-scale iteration

## License

MIT
