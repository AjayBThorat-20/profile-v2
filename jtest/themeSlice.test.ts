import themeReducer, {
  toggleTheme,
  setTheme,
  toggleMenu,
  closeMenu,
  setMenuOpen,
  setScrolled,
} from "@/store/slices/themeSlice";

describe("themeSlice reducer", () => {
  const baseState = {
    mode: "light" as const,
    isMenuOpen: false,
    scrolled: false,
  };

  it("returns the initial state for an unknown action", () => {
    const state = themeReducer(undefined, { type: "unknown" });
    expect(state.mode).toMatch(/light|dark/);
    expect(state.isMenuOpen).toBe(false);
    expect(state.scrolled).toBe(false);
  });

  it("toggleTheme flips light to dark and back", () => {
    const dark = themeReducer(baseState, toggleTheme());
    expect(dark.mode).toBe("dark");

    const light = themeReducer(dark, toggleTheme());
    expect(light.mode).toBe("light");
  });

  it("setTheme sets an explicit mode", () => {
    const state = themeReducer(baseState, setTheme("dark"));
    expect(state.mode).toBe("dark");
  });

  it("toggleMenu flips isMenuOpen", () => {
    const opened = themeReducer(baseState, toggleMenu());
    expect(opened.isMenuOpen).toBe(true);

    const closed = themeReducer(opened, toggleMenu());
    expect(closed.isMenuOpen).toBe(false);
  });

  it("closeMenu always sets isMenuOpen to false", () => {
    const state = themeReducer({ ...baseState, isMenuOpen: true }, closeMenu());
    expect(state.isMenuOpen).toBe(false);
  });

  it("setMenuOpen sets isMenuOpen explicitly", () => {
    const state = themeReducer(baseState, setMenuOpen(true));
    expect(state.isMenuOpen).toBe(true);
  });

  it("setScrolled sets the scrolled flag", () => {
    const state = themeReducer(baseState, setScrolled(true));
    expect(state.scrolled).toBe(true);
  });

  it("toggleTheme persists the new mode to localStorage", () => {
    localStorage.clear();
    themeReducer(baseState, toggleTheme());
    expect(localStorage.getItem("theme")).toBe("dark");
  });
});
