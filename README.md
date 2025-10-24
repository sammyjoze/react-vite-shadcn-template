# ViteForge 🔥

A powerful, modern React boilerplate that forges exceptional applications with Vite, TypeScript, Tailwind CSS, and shadcn/ui components.

## ✨ Features

### 🎨 **UI/UX**
- **Dark/Light Theme** - Complete theme system with smooth transitions
- **Responsive Design** - Mobile-first approach with breakpoint utilities
- **Modern Components** - Shadcn UI components with Radix primitives
- **Loading States** - Skeleton components and loading spinners
- **Toast Notifications** - User feedback system
- **Error Boundaries** - Global error handling
- **Persistent Sidebar** - Collapsible navigation with tooltips
- **Tabbed Settings** - Organized settings interface

### 🔐 **Authentication**
- **User Context** - Complete authentication state management
- **Protected Routes** - Route guards for authenticated pages
- **Sign Up/Login Popups** - Modal-based authentication
- **Google OAuth** - Ready for Google authentication integration

### 🛠 **Development Experience**
- **TypeScript** - Full type safety throughout the application
- **Form Validation** - React Hook Form + Zod schemas
- **API Client** - Centralized API handling with interceptors
- **Mock Data** - Development data for testing without backend
- **Environment Config** - Proper environment variable setup

### 📱 **Performance & SEO**
- **Vite** - Fast development and optimized builds
- **React Query** - Server state management
- **Lazy Loading** - Route-based code splitting
- **Error Handling** - Comprehensive error management

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react-vite-shadcn-template
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:8080
   ```

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Shadcn UI components
│   ├── AuthPopup.tsx    # Authentication popup
│   ├── ContactPopup.tsx # Contact form popup
│   ├── ErrorBoundary.tsx # Global error handling
│   ├── ProtectedRoute.tsx # Route protection
│   └── loading.tsx      # Loading components
├── contexts/
│   ├── AuthContext.tsx  # Authentication state
│   └── ThemeContext.tsx # Theme management
├── hooks/
│   └── use-mobile.tsx   # Mobile detection
├── lib/
│   ├── api.ts          # API client
│   ├── validations.ts  # Form validation schemas
│   ├── toast.ts        # Toast utilities
│   ├── mockData.ts     # Development mock data
│   └── utils.ts        # Utility functions
├── pages/
│   ├── Index.tsx       # Landing page
│   ├── Dashboard.tsx   # Dashboard page
│   └── NotFound.tsx    # 404 page
└── App.tsx             # Main app component
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file based on `env.example`:

```env
# App Configuration
VITE_APP_NAME=YourApp
VITE_APP_URL=http://localhost:8080

# Supabase Configuration
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key

# Google OAuth
VITE_GOOGLE_CLIENT_ID=your-google-client-id

# API Configuration
VITE_API_URL=http://localhost:3000/api

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG_MODE=true
```

## 🎯 Key Components

### Authentication
- **AuthPopup** - Login/signup modal
- **ProtectedRoute** - Route guards
- **AuthContext** - Global auth state

### Forms
- **React Hook Form** - Form management
- **Zod Schemas** - Validation rules
- **Error Handling** - Form error display

### API Integration
- **API Client** - Centralized HTTP requests
- **Error Handling** - Global error management
- **Loading States** - Request state management

### UI Components
- **Loading Spinners** - Activity indicators
- **Skeleton Components** - Content placeholders
- **Toast Notifications** - User feedback
- **Error Boundaries** - Error recovery

## 🛠 Development

### Adding New Components
```bash
npx shadcn@latest add [component-name]
```

### Adding New Routes
1. Create page component in `src/pages/`
2. Add route in `src/App.tsx`
3. Use `ProtectedRoute` for authenticated pages

### Form Validation
```typescript
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/lib/validations"

const form = useForm({
  resolver: zodResolver(loginSchema),
})
```

### API Calls
```typescript
import { api } from "@/lib/api"

const response = await api.get("/users")
```

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

## 🎨 Customization

### Changing the App Color Scheme

To change the entire app's color scheme, simply edit one file:

**File:** `src/lib/colors.ts`

**Change this line:**
```typescript
export const BRAND_COLOR = 'yellow' as const;
```

**To your desired color:**
```typescript
export const BRAND_COLOR = 'blue' as const;  // or 'green', 'purple', 'red', etc.
```

**Available colors:** blue, green, purple, red, orange, pink, indigo, teal, cyan, emerald, violet, fuchsia, rose, amber, lime, sky, slate, gray, zinc, neutral, stone

**Example AI prompt:** "Change the app color from yellow to blue by modifying the BRAND_COLOR constant in src/lib/colors.ts"

### Themes
- Modify `src/contexts/ThemeContext.tsx` for theme logic
- Update `src/index.css` for CSS variables
- Customize Tailwind config in `tailwind.config.ts`

### Components
- All Shadcn components are in `src/components/ui/`
- Customize component styles in their respective files
- Add new components to `src/components/`

### Styling
- Use Tailwind CSS classes
- Leverage Shadcn CSS variables
- Follow mobile-first responsive design

## 🔒 Security

- **Environment Variables** - Secure configuration management
- **Route Protection** - Authentication guards
- **Input Validation** - Form and API validation
- **Error Boundaries** - Graceful error handling

## 📈 Performance

- **Vite** - Fast development and builds
- **React Query** - Efficient data fetching
- **Code Splitting** - Lazy-loaded routes
- **Optimized Images** - WebP and responsive images

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ using React, Vite, TypeScript, Tailwind CSS, and Shadcn UI**
