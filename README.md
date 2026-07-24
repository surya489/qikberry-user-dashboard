# Qikberry User Dashboard

A React + TypeScript dashboard for browsing posts and photos, with authentication, profile management, and dark mode.

## Tech Stack

- **React 19** with TypeScript
- **Vite** for development and production builds
- **Redux Toolkit** for global state (auth, profile, theme)
- **React Router** for client-side routing
- **Tailwind CSS v4** for styling
- **Axios** for API requests ([JSONPlaceholder](https://jsonplaceholder.typicode.com))

## Project Structure

```
src/
├── api/              # HTTP client and API modules
├── assets/           # Static assets (images, fonts)
├── components/
│   ├── auth/         # Authentication UI
│   ├── home/         # Home page cards and sliders
│   ├── layout/       # Shell components (Navbar, PageLayout)
│   ├── photos/       # Photo-specific components
│   ├── posts/        # Post-specific components
│   ├── shared/       # Reusable composite components
│   └── ui/           # Primitive UI components
├── config/           # Environment configuration
├── features/         # Redux slices and domain logic
├── hooks/            # Custom React hooks
├── pages/            # Route-level page components
├── routes/           # Route definitions and guards
├── store/            # Redux store setup
├── styles/           # Global and feature-specific CSS
├── types/            # Shared TypeScript types
└── utils/            # Constants and helpers
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Environment

Copy the example env file and adjust as needed:

```bash
cp .env.example .env
```

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_BASE_URL` | `https://jsonplaceholder.typicode.com` | API base URL |
| `VITE_DEMO_USERNAME` | `admin` | Demo login username |
| `VITE_DEMO_PASSWORD` | `admin123` | Demo login password |

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Features

- **Login** — Credential-based auth with demo account
- **Home** — Dashboard overview with post/photo previews
- **Posts** — Search, filter by user, paginated list
- **Photos** — Search, filter by album, infinite scroll
- **Profile** — Update username, password, and avatar
- **Theme** — Light/dark mode toggle

## Path Aliases

Imports use the `@/` alias mapped to `src/` (configured in `vite.config.ts` and `tsconfig.app.json`):

```ts
import Button from "@/components/ui/Button/Button";
import { ROUTES } from "@/utils/constants";
```
