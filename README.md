# The Reading Retreat - Frontend

A modern, responsive blog application frontend built with Next.js 15, React 19, and Tailwind CSS. This is the frontend component of the BlogApp Microservices architecture, designed to provide a seamless reading and blogging experience.

## 🚀 Features

- **Modern UI/UX**: Built with shadcn/ui components and Tailwind CSS for a clean, responsive design
- **Responsive Navigation**: Mobile-friendly navigation with hamburger menu
- **Type Safety**: Full TypeScript support for enhanced development experience
- **Component Library**: Reusable UI components with consistent styling
- **Multi-Authentication**: Supports both Google OAuth and password-based authentication
- **JWT Authorization**: Secure JWT-based authorization system
- **Microservices Integration**: Fully integrated with backend microservices architecture

## 🛠️ Tech Stack

### Frontend Framework
- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Runtime**: React 19
- **Language**: TypeScript 5

### Styling & UI
- **CSS Framework**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Component Library**: [shadcn/ui](https://ui.shadcn.com/) components
- **UI Primitives**: [Radix UI](https://www.radix-ui.com/) primitives
- **Icons**: [Lucide React](https://lucide.dev/)

### Authentication & Authorization
- **OAuth Provider**: Google OAuth 2.0
- **Token Management**: JWT (JSON Web Tokens)
- **Auth Methods**: Password-based + Social login

### Utilities & Tools
- **Styling**: `clsx` for conditional styling
- **Class Management**: `tailwind-merge` for class merging
- **Component Variants**: `class-variance-authority`

### Backend Integration
- **API Communication**: RESTful APIs
- **User Service**: [BlogApp-UserService](https://github.com/sajjad6ansari/BlogApp-UserService)
- **Author Service**: [BlogApp-AuthorService](https://github.com/sajjad6ansari/BlogApp-AuthorService)
- **Blog Service**: [BlogApp-BlogService](https://github.com/sajjad6ansari/BlogApp-BlogService)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── favicon.ico        # App favicon
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx          # Home page
│   └── login/
│       └── page.tsx      # Login page
├── components/
│   ├── navbar.tsx        # Navigation component
│   └── ui/               # Reusable UI components
│       ├── button.tsx    # Button component with variants
│       └── card.tsx      # Card component
└── lib/
    └── utils.ts          # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BlogApp_Microservices/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnmp install
   # or
   bun install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code linting

## 🎨 UI Components

The project uses shadcn/ui components with the "new-york" style configuration:

- **Button**: Multiple variants (default, destructive, outline, secondary, ghost, link)
- **Card**: Flexible card components with header, content, and footer sections
- **Navigation**: Responsive navbar with mobile menu support

### Component Configuration

The UI components are configured via `components.json`:
- **Style**: new-york
- **Base Color**: slate
- **CSS Variables**: Enabled
- **Icon Library**: lucide
- **RSC**: React Server Components enabled

## 🎯 Key Features

### Navigation
- **Brand**: "The Reading Retreat"
- **Menu Items**: 
  - Home
  - Saved Blogs (authentication-dependent)
  - Login/Profile (context-dependent)
- **Mobile Responsive**: Collapsible hamburger menu
- **Icons**: Lucide icons for visual clarity

### Theming
- **CSS Variables**: Custom properties for consistent theming
- **Dark Mode Ready**: Theme configuration supports dark mode
- **Custom Colors**: Comprehensive color palette with semantic naming
- **Radius Variables**: Consistent border radius across components

## 🔗 Microservices Integration

This frontend is fully integrated with the following backend microservices:

### 🔐 User Service
- **Repository**: [BlogApp-UserService](https://github.com/sajjad6ansari/BlogApp-UserService)
- **Features**: 
  - User registration and profile management
  - Password-based authentication
  - Google OAuth integration
  - JWT token generation and validation

### ✍️ Author Service  
- **Repository**: [BlogApp-AuthorService](https://github.com/sajjad6ansari/BlogApp-AuthorService)
- **Features**:
  - Author profile management
  - Author-specific blog operations
  - Content creation and editing capabilities

### 📝 Blog Service
- **Repository**: [BlogApp-BlogService](https://github.com/sajjad6ansari/BlogApp-BlogService) 
- **Features**:
  - Blog post management (CRUD operations)
  - Blog content storage and retrieval
  - Blog categorization and tagging

### 🔑 Authentication & Authorization
- **OAuth Provider**: Google OAuth 2.0 for social login
- **Traditional Auth**: Email/password-based authentication
- **Authorization**: JWT (JSON Web Token) based authorization
- **Security**: Secure token handling and refresh mechanisms

## 📱 Responsive Design

- **Mobile First**: Designed with mobile-first approach
- **Breakpoints**: Tailwind CSS responsive breakpoints
- **Navigation**: Adaptive navigation for different screen sizes
- **Components**: All UI components are responsive by default

## 🚧 Development Notes

### Current State
- ✅ **Microservices Integration**: Connected with User, Author, and Blog services
- ✅ **Authentication System**: Google OAuth and password-based login implemented
- ✅ **JWT Authorization**: Secure token-based authorization in place
- ✅ **Responsive UI**: Navigation component with mobile-responsive design
- ✅ **Component Library**: shadcn/ui components fully configured
- ✅ **API Integration**: RESTful API communication with backend services

### Future Enhancements
- Enhanced user profile management interface
- Advanced blog editor with rich text capabilities
- Real-time notifications system
- Blog search and filtering functionality
- Comment system integration
- Social sharing features
- Progressive Web App (PWA) capabilities

## 🏗️ Architecture Overview

This frontend is the client-side component of a comprehensive microservices architecture:

### 🔄 Service Communication
- **Protocol**: RESTful APIs with JSON payloads
- **Authentication**: Bearer token (JWT) in Authorization headers
- **Error Handling**: Centralized error handling for API responses
- **Request Interceptors**: Automatic token attachment and refresh

### 🛡️ Security Implementation
- **JWT Tokens**: Secure storage and automatic refresh
- **OAuth Flow**: Google OAuth 2.0 integration
- **Protected Routes**: Route guards for authenticated pages
- **CORS**: Proper cross-origin resource sharing configuration

### 🔗 Service Dependencies
```
Frontend Application
├── User Service (Authentication & User Management)
├── Author Service (Content Creation & Management)  
└── Blog Service (Content Storage & Retrieval)
```

### 📊 Data Flow
1. **Authentication**: User login → JWT token → Secure API calls
2. **Content Creation**: Author creates → Author Service → Blog Service
3. **Content Consumption**: Reader requests → Blog Service → Frontend display

## 📄 License

This project is part of the BlogApp Microservices architecture.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add appropriate tests
5. Submit a pull request

## 📞 Support

For questions and support regarding the frontend application, please refer to the main project documentation or create an issue in the repository.
