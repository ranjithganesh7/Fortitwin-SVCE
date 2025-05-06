/**
 * MainLayout Component
 * 
 * A shared layout component used across all marketing/public pages.
 * Includes:
 * - Site header with navigation
 * - Main content area
 * - Site footer
 * 
 * Used on: homepage, features, pricing, about, etc.
 */

import Link from "next/link";
import { ReactNode } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Site Header - Navigation and branding */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo and branding */}
          <Link href="/" className="flex items-center">
            <span className="font-bold text-lg">
               <span className="text-primary">Forti</span>Twin
            </span>
          </Link>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/features" className="text-muted-foreground hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-muted-foreground hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
               How It Works
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
               About
            </Link>
            <Link href="/login" className="text-muted-foreground hover:text-primary transition-colors">
              Login
            </Link>
            <ModeToggle />
            <Button size="sm" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </nav>
          
          {/* Mobile navigation */}
           <div className="md:hidden">
             {/* Replace with actual MobileNav if available */}
             <Button variant="outline" size="sm">
                 Menu
             </Button>
           </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        {children}
      </main>

      {/* Site Footer */}
      <footer className="py-8 border-t bg-background">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          {/* Footer branding */}
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
             <span className="font-bold text-lg">
               <span className="text-primary">Forti</span>Twin
            </span>
          </div>
          
          {/* Footer links and copyright */}
          <div className="text-sm text-muted-foreground text-center md:text-right">
             © {new Date().getFullYear()} FortiTwin Inc. All rights reserved.
             <nav className="flex justify-center md:justify-end space-x-4 mt-2">
               {/* Replace # with actual paths if they exist */}
               <Link href="#" className="hover:text-primary">Privacy Policy</Link>
               <Link href="#" className="hover:text-primary">Terms of Service</Link>
             </nav>
          </div>
        </div>
      </footer>
    </div>
  );
} 