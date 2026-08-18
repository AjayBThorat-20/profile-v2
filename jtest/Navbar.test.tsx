import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import themeReducer from "@/store/slices/themeSlice";
import Navbar from "@/Components/Header/navbar";

const mockPush = jest.fn();
const mockUsePathname = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => mockUsePathname(),
}));

function renderWithStore() {
  const store = configureStore({ reducer: { theme: themeReducer } });
  render(
    <Provider store={store}>
      <Navbar />
    </Provider>
  );
  return store;
}

describe("Navbar", () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue("/");
    mockPush.mockClear();
  });

  it("renders every top-level nav link", () => {
    renderWithStore();

    ["Home", "About", "Projects", "Experience", "Contact"].forEach((label) => {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    });
  });

  it("mobile hamburger button toggles the menu open state", async () => {
    const user = userEvent.setup();
    const store = renderWithStore();

    const hamburger = screen.getByRole("button", { name: /toggle menu/i });
    expect(hamburger).toHaveAttribute("aria-expanded", "false");
    expect(store.getState().theme.isMenuOpen).toBe(false);

    await user.click(hamburger);

    expect(hamburger).toHaveAttribute("aria-expanded", "true");
    expect(store.getState().theme.isMenuOpen).toBe(true);
  });

  it("clicking a mobile menu link closes the menu and navigates", async () => {
    const user = userEvent.setup();
    const store = renderWithStore();

    await user.click(screen.getByRole("button", { name: /toggle menu/i }));
    expect(store.getState().theme.isMenuOpen).toBe(true);

    const mobileAboutLink = screen.getAllByText("About").find(
      (el) => el.tagName === "BUTTON"
    );
    expect(mobileAboutLink).toBeDefined();

    await user.click(mobileAboutLink!);

    expect(mockPush).toHaveBeenCalledWith("/about");
    expect(store.getState().theme.isMenuOpen).toBe(false);
  });
});
