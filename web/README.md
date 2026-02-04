# Radiance Wellness Center - Frontend Monorepo

A Turborepo-based monorepo containing all frontend applications for Radiance Wellness Center.

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom Sage Green/Warm Gold color palette
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Animations:** Framer Motion
- **Monorepo:** Turborepo with pnpm workspaces

## Project Structure

```
web/
├── apps/
│   ├── web/          # Landing website (port 3000)
│   ├── client/       # Client booking app (port 3001)
│   └── admin/        # Admin dashboard (port 3002)
├── packages/
│   ├── ui/           # Shared UI components (shadcn/ui)
│   ├── types/        # TypeScript types & interfaces
│   ├── utils/        # Utility functions
│   ├── mock-data/    # Demo data
│   └── config/       # Shared configs (tailwind, eslint, typescript)
└── turbo.json        # Turborepo configuration
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

```bash
# Navigate to web directory
cd web

# Install dependencies
pnpm install

# Start all apps in development mode
pnpm dev
```

### Running Individual Apps

```bash
# Landing website only
pnpm web

# Client app only
pnpm client

# Admin dashboard only
pnpm admin
```

## Applications

### Landing Website (apps/web)

Public-facing marketing website showcasing services, accommodations, and more.

- **URL:** http://localhost:3000
- **Features:**
  - Homepage with hero, services overview, testimonials
  - Services listing with categories
  - Service detail pages
  - Accommodations preview

### Client App (apps/client)

Customer booking and account management application.

- **URL:** http://localhost:3001
- **Features:**
  - Service browsing
  - Multi-step booking flow
  - Authentication (login/register)
  - Booking management

### Admin Dashboard (apps/admin)

Staff management portal for bookings, customers, and services.

- **URL:** http://localhost:3002
- **Features:**
  - Dashboard with stats
  - Today's schedule
  - Quick actions
  - Booking management

## Color Palette

- **Primary (Sage Green):** #6B8E6B
- **Accent (Warm Gold):** #D4A853
- **Background:** #FAFAF8
- **Foreground:** #1F2937

## Building for Production

```bash
# Build all apps
pnpm build

# Build specific app
pnpm build --filter=@radiance/web
```

## Deployment

Each app can be deployed independently to Vercel:

1. Connect your repository to Vercel
2. Configure root directory for each app:
   - Landing: `web/apps/web`
   - Client: `web/apps/client`
   - Admin: `web/apps/admin`
3. Deploy

## Demo Mode

This application runs with demo data. No backend is required. All data is sourced from `packages/mock-data`.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps in development mode |
| `pnpm build` | Build all apps for production |
| `pnpm lint` | Run ESLint on all apps |
| `pnpm format` | Format code with Prettier |
| `pnpm clean` | Clean all build artifacts and node_modules |
