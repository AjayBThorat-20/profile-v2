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
  // icon on it would mismatch during hydration. Both icons are stacked and
  // crossfade with a rotate/scale transition instead of an instant
  // display:none swap (which can't be animated).
  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      aria-label="Toggle theme"
      className="relative p-2 rounded-full hover:bg-muted transition-colors duration-200"
    >
      <FaMoon className="w-6 h-6 text-foreground transition-all duration-300 ease-out scale-100 rotate-0 dark:scale-0 dark:-rotate-90" />
      <FaSun className="absolute inset-0 m-auto w-6 h-6 text-yellow-400 transition-all duration-300 ease-out scale-0 rotate-90 dark:scale-100 dark:rotate-0" />
    </button>
  );
}
