---
description: 
globs: 
alwaysApply: false
---
[react-app]/
├── assets/
│   ├── fonts/
│   ├── images/
│   └── icons/
│
├── src/
│   ├── application/            // STATE, HOOKS, & QUERIES
│   │   ├── auth/
│   │   │   ├── auth.store.ts     // Zustand store for session state.
│   │   │   └── useAuthQueries.ts // TanStack Query hooks for login/logout mutations.
│   │   ├── settings/
│   │   │   ├── settings.store.ts // Zustand store for user preferences.
│   │   │   └── useSettingsQueries.ts // TanStack Query hooks for settings.
│   │   ├── user/
│   │   │   ├── useUserQueries.ts // TanStack Query hooks for user profile data.
│   │   │   └── user.store.ts     // Zustand store for client-side user state.
│   │   └── hooks/
│   │       └── useAppInitializer.ts
│
│   ├── domain/                 // BUSINESS LOGIC & DATA (Injectable Services)
│   │   ├── auth/
│   │   │   ├── models/
│   │   │   └── services/
│   │   │       └── auth.service.ts
│   │   ├── settings/
│   │   │   ├── models/
│   │   │   └── services/
│   │   │       └── settings.service.ts
│   │   └── user/
│   │       ├── models/
│   │       └── services/
│   │           └── user.service.ts
│
│   ├── infrastructure/         // EXTERNAL CONCERNS
│   │   ├── api/
│   │   │   ├── config/
│   │   │   │   └── axios.instance.ts
│   │   │   ├── auth.client.ts
│   │   │   ├── settings.client.ts
│   │   │   └── user.client.ts
│   │   ├── services/
│   │   │   ├── logger.service.ts
│   │   │   └── analytics.service.ts
│   │   └── storage/
│   │       └── secure.store.ts
│
│   ├── presentation/           // UI LAYER
│   │   ├── components/
│   │   │   ├── dialogs/
│   │   │   ├── sheets/
│   │   │   ├── Avatar.tsx
│   │   │   ├── Button.tsx
│   │   │   └── TextField.tsx
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   └── LoginScreen.tsx
│   │   │   └── settings/
│   │   │       ├── components/
│   │   │       └── SettingsScreen.tsx
│   │   └── navigation/
│   │       ├── AppNavigator.tsx
│   │       └── AuthStack.tsx
│
│   └── shared/                 // UTILITY BELT
│       ├── constants/
│       │   ├── query.keys.ts
│       │   └── route.names.ts
│       ├── di/
│       │   └── container.ts      // TSyringe Dependency Injection container setup.
│       ├── styles/
│       │   └── theme.ts
│       ├── types/
│       │   └── api.d.ts
│       └── utils/
│           └── validators.ts
│
├── .env.example
├── .eslintrc.js
├── .prettierrc.js
├── tsconfig.json
└── App.tsx                     // Root: QueryClientProvider, NavigationContainer, DI setup.


# This file defines the architectural rules for the project.
# Use it as a guide for where to place new files.

[assets/**]
purpose: Store all static assets like images, icons, and fonts.
rules:
- MUST be located at the project root, outside of /src.
- Files here are not processed by TypeScript/Babel, only bundled.
- DO NOT place any source code here.

[src/application/**]
purpose: Manage all client-side state and server-state interactions. This is the bridge between the UI and the Domain.
rules:
- Contains all Zustand stores for managing global UI state (`*.store.ts`).
- Contains all TanStack Query hooks (`use*Queries.ts` or `use*Mutations.ts`) for fetching, caching, and updating server data.
- Hooks in this layer SHOULD resolve services from the `domain` layer via the DI container to perform their logic.
- MUST NOT contain UI components (JSX/TSX).
- MUST NOT directly access `infrastructure` API clients.

[src/domain/**]
purpose: Define core business models and injectable, platform-agnostic service classes that contain business logic.
rules:
- `domain/{feature}/models/` contains TypeScript interfaces/types for business entities.
- `domain/{feature}/services/` contains concrete classes decorated for dependency injection (e.g., with `@injectable()`).
- Services in this layer CAN depend on and call clients from the `infrastructure` layer, which are injected into their constructors.
- MUST be independent of the UI and application state (no knowledge of React, Zustand, or TanStack Query).

[src/infrastructure/**]
purpose: Implement and configure all external tools and services. This is the layer that talks to the outside world.
rules:
- Contains API client setup (`/api`), with a separate, injectable client class for each domain (`auth.client.ts`).
- Contains wrappers for browser/device APIs (e.g., `/storage/secure.store.ts`).
- Contains configuration for 3rd-party SDKs (`/services/logger.service.ts`).
- These classes are meant to be injected into `domain` services.
[src/presentation/components/**]
purpose: House the global, reusable UI component library (your UI Kit).
rules:
- Components here MUST be generic, "dumb," and usable in any feature.
- Examples: `Button.tsx`, `TextField.tsx`, `Card.tsx`.
- Complex but generic components like pop-ups can be organized into sub-folders (`/dialogs`, `/sheets`).
- SHOULD receive all data and callbacks via props.

[src/presentation/features/**]
purpose: Build screens and feature-specific UI modules.
rules:
- Each feature (e.g., `dashboard`, `settings`) gets its own folder.
- A feature folder CAN contain its own `/components`, `/dialogs`, and `/sheets` for UI elements used ONLY within that feature.
- A feature screen (e.g., `SettingsScreen.tsx`) assembles components and uses hooks from the `application` layer (both Zustand and TanStack Query hooks) to manage logic and state.

[src/shared/**]
purpose: Provide a utility belt of code that can be used in any other layer.
rules:
- Contains universal code only. If code is specific to a layer, it belongs in that layer.
- `/di/container.ts`: Configures the TSyringe dependency injection container, registering all services and clients.
- `/constants`: App-wide constants (TanStack Query keys, route names, storage keys).
- `/styles`: Global styling, theme providers, design tokens. (We primarily use tailwind)
- `/types`: Global, shared TypeScript types that are not domain models.
- `/utils`: Pure helper functions (date formatters, validators).
