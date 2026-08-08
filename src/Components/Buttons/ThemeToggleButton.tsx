"use client";

import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useAppDispatch } from "@/store/hooks";
import { toggleTheme } from "@/store/slices/themeSlice";

export default function ThemeToggleButton() {
  const dispatch = useAppDispatch();

  // Icon visibility is driven purely by the .dark class (CSS), not by
  // reading Redux theme state - that state starts as "light" during SSR
  // and only resolves to the real value on the client, so branching the
  // icon on it would mismatch during hydration. dark:hidden/dark:inline
  // sidesteps that entirely and lets this render statically on the server.
  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      aria-label="Toggle theme"
      className="p-2 rounded-full hover:bg-muted transition-colors duration-200"
    >
      <FaMoon className="w-6 h-6 text-foreground dark:hidden" />
      <FaSun className="w-6 h-6 text-yellow-400 hidden dark:inline" />
    </button>
  );
}
