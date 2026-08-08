// src/store/slices/themeSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  mode: "light" | "dark";
  isMenuOpen: boolean;
  scrolled: boolean;
}

// A blocking inline script (see RootLayout) sets the "dark" class on
// <html> before React ever runs, so on the client the DOM already
// reflects the persisted/system theme. Reading it here keeps the Redux
// store in sync from the very first render instead of defaulting to
// "light" and flipping after a post-mount effect (the cause of the
// theme flash / stale-state bug).
const getInitialMode = (): "light" | "dark" => {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
};

const initialState: ThemeState = {
  mode: getInitialMode(),
  isMenuOpen: false,
  scrolled: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
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
  toggleTheme,
  setTheme,
  setMenuOpen,
  toggleMenu,
  closeMenu,
  setScrolled
} = themeSlice.actions;

export default themeSlice.reducer;