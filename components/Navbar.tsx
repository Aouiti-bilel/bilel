// components/Navbar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu, X } from 'lucide-react';
import classNames from 'classnames';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const isDark = theme === 'dark';

  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4 ">
        <div
          className={classNames(
            'w-full flex items-center justify-between rounded-full px-8 py-3 shadow-lg backdrop-blur-xl transition-all',
            isDark
              ? 'bg-white/10 text-white border border-white/20'
              : 'bg-black/10 text-black border border-black/10'
          )}
        >
          {/* LOGO */}
          <Link href="/" className="font-semibold text-lg tracking-tight">
            Bilel Laouiti
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center space-x-8 text-sm">
            <Link href="/" className="hover:opacity-70 transition">Home</Link>
            <Link href="/contact" className="hover:opacity-70 transition">Contact</Link>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center space-x-2">
            {/* Theme toggle */}
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Mobile menu */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition"
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* MOBILE DRAWER */}
        {open && (
          <div
            className={classNames(
              'mt-3 rounded-2xl px-6 py-4 shadow-xl md:hidden backdrop-blur-xl transition-all',
              isDark
                ? 'bg-white/10 text-white border border-white/20'
                : 'bg-black/10 text-black border border-black/10'
            )}
          >
            <div className="flex flex-col space-y-4 text-sm">
              <Link href="/" className="hover:opacity-70 transition">Home</Link>
              <Link href="/contact" className="hover:opacity-70 transition">Contact</Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
