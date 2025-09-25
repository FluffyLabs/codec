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
  }: { children: React.ReactNode; onClick?: () => void; variant?: string; [key: string]: unknown }) => (
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
  }: { children: React.ReactNode; value?: string; onValueChange?: (value: string) => void }) => (
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
  cn: (...classes: unknown[]) => classes.filter(Boolean).join(" "),
}));

// Mock the @typeberry/lib imports with minimal functionality
vi.mock("@typeberry/lib", () => ({
  block: {
    Block: { Codec: {} },
    EpochMarker: { Codec: {} },
    Extrinsic: { Codec: {} },
    Header: { Codec: {} },
    assurances: {
      AvailabilityAssurance: { Codec: {} },
      assurancesExtrinsicCodec: {},
    },
    disputes: {
      Culprit: { Codec: {} },
      Fault: { Codec: {} },
      Judgement: { Codec: {} },
      Verdict: { Codec: {} },
      DisputesExtrinsic: { Codec: {} },
    },
    guarantees: {
      Credential: { Codec: {} },
      ReportGuarantee: { Codec: {} },
      guaranteesExtrinsicCodec: {},
    },
    preimage: {
      Preimage: { Codec: {} },
      preimagesExtrinsicCodec: {},
    },
    refineContext: {
      RefineContext: { Codec: {} },
    },
    tickets: {
      SignedTicket: { Codec: {} },
      Ticket: { Codec: {} },
      ticketsExtrinsicCodec: {},
    },
    workItem: {
      ImportSpec: { Codec: {} },
      WorkItem: { Codec: {} },
      WorkItemExtrinsicSpec: { Codec: {} },
    },
    workPackage: {
      WorkPackage: { Codec: {} },
    },
    workReport: {
      WorkPackageSpec: { Codec: {} },
      WorkReport: { Codec: {} },
    },
    workResult: {
      WorkExecResult: { Codec: {} },
      WorkResult: { Codec: {} },
    },
  },
  bytes: {
    BytesBlob: {
      parseBlob: vi.fn().mockReturnValue(new Uint8Array()),
      blobFrom: vi.fn().mockReturnValue({ toString: () => "" }),
    },
  },
  codec: {
    Decoder: {
      decodeObject: vi.fn().mockReturnValue({}),
    },
    codec: {
      u8: {},
      u16: {},
      u24: {},
      u32: {},
      varU32: {},
      varU64: {},
      i8: {},
      i16: {},
      i24: {},
      i32: {},
      bytes: vi.fn().mockReturnValue({}),
      blob: {},
      bitVecVarLen: {},
    },
  },
  config: {
    tinyChainSpec: {},
  },
}));

describe("Codec", () => {
  it("renders the codec interface with main content", () => {
    render(
      <MemoryRouter>
        <Codec />
      </MemoryRouter>,
    );

    // Check that the main codec input elements are present
    expect(screen.getByText("JAM Object: Block")).toBeInTheDocument();
    expect(screen.getByText("Parameters: Tiny")).toBeInTheDocument();
    expect(screen.getByText("From file")).toBeInTheDocument();

    // Check that the example buttons are present
    expect(screen.getByText("Block Example")).toBeInTheDocument();
    expect(screen.getByText("Header Example")).toBeInTheDocument();
  });

  it("displays the correct default values", () => {
    render(
      <MemoryRouter>
        <Codec />
      </MemoryRouter>,
    );

    // Check that Block is selected by default (as set in Codec component)
    expect(screen.getByText("JAM Object: Block")).toBeInTheDocument();

    // Check that Tiny chain spec is selected by default
    expect(screen.getByText("Parameters: Tiny")).toBeInTheDocument();
  });
});
