import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-screen left-0 bg-gray-100 py-4 border-t mt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between text-gray-600 text-sm gap-2">
        <div className="text-center sm:text-left w-full sm:w-auto">
          &copy; {new Date().getFullYear()} SkillBridge. All rights reserved.
        </div>

        <nav className="w-full sm:w-auto">
          <ul className="flex flex-wrap justify-center sm:justify-end items-center gap-3">
            <li>
              <Link href="/about" className="text-gray-600 hover:underline">About</Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-600 hover:underline">Contact</Link>
            </li>
            <li>
              <Link href="/" className="text-gray-600 hover:underline">Privacy</Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
