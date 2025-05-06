# FortiTwin Directory Structure

This document provides a detailed explanation of the project's directory structure to help developers navigate and contribute to the codebase.

## Top-Level Directories

- **app/**: Next.js App Router routes and pages
- **components/**: Reusable UI components
- **hooks/**: Custom React hooks
- **lib/**: Utility functions and shared logic
- **public/**: Static assets (images, fonts, etc.)
- **styles/**: Additional styling (if needed beyond globals.css)

## App Directory (Next.js App Router)

The `app/` directory follows the Next.js App Router convention where each subdirectory becomes a route:

```
app/
├── globals.css                # Global styles
├── layout.tsx                 # Root layout for all pages
├── page.tsx                   # Homepage
├── about/                    
│   └── page.tsx               # /about route
├── dashboard/                 # Candidate dashboard
│   ├── page.tsx               # /dashboard route
│   ├── candidates/            # /dashboard/candidates route
│   ├── settings/              # /dashboard/settings route
│   ├── analytics/             # /dashboard/analytics route
│   └── interviews/            # /dashboard/interviews route
├── features/                  
│   └── page.tsx               # /features route
├── how-it-works/              
│   └── page.tsx               # /how-it-works route
├── hr-dashboard/              # HR dashboard
│   └── page.tsx               # /hr-dashboard route
├── interview/                 # Interview flow
│   └── page.tsx               # /interview route
├── login/                    
│   └── page.tsx               # /login route
├── pricing/                   
│   └── page.tsx               # /pricing route
├── report/                    # Assessment reports
│   └── page.tsx               # /report route
├── sample-ai/                 # AI demo
│   └── page.tsx               # /sample-ai route
└── signup/                    
    └── page.tsx               # /signup route
```

## Components Directory

The `components/` directory contains all reusable UI components:

```
components/
├── layout/                    # Layout components
│   └── MainLayout.tsx         # Main layout for marketing pages
├── ui/                        # UI components
│   ├── button.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   ├── dropdown-menu.tsx
│   ├── error-boundary.tsx
│   ├── input.tsx
│   ├── loading-spinner.tsx
│   ├── radio-group.tsx
│   ├── tabs.tsx
│   ├── toast.tsx
│   └── ...
├── mode-toggle.tsx            # Theme toggle component
├── theme-provider.tsx         # Theme provider
├── hr-professional-model.tsx  # 3D model for HR dashboard
├── skull-model.tsx            # 3D model component
├── hero-animation.tsx         # Hero section animation
├── report-chart.tsx           # Chart for reports
├── candidate-journey.tsx      # Candidate journey visualization
└── personality-traits.tsx     # Personality visualization
```

## Hooks Directory

The `hooks/` directory contains custom React hooks:

```
hooks/
├── use-toast.ts               # Toast notification hook
└── use-mobile.tsx             # Mobile detection hook
```

## Lib Directory

The `lib/` directory contains utilities and shared logic:

```
lib/
└── utils.ts                   # General utility functions
```

## Configuration Files

- **package.json**: Dependencies and scripts
- **package-lock.json**: Lock file for npm
- **pnpm-lock.yaml**: Lock file for pnpm
- **next.config.mjs**: Next.js configuration
- **tailwind.config.ts**: Tailwind CSS configuration
- **postcss.config.mjs**: PostCSS configuration
- **tsconfig.json**: TypeScript configuration
- **components.json**: Shadcn UI components configuration
- **.gitignore**: Git ignore patterns

## Additional Resources

For more information on the project architecture and patterns, see the README.md file. 