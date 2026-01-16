# HFM Test - Frontend Application

A modern React application built with TypeScript, featuring a responsive homepage with interactive components and form handling.

## 🚀 Quick Start

### Prerequisites

-   Node.js (v18 or higher)
-   pnpm (recommended) or npm

### Installation & Running

```bash
# Install dependencies
pnpm install
# or
npm install

# Start development server
pnpm start
# or
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
pnpm run build
# or
npm run build
```

## ✨ Frontend Features

These are highlighted features of the completed exercise, feel free to explore the code. I would be happy to walk through my implementation or answer any questions if needed.

### 📝 Contact Form

-   **Form Validation** - React Hook Form with Zod schema validation
-   **Country Selection** - Searchable country picker with flag icons
-   **Country Code Selector** - Integrated phone country code selection
-   **Experience Level** - Dropdown selection for user experience
-   **Real-time Validation** - Field-level error messages
-   **Toast Notifications** - Success/error feedback using react-hot-toast

### 🌐 Internationalization

-   **Language Selector** - Switch between English (EN) and Thai (TH)

### 🎨 UI/UX Features

-   **Responsive Design** - breakpoint-specific styles
-   **Scroll Animations** - Smooth reveal animations on scroll
-   **Smooth Scrolling** - Enhanced scroll experience with Lenis
-   **Theme Support** - Dynamic theme management with scroll-based updates
-   **Accessible Popups** - Keyboard navigation, focus trapping, and ARIA support
-   **Loading States** - Spinner components for async operations

### 🛠️ Technical Stack

-   **React 19** - Latest React with modern hooks
-   **TypeScript** - Full type safety
-   **React Router** - Client-side routing
-   **React Hook Form** - Performant form handling
-   **Zod** - Schema validation
-   **Swiper** - Touch-enabled sliders
-   **Lenis** - Smooth scrolling library

## 🎯 Development Notes

-   Uses **CRACO** for custom webpack configuration
-   CSS organized by feature (homepage, global, responsive)
-   Path aliases configured (`@/` for `src/`)
-   Form validation with comprehensive error handling
-   Accessibility features (ARIA labels, keyboard navigation)
