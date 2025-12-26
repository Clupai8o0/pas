# PAS
Simple, safe, secure password manager built with Next.js and Supabase.

## What it does
- Provides sign-up and login flows with session cookies.
- Stores and manages password entries per user.
- Supports search across titles, URLs, usernames, and emails.
- Includes a built-in password generator for stronger credentials.

## Key features
**Authentication & sessions**
- JWT-backed sessions stored in an HTTP-only cookie.
- Login attempt throttling using recent IP login history.

**Password vault**
- Create, update, delete, and list password entries.
- Search with multi-keyword matching and de-duplication.

**UI & UX**
- Responsive dashboard with drawer/dialog forms.
- 3D hero animation powered by React Three Fiber.
- Toast notifications and animated route transitions.

## Tech stack
- Next.js 14 (App Router), React 18, TypeScript
- Tailwind CSS + tailwindcss-animate
- Supabase (Postgres + JS client)
- JWT + bcrypt
- Radix UI + shadcn/ui primitives, lucide-react icons
- Framer Motion, React Three Fiber/@react-three/drei, Three.js

## Architecture overview
The app uses Next.js App Router for pages and API routes, with Supabase as the backend database. Authentication relies on JWTs stored in HTTP-only cookies and verified in middleware and API handlers.

```
Browser
  └─ Next.js App Router (pages + API routes)
       ├─ Auth routes (sign-up, login, verify, sign-out)
       ├─ Password routes (CRUD, search)
       └─ Supabase client (Postgres)
```

## Getting started (local)
### Prerequisites
- Node.js
- pnpm (recommended by `packageManager`) or npm

### Install
```bash
pnpm install
```
```bash
npm install
```

### Environment variables
Create a `.env.local` file with:
```bash
NEXT_PUBLIC_PORT=http://localhost:3000/
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SECRET=your-jwt-secret
```

Notes:
- `NEXT_PUBLIC_PORT` is concatenated directly with route paths (for example, `api/auth/login`), so include a trailing slash.
- `SECRET` signs and verifies JWT sessions.

### Run
```bash
pnpm dev
```
```bash
npm run dev
```

## Usage
1) Visit `/auth/sign-up` to create an account.
2) Log in at `/auth/login` to establish a session cookie.
3) Use `/dashboard` to create, search, edit, and delete password entries.
4) Use the password generator when creating or editing entries.

## Data model (Supabase)
Tables used by the API routes:

**users**
- `id` (uuid), `username` (text), `email` (varchar), `password` (text), `ip` (json)

**passwords**
- `id` (uuid), `title` (text), `userId` (uuid), `url` (text), `username` (varchar), `email` (varchar), `password` (text)

**logins**
- `token` (text), `userId` (uuid), `date` (timestamptz), `ip` (text), `success` (bool), `loginId` (uuid)

## Testing / Quality
- Linting: `pnpm lint` or `npm run lint`
- No automated tests are present in the repository.

## Deployment
Target: Vercel.

Set the same environment variables in Vercel before deploying:
```bash
NEXT_PUBLIC_PORT=https://your-domain/
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SECRET=your-jwt-secret
```

## Project status / Roadmap
- Add row-level security (RLS) policies in Supabase.
