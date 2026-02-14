# MDCharts EHR - Medical Practice Management Platform

## Overview

MDCharts EHR is a comprehensive Electronic Health Record (EHR) and Revenue Cycle Management (RCM) solution designed for modern medical practices. The platform provides a marketing/landing website showcasing features for practice management, patient engagement, billing, and compliance across multiple medical specialties. The tagline is "Practice the way you want" (no trailing period). Brand name is always "MDCharts" (capital M, D, C, no space). e-Prescribing always uses lowercase e, hyphen, capital P.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS v4 with custom theme configuration in `client/src/index.css`
- **UI Components**: shadcn/ui component library (New York style) with Radix UI primitives
- **Animations**: Framer Motion for page transitions and interactive elements
- **State Management**: TanStack React Query for server state and data fetching
- **Build Tool**: Vite with custom plugins for Replit integration

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **API Pattern**: RESTful JSON APIs under `/api` prefix
- **Development**: tsx for TypeScript execution, Vite dev server with HMR

### Data Storage
- **Database**: PostgreSQL via `pg` driver
- **ORM**: Drizzle ORM with type-safe schema definitions
- **Schema Location**: `shared/schema.ts` contains all table definitions
- **Migrations**: Drizzle Kit for schema migrations (`drizzle-kit push`)

### Current Data Models
- `users`: Basic user authentication (id, username, password)
- `contactRequests`: Contact form submissions (name, email, phone, company, requestType, message)

### Project Structure
```
├── client/           # Frontend React application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Route page components
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Utility functions
├── server/           # Express backend
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API route definitions
│   ├── storage.ts    # Database operations
│   └── db.ts         # Database connection
├── shared/           # Shared code between client/server
│   └── schema.ts     # Drizzle database schema
└── migrations/       # Database migration files
```

### Build Process
- Development: `npm run dev` starts Express server with Vite middleware
- Production: `npm run build` compiles client (Vite) and server (esbuild) to `dist/`
- Database: `npm run db:push` applies schema changes to PostgreSQL

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **connect-pg-simple**: Session storage for Express sessions

### UI/Component Libraries
- **Radix UI**: Accessible component primitives (dialog, dropdown, tabs, etc.)
- **Lucide React**: Icon library
- **Embla Carousel**: Carousel/slider component
- **cmdk**: Command palette component
- **Vaul**: Drawer component

### Form & Validation
- **Zod**: Schema validation for API requests
- **React Hook Form**: Form state management
- **drizzle-zod**: Generate Zod schemas from Drizzle tables

### Development Tools
- **Replit Plugins**: Error overlay, cartographer, dev banner for Replit environment
- **Tailwind CSS**: Utility-first CSS with custom theme variables

### Fonts
- Google Fonts: Plus Jakarta Sans (headings), Inter (body text)