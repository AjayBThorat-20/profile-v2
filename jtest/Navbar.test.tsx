import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import themeReducer from "@/store/slices/themeSlice";
import Navbar from "@/Components/Header/navbar";

function renderWithStore() {
  const store = configureStore({ reducer: { theme: themeReducer } });
  const utils = render(
    <Provider store={store}>
      <Navbar />
    </Provider>
  );
  return { store, ...utils };
}

describe("Navbar", () => {
  it("renders the logo and menu trigger", () => {
    const { container } = renderWithStore();

    expect(container.querySelector('a[href="#home"]')).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /toggle menu/i })).toBeInTheDocument();
  });

  it("menu trigger toggles the overlay open state", async () => {
    const user = userEvent.setup();
    const { store } = renderWithStore();

    const trigger = screen.getByRole("button", { name: /toggle menu/i });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(store.getState().theme.isMenuOpen).toBe(false);

    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(store.getState().theme.isMenuOpen).toBe(true);
  });

  it("clicking an overlay link closes the menu", async () => {
    const user = userEvent.setup();
    const { store } = renderWithStore();

    await user.click(screen.getByRole("button", { name: /toggle menu/i }));
    expect(store.getState().theme.isMenuOpen).toBe(true);

    const aboutLink = screen.getByRole("link", { name: /about/i });
    await user.click(aboutLink);

    expect(store.getState().theme.isMenuOpen).toBe(false);
  });
});
