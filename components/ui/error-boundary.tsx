'use client';

import React from 'react';
import { Button } from './button';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
          <div className="text-center p-8 max-w-md">
            <h1 className="text-2xl font-bold text-black dark:text-white mb-4">Oops! Something went wrong</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We apologize for the inconvenience. Please try refreshing the page or contact support if the problem persists.
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-[#7C3AED] text-white hover:bg-[#6D28D9]"
            >
              Refresh Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
} 