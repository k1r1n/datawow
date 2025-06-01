# Concert Booking Platform

This is a web application for browsing, creating, and managing concert listings and reservations.

## Table of Contents

- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Development Server](#running-the-development-server)
- [Key Libraries and Packages](#key-libraries-and-packages)
- [Running Unit Tests](#running-unit-tests)

## Project Overview

The application allows users to view available concerts. Administrators have additional privileges to create, update, and delete concert information. The platform aims to provide a seamless experience for both concert-goers and event managers.

## Project Structure

A simplified overview of the project's directory structure:

```

├── public/                     # Static assets (images, fonts, etc.)
│   └── favicon.ico
├── src/
│   ├── app/                    # Next.js App Router (pages, layouts, API routes)
│   │   ├── admin/              # Admin-specific pages/routes
│   │   ├── user/               # User-specific pages/routes
│   │   ├── layout.tsx          # Root layout for the application
│   │   └── globals.css         # Global styles, often including Tailwind CSS base/utils
│   ├── components/             # Reusable React components
│   │   ├── concert/            # Components specific to concert features
│   │   │   ├── concert-card.tsx
│   │   │   └── concert-list.tsx
│   │   │   └── create-concert-form.tsx (likely moved here or similar)
│   │   ├── ui/                 # Base UI elements (e.g., from Shadcn UI like Button, Input)
│   │   ├── __tests__/          # Test files for components (if any)
│   │   ├── delete-confirm-dialog.tsx
│   │   ├── history-table.tsx
│   │   ├── layout.tsx          # Shared layout components (e.g. for dashboard sections)
│   │   ├── sidebar.tsx
│   │   └── stats-cards.tsx
│   ├── hooks/                  # Custom React Hooks
│   │   ├── __tests__/          # Unit tests for hooks
│   │   │   └── useConcert.test.ts
│   │   ├── useConcert.ts
│   │   └── useReserve.ts
│   ├── lib/                    # Utility functions, API helpers, configurations
│   │   ├── api.ts              # API calling utility
│   │   └── schemas/            # Zod schemas for form validation
│   │       └── create-concert.ts
│   ├── store/                  # Global state management (e.g., Jotai atoms)
│   │   └── concert.ts
│   └── types/                  # TypeScript type definitions
│       ├── concert.ts          # Types related to concerts
│       └── form.ts             # Types for form values
├── .env.local                  # Local environment variables (untracked)
├── .eslintrc.json              # ESLint configuration
├── .gitignore                  # Git ignore file
├── jest.config.js              # Jest test runner configuration (if present)
├── jest.setup.js               # Jest setup file (if present)
├── next-env.d.ts               # Next.js TypeScript environment types
├── next.config.mjs             # Next.js configuration
├── package.json                # Project metadata, dependencies, and scripts
├── pnpm-lock.yaml              # pnpm lockfile
├── README.md                   # This file
└── tsconfig.json               # TypeScript compiler configuration
```

## Architecture

The application follows a modern web architecture based on Next.js and React, promoting a component-based UI development and server-side rendering/static site generation capabilities.

- **Frontend**: Built with [Next.js](https://nextjs.org/) (a React framework) and [React](https://reactjs.org/).
- **UI Components**: Custom components are located in `src/components`. Reusable UI elements might leverage a library like [Shadcn UI](https://ui.shadcn.com/) (judging by common structures like `src/components/ui`).
- **State Management**: Global state management appears to be handled by [Jotai](https://jotai.org/), a primitive and flexible state management library for React. Local component state is managed using React's built-in `useState` and `useReducer` hooks where appropriate.
- **Hooks**: Custom React Hooks (`src/hook`) encapsulate reusable logic, such as data fetching (`useConcert`, `useReserve`) and interactions with the backend.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) is likely used for utility-first CSS styling, indicated by `globals.css` and common className patterns.
- **API Interaction**: A utility function `callApi` (likely in `src/lib/api.ts`) is used for making requests to the backend API.
- **Routing**: Next.js file-system based routing is used, with pages and API routes potentially organized under `src/app` (for App Router) or a `pages` directory (not visible but common).
- **Typescript**: The project is written in [TypeScript](https://www.typescriptlang.org/) for static typing and improved developer experience.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version compatible with Next.js 13/14, e.g., >=18.x)
- [pnpm](https://pnpm.io/) (or npm/yarn if you adapt the commands)

### Installation

1.  **Clone the repository (if applicable):**
    ```bash
    # git clone https://github.com/subin-sama/datawow.git
    # cd datawow
    ```

2.  **Install dependencies:**
    Open your terminal in the project root directory and run:
    ```bash
    pnpm install
    ```

### Environment Variables

If the application requires environment variables (e.g., API base URL, authentication keys), create a `.env.local` file in the root of the project. Copy the contents of `.env.example` (if provided) and fill in the necessary values.

Example `.env.local`:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
# Add other environment variables here
```
*(Note: Specific environment variables depend on the backend and application needs.)*

### Running the Development Server

Once the dependencies are installed and environment variables are set up, you can start the development server:

```bash
pnpm dev
```

This will typically start the application on [http://localhost:3000](http://localhost:3000).

## Key Libraries and Packages

- **[Next.js](https://nextjs.org/)**: React framework for server-side rendering, static site generation, routing, and more.
- **[React](https://reactjs.org/)**: JavaScript library for building user interfaces.
- **[TypeScript](https://www.typescriptlang.org/)**: Superset of JavaScript that adds static typing.
- **[Jotai](https://jotai.org/)**: Primitive and flexible state management library for React.
- **[Tailwind CSS](https://tailwindcss.com/)** (presumed): Utility-first CSS framework for rapid UI development.
- **[Shadcn UI](https://ui.shadcn.com/)** (presumed, based on `src/components/ui`): Collection of re-usable components built using Radix UI and Tailwind CSS.
- **[Lucide React](https://lucide.dev/)**: Icon library.
- **[Sonner](https://sonner.emilkowal.ski/)**: Toast notification library for React.
- **[Zod](https://zod.dev/)**: TypeScript-first schema declaration and validation library (often used with forms).
- **[React Hook Form](https://react-hook-form.com/)**: Performant, flexible, and extensible forms with easy-to-use validation.
- **Testing Libraries:**
  - **[Jest](https://jestjs.io/)**: JavaScript testing framework.
  - **[@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/)**: Utilities for testing React components.
  - **[@testing-library/react-hooks](https://react-hooks-testing-library.com/)**: Utilities for testing custom React hooks.
  - **`react-test-renderer`**: Used by `@testing-library/react-hooks` for rendering hooks (though it's deprecated in favor of alternatives for full component testing with React 18+).

## Running Unit Tests

To run the unit tests for the project, use the following command:

```bash
pnpm test
```

To run tests for a specific file and see coverage information:

```bash
pnpm test -- --coverage [path/to/your/test-file.test.ts]
```

For example, to run the tests for the `useConcert` hook:

```bash
pnpm test -- --coverage src/hook/__tests__/useConcert.test.ts
```

Ensure your Jest configuration (`jest.config.js` or in `package.json`) is set up correctly to collect coverage from the desired source files (e.g., using `collectCoverageFrom`).

---

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
