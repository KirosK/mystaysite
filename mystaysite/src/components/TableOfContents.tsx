"use client";

import { useState } from "react";

interface TOCItem {
  id: string;
  text: string;
}

export default function TableOfContents({ items }: { items: TOCItem[] }) {
  const [open, setOpen] = useState(false);

  if (items.length === 0) return null;

  return (
    <nav className="mb-10 rounded-xl border border-gray-200 bg-gray-50/50 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left font-bold text-[#1a1a2e] md:cursor-default"
      >
        <span className="text-sm uppercase tracking-wider">
          Περιεχόμενα
        </span>
        <svg
          className={`w-4 h-4 transition-transform md:hidden ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <ul
        className={`px-5 pb-4 space-y-2 ${open ? "block" : "hidden"} md:block`}
      >
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-sm text-gray-600 hover:text-[#f57c51] transition-colors"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
