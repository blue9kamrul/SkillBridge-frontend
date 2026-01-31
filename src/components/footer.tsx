import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 text-center py-4 border-t mt-8">
      <div className="container mx-auto text-gray-600 text-sm">
        &copy; {new Date().getFullYear()} SkillBridge. All rights reserved.
      </div>
    </footer>
  );
}
