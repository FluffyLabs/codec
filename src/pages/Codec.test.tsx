import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { Codec } from "./Codec";

// Mock the @fluffylabs/shared-ui components
vi.mock("@fluffylabs/shared-ui", () => ({
  Header: ({ endSlot }: { endSlot: React.ReactNode }) => (
    <div data-testid="mock-header">
      <div data-testid="header-endslot">{endSlot}</div>
    </div>
  ),
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
  ButtonGroup: ({ children }: { children: React.ReactNode }) => <div data-testid="button-group">{children}</div>,
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
  DropdownMenuLabel: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dropdown-menu-label">{children}</div>
  ),
  DropdownMenuSeparator: () => <div data-testid="dropdown-menu-separator" />,
  Textarea: ({
    value,
    onChange,
    className,
    ...props
  }: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    className?: string;
    [key: string]: unknown;
  }) => <textarea value={value} onChange={onChange} className={className} {...props} />,
  cn: (...classes: unknown[]) => classes.filter(Boolean).join(" "),
}));

vi.mock("@typeberry/lib", async () => {
  const actual = await vi.importActual<typeof import("@typeberry/lib")>("@typeberry/lib");
  return actual;
});

describe("Codec", () => {
  it("renders the codec interface with main content", () => {
    render(
      <MemoryRouter>
        <Codec />
      </MemoryRouter>,
    );

    // Check that the main codec input elements are present
    expect(screen.getByText("JAM Object: Header")).toBeInTheDocument();
    expect(screen.getByText("Parameters: Tiny")).toBeInTheDocument();
    expect(screen.getByText("From file")).toBeInTheDocument();

    // Check that the example button reflects the current kind
    expect(screen.getByRole("button", { name: "Example Header" })).toBeInTheDocument();
  });

  it("displays the correct default values", () => {
    render(
      <MemoryRouter>
        <Codec />
      </MemoryRouter>,
    );

    // Check that Header is selected by default (as set in Codec component)
    expect(screen.getByText("JAM Object: Header")).toBeInTheDocument();

    // Check that Tiny chain spec is selected by default
    expect(screen.getByText("Parameters: Tiny")).toBeInTheDocument();
  });
});
