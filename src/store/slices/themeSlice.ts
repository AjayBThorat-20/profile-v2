// src/store/slices/themeSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  mode: "light" | "dark";
  isMenuOpen: boolean;
  scrolled: boolean;
}

const initialState: ThemeState = {
  mode: "light",
  isMenuOpen: false,
  scrolled: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    hydrateTheme: (state) => {
      if (typeof window !== "undefined") {
        const savedTheme = localStorage.getItem("theme") as "light" | "dark";
        if (savedTheme) {
          state.mode = savedTheme;
        } else {
          // Check system preference if no saved theme
          const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
          state.mode = prefersDark ? "dark" : "light";
          localStorage.setItem("theme", state.mode);
        }
      }
    },
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", state.mode);
        document.documentElement.classList.toggle("dark", state.mode === "dark");
      }
    },
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.mode = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", action.payload);
        document.documentElement.classList.toggle("dark", action.payload === "dark");
      }
    },
    setMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMenuOpen = action.payload;
    },
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    closeMenu: (state) => {
      state.isMenuOpen = false;
    },
    setScrolled: (state, action: PayloadAction<boolean>) => {
      state.scrolled = action.payload;
    },
  },
});

export const { 
  hydrateTheme, 
  toggleTheme, 
  setTheme, 
  setMenuOpen, 
  toggleMenu, 
  closeMenu,
  setScrolled 
} = themeSlice.actions;

export default themeSlice.reducer;