import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { JamObjectSelect } from "./JamObjectSelect";

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
  DropdownMenu: ({ children }: { children: React.ReactNode }) => <div data-testid="dropdown-menu">{children}</div>,
  DropdownMenuTrigger: ({ children }: { children: React.ReactNode; asChild?: boolean }) => (
    <div data-testid="dropdown-menu-trigger">{children}</div>
  ),
  DropdownMenuContent: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="dropdown-menu-content" className={className}>
      {children}
    </div>
  ),
  DropdownMenuRadioGroup: ({
    children,
    value,
  }: {
    children: React.ReactNode;
    value?: string;
    onValueChange?: (value: string) => void;
  }) => (
    <div data-testid="dropdown-menu-radio-group" data-value={value}>
      {children}
    </div>
  ),
  DropdownMenuRadioItem: ({ children, value }: { children: React.ReactNode; value: string }) => (
    <div data-testid="dropdown-menu-radio-item" data-value={value}>
      {children}
    </div>
  ),
  DropdownMenuSeparator: () => <div data-testid="dropdown-menu-separator" />,
}));

describe("JamObjectSelect", () => {
  const mockSetKind = vi.fn();

  beforeEach(() => {
    mockSetKind.mockClear();
  });

  it("renders with selected kind", () => {
    render(<JamObjectSelect kind="Block" setKind={mockSetKind} />);

    expect(screen.getByText("JAM Object: Block")).toBeInTheDocument();
  });

  it("renders dropdown menu structure", () => {
    render(<JamObjectSelect kind="Header" setKind={mockSetKind} />);

    expect(screen.getByTestId("dropdown-menu")).toBeInTheDocument();
    expect(screen.getByTestId("dropdown-menu-trigger")).toBeInTheDocument();
    expect(screen.getByTestId("dropdown-menu-content")).toBeInTheDocument();
    expect(screen.getByTestId("dropdown-menu-radio-group")).toBeInTheDocument();
  });

  it("displays different kinds", () => {
    render(<JamObjectSelect kind="Extrinsic" setKind={mockSetKind} />);

    expect(screen.getByText("JAM Object: Extrinsic")).toBeInTheDocument();
  });
});
