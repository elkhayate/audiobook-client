"use client";

import { Link } from "@nextui-org/react";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
      

          <div className="flex items-center justify-center gap-2 text-gray-400">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500" />
            <span>by <Link href="https://github.com/elkhayate" target="_blank">Merdashi</Link></span>
          </div>
          <p className="text-gray-500 mt-2 text-center">
            © 2025 AudioBook AI. All rights reserved.
          </p>
      </div>
    </footer>
  );
} 