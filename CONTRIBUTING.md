# Contributing to FortiTwin

Thank you for your interest in contributing to FortiTwin! This guide will help you get started with the development process.

## Development Setup

1. **Fork and clone the repository**

```bash
git clone https://github.com/yourusername/fortitwin.git
cd fortitwin
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## Development Guidelines

### Code Style

This project uses:
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting

Before submitting a pull request, please ensure your code:
- Has no TypeScript errors
- Passes linting (`npm run lint`)
- Follows the established code style

### Component Structure

When creating new components:

1. Place reusable components in the `components/` directory
2. For page-specific components, consider placing them in the relevant page folder
3. Follow the naming conventions used throughout the project
4. Use TypeScript interfaces for props
5. Include JSDoc comments for complex components

Example component structure:

```tsx
/**
 * MyComponent
 * 
 * Description of what this component does
 */
interface MyComponentProps {
  /** Description of this prop */
  someProp: string;
  /** Description of this prop */
  anotherProp?: boolean;
}

export function MyComponent({ someProp, anotherProp = false }: MyComponentProps) {
  // Component logic
  
  return (
    // JSX
  );
}
```

### Adding New Pages

1. Create a new directory in the `app/` folder with the route name
2. Add a `page.tsx` file in that directory
3. Use existing layouts or create new ones as needed

### Commit Messages

Follow conventional commit format:

- `feat:` - A new feature
- `fix:` - A bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code changes that neither fix bugs nor add features
- `test:` - Test-related changes
- `chore:` - Changes to the build process or auxiliary tools

Example: `feat: add user profile component`

## Pull Request Process

1. Update the README.md or documentation with details of changes if appropriate
2. Update the CHANGELOG.md with details of changes if appropriate
3. The PR should target the `main` branch
4. Ensure all checks pass before requesting a review
5. A maintainer will review your PR and provide feedback

## Questions?

If you have any questions, feel free to open an issue or discussion in the GitHub repository.

Thank you for contributing to FortiTwin! 