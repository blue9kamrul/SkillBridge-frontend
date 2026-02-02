# SkillBridge - Tutoring Platform Frontend

A modern tutoring platform frontend that connects students with tutors. Built with Next.js 16, React 19, TypeScript, and Tailwind CSS.

## 🔗 Links

- **Live Application**: [https://skillbridge-frontend-phi.vercel.app/](https://skillbridge-frontend-phi.vercel.app/)
- **Backend API**: [https://skillbridge-backend-evdp.onrender.com](https://skillbridge-backend-evdp.onrender.com)
- **GitHub Repository**: [Repository URL]

## ✨ Features

### Student Features
- Register and login (email/password & Google OAuth)
- Browse tutors with advanced filters (subject, category, price, rating, experience)
- View top-rated tutors on homepage
- Book tutoring sessions instantly
- Manage and cancel bookings
- Leave reviews after completing sessions
- Update profile information

### Tutor Features
- Create and manage tutor profile
- Set hourly rates and bio
- Manage categories/subjects
- View all teaching sessions
- Track earnings and bookings
- Respond to student reviews

### Admin Features
- Dashboard with platform statistics
- User management (roles, ban/unban)
- Category management (CRUD operations)
- View all bookings across platform

## 🛠️ Tech Stack

**Framework**: Next.js 16.1.1 (App Router)  
**UI Library**: React 19.2.3  
**Styling**: Tailwind CSS 4, Radix UI, shadcn/ui  
**Forms**: @tanstack/react-form with Zod validation  
**Auth**: Better Auth 1.4.12  
**HTTP Client**: Native Fetch API with proxy configuration  

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── (auth)/       # Authentication pages (login, register)
│   │   ├── admin/        # Admin dashboard and management
│   │   ├── bookings/     # Booking management
│   │   ├── categories/   # Category pages
│   │   ├── dashboard/    # User dashboard
│   │   ├── profile/      # User profile
│   │   ├── reviews/      # Review management
│   │   └── tutors/       # Tutor browsing and details
│   ├── components/       # Reusable React components
│   │   ├── modules/      # Feature-specific components
│   │   └── ui/           # shadcn/ui components
│   ├── lib/              # Utility functions and API clients
│   ├── types/            # TypeScript type definitions
│   └── config/           # App configuration
└── public/               # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
# Create .env.local file
NEXT_PUBLIC_API_URL=http://localhost:5000
# Or use production backend:
# NEXT_PUBLIC_API_URL=https://skillbridge-backend-evdp.onrender.com
```

4. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🏗️ Architecture

### Proxy Configuration
The app uses Next.js rewrites to proxy API calls through the same origin, solving cross-origin cookie issues:
- All `/api/*` requests are proxied to the backend
- Configured in `next.config.ts`

### Authentication Flow
- Better Auth handles session management
- Supports email/password and Google OAuth
- Session cookies are httpOnly and secure
- Auto-redirect to login for protected routes

### API Integration
- Centralized API helpers in `src/lib/`
- `getApiBaseUrl()` helper for environment-aware URLs
- Consistent error handling across all API calls

## 📱 Key Pages

- `/` - Homepage with featured tutors
- `/tutors` - Browse all tutors with filters
- `/login` & `/register` - Authentication
- `/dashboard` - User/Tutor dashboard
- `/bookings` - Manage bookings
- `/admin` - Admin panel (admin only)
- `/categories` - Category management
- `/profile` - User profile settings

## 🎨 UI Components

Built with shadcn/ui and Radix UI:
- Form components with validation
- Cards, buttons, dialogs
- Tables for data display
- Toast notifications
- Responsive navigation

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - Next.js features and API
- [React Documentation](https://react.dev) - React 19 features
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com) - Re-usable components
- [Better Auth](https://www.better-auth.com) - Authentication library
- [Radix UI](https://www.radix-ui.com) - Headless UI components

## 🚀 Deployment

Deployed on [Vercel](https://vercel.com):

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables:
   - `NEXT_PUBLIC_API_URL` (backend URL)
4. Deploy

The app automatically uses the Next.js proxy configuration for production API calls.

## 📄 License

This project is part of the SkillBridge tutoring platform.
