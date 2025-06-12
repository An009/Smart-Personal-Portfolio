import React from "react";
import { Heart } from "lucide-react";
export function Footer() {
  return (
    <footer className="py-8 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <span className="text-3xl font-bold text-white-500 hover:text-blue-700">
              ⵣ
            </span>
            <span className="text-lg font-bold"></span>
          </div>
          <div className="flex items-center space-x-1 text-gray-400">
            <span>made by Anouar Tizgui</span>
            <Heart className="w-4 h-4 text-red-500" />
            <span> 2024 &copy; all rights reserved </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
