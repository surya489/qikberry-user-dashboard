# Qikberry User Dashboard

Qikberry User Dashboard is a responsive React and TypeScript application for exploring posts and photos from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com). It includes demo authentication, protected pages, profile management, persistent theme preferences, search and filtering tools, pagination, and infinite scrolling.

## Features

- Demo login with protected dashboard routes
- Dashboard overview with post and photo carousels
- Debounced post search and user filtering
- Paginated post results
- Debounced photo search and album filtering
- Infinite-scrolling photo gallery
- Profile editing with username, password, and avatar support
- Avatar validation for image type and a maximum size of 1 MB
- Light and dark themes
- Loading skeletons, empty states, API error states, and image fallbacks
- Responsive layouts for mobile and desktop
- Browser-based persistence for the session, profile, and theme

## Demo Login

Unless overridden through environment variables, use:

```text
Username: admin
Password: admin123
```

Profile changes are stored in the browser. If you update the username or password, use the updated credentials the next time you sign in.

## Tech Stack

- React 19
- TypeScript 6
- Vite 8
- Redux Toolkit and React Redux
- React Router 7
- Tailwind CSS 4
- Axios
- Swiper
- Lucide React
- ESLint

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+ (recommended for Vite 8)
- npm

### Installation

```bash
git clone <repository-url>
cd qikberry-user-dashboard
npm install
```

Create your local environment file:

```bash
cp .env.example .env
```

On Windows PowerShell, use:

```powershell
Copy-Item .env.example .env
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown by Vite, typically `http://localhost:5173`.

## Environment Variables

All variables are optional because the application provides defaults.

| Variable | Default | Purpose |
| --- | --- | --- |
| `VITE_API_BASE_URL` | `https://jsonplaceholder.typicode.com` | Base URL used to fetch posts and photos |
| `VITE_DEMO_USERNAME` | `admin` | Initial demo username |
| `VITE_DEMO_PASSWORD` | `admin123` | Initial demo password |

Environment values are read when the application starts. Restart the development server after changing `.env`.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check the project and create a production build |
| `npm run lint` | Run ESLint across the project |
| `npm run preview` | Preview the production build locally |

## Routes

| Route | Access | Description |
| --- | --- | --- |
| `/login` | Public | Demo account sign-in |
| `/home` | Protected | Dashboard summary and content previews |
| `/home/posts` | Protected | Searchable, filterable, paginated post list |
| `/home/photos` | Protected | Searchable, filterable, infinite photo gallery |
| `/home/profile` | Protected | Profile, password, and avatar settings |

The root route redirects to `/login`. Unauthenticated visits to protected routes also redirect to the login page.

## Project Structure

```text
src/
├── api/          # Axios client and endpoint modules
├── assets/       # Application images and static assets
├── components/   # Auth, layout, page-specific, shared, and UI components
├── config/       # Environment configuration
├── features/     # Redux slices, types, and browser storage helpers
├── hooks/        # Typed Redux and reusable behavior hooks
├── pages/        # Route-level pages
├── routes/       # Route definitions and authentication guard
├── store/        # Redux store configuration
├── styles/       # Global and component-specific styles
├── types/        # API data types
└── utils/        # Routes and application constants
```

## Data and Persistence

Posts and photos are fetched from JSONPlaceholder. Authentication is intended for demonstration and is handled entirely in the browser; it is not production-grade security.

The application uses `localStorage` for:

- The active user session
- Profile credentials and avatar data
- Theme preference

To restore the original demo credentials and clear saved preferences, remove the Qikberry-related entries from the browser's local storage.

## Path Alias

The `@/` alias maps to `src/` and is configured in both Vite and TypeScript:

```ts
import Button from "@/components/ui/Button/Button";
import { ROUTES } from "@/utils/constants";
```

## Production Build

```bash
npm run build
npm run preview
```

The optimized production files are generated in `dist/`.
