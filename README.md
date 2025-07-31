# Todo App with Supabase

A modern, full-stack Todo application built with React, TypeScript, and Supabase. Features user authentication, real-time updates, and a beautiful UI powered by HeroUI.

## Features

- ✅ **User Authentication** - Secure login and registration with Supabase Auth
- ✅ **Real-time Updates** - Todo changes sync across sessions instantly
- ✅ **Responsive Design** - Beautiful, modern UI that works on all devices
- ✅ **Type Safety** - Full TypeScript support with generated database types
- ✅ **Row Level Security** - Secure data access with Supabase RLS policies
- ✅ **State Management** - Efficient state handling with Zustand
- ✅ **Modern Stack** - Built with the latest React and Vite

## Tech Stack

### Frontend

- [React 18](https://react.dev) - UI library
- [TypeScript](https://www.typescriptlang.org) - Type safety
- [Vite](https://vitejs.dev) - Build tool and dev server
- [HeroUI](https://heroui.com) - Modern React component library
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion) - Animations
- [React Router](https://reactrouter.com) - Client-side routing
- [Zustand](https://zustand-demo.pmnd.rs) - State management
- [React Hook Form](https://react-hook-form.com) - Form handling

### Backend

- [Supabase](https://supabase.com) - Backend as a Service
    - PostgreSQL database
    - Authentication
    - Row Level Security
    - Real-time subscriptions

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- Supabase account

### Installation

1. **Clone the repository**

    ```bash
    git clone <your-repo-url>
    cd todo-supabase
    ```

2. **Install dependencies**

    ```bash
    npm install
    # or
    pnpm install
    # or
    yarn install
    ```

3. **Setup Supabase**

    - Create a new project at [supabase.com](https://supabase.com)
    - Copy your project URL and anon key
    - Run the database migration:
        ```sql
        -- Copy and paste the content from init.sql into your Supabase SQL editor
        ```

4. **Environment Variables**
   Create a `.env.local` file in the root directory:

    ```env
    VITE_SUPABASE_URL=your_supabase_project_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

5. **Start the development server**

    ```bash
    npm run dev
    ```

    Visit [http://localhost:5173](http://localhost:5173) to see your app!

### Database Schema

The app uses a simple `todos` table with Row Level Security:

```sql
create table public.todos (
    id bigint generated always as identity primary key,
    user_id uuid not null references auth.users on delete cascade,
    title text not null,
    done boolean default false,
    inserted_at timestamptz default now()
);
```

### Setup pnpm (optional)

If you are using `pnpm`, add this to your `.npmrc` file:

```bash
public-hoist-pattern[]=*@heroui/*
```

Then run `pnpm install` again.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run format` - Format code with Prettier
- `npm run api` - Generate TypeScript types from Supabase

## Project Structure

```
src/
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── layouts/            # Page layouts
├── pages/              # Route components
├── stores/             # Zustand state stores
├── styles/             # Global CSS
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

Licensed under the [MIT license](LICENSE).
