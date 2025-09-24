import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Codec } from "./Codec";

// Mock the @fluffylabs/shared-ui Header component
vi.mock("@fluffylabs/shared-ui", () => ({
  Header: ({ endSlot }: { endSlot: React.ReactNode }) => (
    <div data-testid="mock-header">
      <div data-testid="header-endslot">{endSlot}</div>
    </div>
  ),
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
  it("renders the app with header and main content", () => {
    render(<Codec />);

    // Check that the header is rendered
    expect(screen.getByTestId("mock-header")).toBeInTheDocument();

    // Check that "JAM Codec" appears in the header
    expect(screen.getByText("JAM Codec")).toBeInTheDocument();

    // Check that the main codec input elements are present
    expect(screen.getByText("Configuration")).toBeInTheDocument();
    expect(screen.getByText("JAM Object")).toBeInTheDocument();
    expect(screen.getByText("Chain Spec")).toBeInTheDocument();
    expect(screen.getByText("Data")).toBeInTheDocument();
    expect(screen.getByText("Bytes blob as hex string")).toBeInTheDocument();

    // Check that the example buttons are present
    expect(screen.getByText("Load codec test vector")).toBeInTheDocument();
    expect(screen.getByText("Block Example")).toBeInTheDocument();
    expect(screen.getByText("Header Example")).toBeInTheDocument();
  });

  it("displays the correct default values", () => {
    render(<Codec />);

    // Check that Header is selected by default (first in the list)
    const jamObjectSelect = screen.getByDisplayValue("Header");
    expect(jamObjectSelect).toBeInTheDocument();

    // Check that Tiny chain spec is selected by default
    const chainSpecSelect = screen.getByDisplayValue("Tiny");
    expect(chainSpecSelect).toBeInTheDocument();
  });
});
