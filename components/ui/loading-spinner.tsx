import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-[#7C3AED] border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#D8B4FE] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
} 