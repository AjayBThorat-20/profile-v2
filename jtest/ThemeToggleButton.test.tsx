import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import themeReducer from "@/store/slices/themeSlice";
import ThemeToggleButton from "@/Components/Buttons/ThemeToggleButton";

function renderWithStore() {
  const store = configureStore({ reducer: { theme: themeReducer } });
  render(
    <Provider store={store}>
      <ThemeToggleButton />
    </Provider>
  );
  return store;
}

describe("ThemeToggleButton", () => {
  it("renders a toggle button with an accessible label", () => {
    renderWithStore();
    expect(screen.getByRole("button", { name: /toggle theme/i })).toBeInTheDocument();
  });

  it("dispatches toggleTheme and flips the store mode when clicked", async () => {
    const user = userEvent.setup();
    const store = renderWithStore();

    expect(store.getState().theme.mode).toBe("light");

    await user.click(screen.getByRole("button", { name: /toggle theme/i }));

    expect(store.getState().theme.mode).toBe("dark");
  });
});
