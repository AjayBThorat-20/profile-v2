"use client";

import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleTheme } from "@/store/slices/themeSlice";

export default function ThemeToggleButton() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.mode);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
      className="p-2 rounded-full hover:bg-muted transition-colors duration-200"
    >
      {theme === "light" ? (
        <FaMoon className="w-6 h-6 text-foreground" />
      ) : (
        <FaSun className="w-6 h-6 text-yellow-400" />
      )}
    </button>
  );
}
