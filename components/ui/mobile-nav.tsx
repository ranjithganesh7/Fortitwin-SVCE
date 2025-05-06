'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from './button';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        className="text-gray-700 dark:text-gray-300"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 z-50">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <Link
              href="#"
              className="block text-gray-700 hover:text-[#7C3AED] dark:text-gray-300 dark:hover:text-[#D8B4FE]"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="#features"
              className="block text-gray-700 hover:text-[#7C3AED] dark:text-gray-300 dark:hover:text-[#D8B4FE]"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/interview"
              className="block text-gray-700 hover:text-[#7C3AED] dark:text-gray-300 dark:hover:text-[#D8B4FE]"
              onClick={() => setIsOpen(false)}
            >
              AI Interview
            </Link>
            <Link
              href="#"
              className="block text-gray-700 hover:text-[#7C3AED] dark:text-gray-300 dark:hover:text-[#D8B4FE]"
              onClick={() => setIsOpen(false)}
            >
              Insights
            </Link>
            <Link
              href="#"
              className="block text-gray-700 hover:text-[#7C3AED] dark:text-gray-300 dark:hover:text-[#D8B4FE]"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Button
              className="w-full bg-gradient-to-r from-[#7C3AED] to-[#D8B4FE] text-white hover:shadow-[0_0_15px_rgba(124,58,237,0.5)] transition-shadow"
              onClick={() => setIsOpen(false)}
            >
              Try Demo
            </Button>
          </nav>
        </div>
      )}
    </div>
  );
} 