import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { KindFinder } from "./KindFinder";

// Mock the @fluffylabs/shared-ui components
vi.mock("@fluffylabs/shared-ui", () => ({
  Button: ({
    children,
    onClick,
    variant,
    ...props
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: string;
    [key: string]: unknown;
  }) => (
    <button onClick={onClick} data-variant={variant} {...props}>
      {children}
    </button>
  ),
}));

vi.mock("@typeberry/lib", async () => {
  const actual = await vi.importActual<typeof import("@typeberry/lib")>("@typeberry/lib");
  return actual;
});

describe("KindFinder", () => {
  const mockSetKind = vi.fn();

  beforeEach(() => {
    mockSetKind.mockClear();
  });

  it("renders error message when no kind is found", () => {
    render(<KindFinder value="invalid" chainSpec="Tiny" setKind={mockSetKind} />);

    expect(
      screen.getByText("Unable to detect the type of input. Perhaps choose different chain spec?"),
    ).toBeInTheDocument();
  });

  it("renders warning message container when no kind found", () => {
    render(<KindFinder value="invalid" chainSpec="Tiny" setKind={mockSetKind} />);

    const warningDiv = screen.getByText(
      "Unable to detect the type of input. Perhaps choose different chain spec?",
    ).parentElement;
    expect(warningDiv).toBeInTheDocument();
  });
});
