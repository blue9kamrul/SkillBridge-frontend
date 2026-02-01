import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-screen left-0 bg-gray-100 py-6 border-t mt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col items-center justify-center gap-4">
        <nav>
          <ul className="flex items-center gap-6">
            <li>
              <Link href="/about" className="text-gray-800 hover:text-primary font-medium text-base transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-800 hover:text-primary font-medium text-base transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="text-center text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} SkillBridge. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
