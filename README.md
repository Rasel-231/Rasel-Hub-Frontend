# Rasel Hub Frontend

Professional MERN Stack frontend built with **Next.js (App Router)**, **React**, and **Ant Design**.

## Live Link

- **https://rasel-hub-frontend.vercel.app**

## Tech Stack

- **Framework:** Next.js 16.2.1 (App Router, Turbopack)
- **UI Library:** Ant Design (antd v6) + @ant-design/icons
- **UI Component Plugins:** ApexCharts (react-apexcharts)
- **State Management:** Redux Toolkit + RTK Query
- **HTTP Client:** Axios
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript 5

## Prerequisites

- Node.js 20+
- npm or yarn

## Getting Started

```bash
# 1. Install dependencies
npm install
# or
yarn

# 2. Create environment file
cp .env.example .env.local   # if .env.example exists, otherwise create .env.local manually

# 3. Set the API URL (required)
NEXT_PUBLIC_API_URL=http://localhost:5001/api/v1

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command          | Description                         |
| ---------------- | ----------------------------------- |
| `npm run dev`    | Start the dev server (Turbopack)    |
| `npm run build`  | Create a production build           |
| `npm run start`  | Start the production server         |
| `npm run lint`   | Run ESLint                          |

## Environment Variables

| Variable               | Required | Default                            | Description              |
| ---------------------- | -------- | ---------------------------------- | ------------------------ |
| `NEXT_PUBLIC_API_URL`  | Yes      | `http://localhost:5001/api/v1`     | Backend API base URL     |

## Folder Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── login/                # Login page
│   ├── my-service/           # Service page
│   ├── username/             # Client management page
│   │   ├── page.tsx
│   │   └── clientUserName/   # Client management UI (client component)
│   ├── hooks/api/            # RTK Query API definitions
│   ├── redux/                # Redux store + base API config
│   ├── types/                # Shared TypeScript types/interfaces
│   ├── lib/                  # Utilities / libs
│   └── entry/                # Entry-level UI
├── Components/               # Shared components
└── ...                        # (Tailwind, PostCSS, etc. config)
```

## Features

- User authentication (login / logout / verify) using JWT with cookies
- Client (username) management:
  - List all clients as statistic cards + grid
  - Create, update, and delete clients
  - Show/hide passwords
- Responsive layout built with Ant Design Row / Col / Card
- RTK Query for caching, auto-refetch, and tag-based invalidation

## API Integration

All API calls are defined in `src/app/hooks/api/api.tsx` and use `baseApi` (RTK Query) with an authenticated Axios base query (`src/app/redux/axiosBaseQuery.ts`).

Current endpoints:

| Endpoint                     | Method   | Purpose             |
| ---------------------------- | -------- | ------------------- |
| `/username`                  | GET      | List all clients    |
| `/username/create-user`      | POST     | Create a client     |
| `/username/:id`              | PATCH    | Update a client     |
| `/username/:id`              | DELETE   | Delete a client     |
| `/auth/login`                | POST     | Login               |
| `/auth/logout`               | POST     | Logout              |
| `/auth/verify`               | GET      | Verify session      |

## Notes

- The backend must be running and reachable at `NEXT_PUBLIC_API_URL`.
- CORS on the backend should allow this frontend origin (`http://localhost:3000`).
- Author: **Rasel Hasan**