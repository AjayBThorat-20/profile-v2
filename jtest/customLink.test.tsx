import { render, screen } from "@testing-library/react";
import CustomLink from "@/Components/Links/customLink";

const mockUsePathname = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

describe("CustomLink", () => {
  afterEach(() => {
    mockUsePathname.mockReset();
  });

  it("renders the title as link text pointing at href", () => {
    mockUsePathname.mockReturnValue("/somewhere-else");
    render(<CustomLink href="/about" title="About" />);

    const link = screen.getByRole("link", { name: "About" });
    expect(link).toHaveAttribute("href", "/about");
  });

  it("marks the underline as active (w-full) when the pathname matches href", () => {
    mockUsePathname.mockReturnValue("/about");
    render(<CustomLink href="/about" title="About" />);

    const link = screen.getByRole("link", { name: "About" });
    const underline = link.querySelector("span");
    expect(underline?.className).toContain("w-full");
  });

  it("leaves the underline collapsed (w-0) when the pathname does not match href", () => {
    mockUsePathname.mockReturnValue("/somewhere-else");
    render(<CustomLink href="/about" title="About" />);

    const link = screen.getByRole("link", { name: "About" });
    const underline = link.querySelector("span");
    expect(underline?.className).toContain("w-0");
  });
});
