# AI Coding Agent Instructions for `tayngang_studio_camau`

This document provides essential guidance for AI agents working on this codebase. Understanding these conventions will help you be more effective and generate code that aligns with the project's architecture.

## 1. High-Level Architecture

This is a [Next.js](https://nextjs.org/) 14 application using the App Router, written in [TypeScript](https://www.typescriptlang.org/). The styling is done with [Tailwind CSS](https://tailwindcss.com/) and the UI components are built using [shadcn/ui](https://ui.shadcn.com/).

The overall architecture separates concerns into:

- **`app/`**: Routing and pages.
- **`components/`**: Reusable UI components.
- **`services/`**: External API communication.
- **`context/`**: Global state management.
- **`lib/validations`**: Form validation schemas.
- **`types/`**: Shared TypeScript type definitions.

## 2. Project Structure & Key Files

- **`app/`**: Contains all pages, following the Next.js App Router file-based routing system.
  - `app/admin/**`: Protected routes and components for the admin dashboard.
- **`components/`**: Contains all React components.
  - `components/ui/`: Base UI components from `shadcn/ui`. **Do not modify these directly.**
  - `components/common/`: Shared, application-wide components (`header.tsx`, `footer.tsx`).
  - `components/[feature]/`: Components for specific features (`cart`, `product`, `auth`).
- **`services/`**: Handles all external API communication.
  - **`axios.config.ts`**: The central Axios instance. **All API requests must use this instance.** It handles adding auth tokens and global error responses (e.g., 401 redirects). The API base URL is set via the `NEXT_PUBLIC_API_URL` environment variable.
  - `services/manager/*.service.ts`: Services for admin-related features.
  - `services/other/*.service.ts`: Services for general user features.
- **`context/`**: Holds React Context providers for global state.
  - Example: `context/cart-context.tsx` manages the shopping cart state.
- **`lib/`**: Contains utility functions and validation logic.
  - `lib/utils.ts`: Includes the `cn` utility for merging Tailwind CSS classes.
  - `lib/validations/*.validation.ts`: Contains `yup` schemas for form validation (e.g., `auth.validation.ts`).

## 3. Developer Workflows & Conventions

### Data Flow & API Communication

1.  A page/component (e.g., `app/products/page.tsx`) calls a function from a service (e.g., `product.service.ts`).
2.  The service function uses the pre-configured `axiosInstance` from `axios.config.ts` to make the API request.
3.  The Axios interceptors automatically attach the JWT token from `localStorage` to the request headers.
4.  The response is returned to the page. The response interceptor handles global errors like 401 (unauthorized), which triggers a logout.

### UI Components with shadcn/ui

- **Adding New Components**: To add a new UI primitive, use the `shadcn-ui` CLI, not manual file creation.
  ```bash
  npx shadcn-ui@latest add [component_name]
  ```
- **Composing Components**: Build new features in `components/[feature]` by composing primitive components from `components/ui`.

### Form Handling

- Use `react-hook-form` for form state management.
- Define validation schemas using `yup` in the `lib/validations/` directory.
- Connect the schema to the form using `@hookform/resolvers/yup`.

### Running the Project

- **Development Server**:
  ```bash
  npm run dev
  ```
- **Build for Production**:
  ```bash
  npm run build
  ```

By following these guidelines, you will be able to navigate the codebase, understand its patterns, and contribute effectively.
