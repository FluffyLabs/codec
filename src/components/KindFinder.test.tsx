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
  }: { children: React.ReactNode; onClick?: () => void; variant?: string; [key: string]: unknown }) => (
    <button onClick={onClick} data-variant={variant} {...props}>
      {children}
    </button>
  ),
}));

// Mock @typeberry/lib with complete structure from Codec.test.tsx
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
      parseBlob: vi.fn().mockImplementation(() => {
        throw new Error("Invalid blob");
      }),
    },
  },
  codec: {
    Decoder: {
      decodeObject: vi.fn().mockImplementation(() => {
        throw new Error("Decode error");
      }),
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
      sequenceVarLen: vi.fn().mockReturnValue({}),
    },
  },
  config: {
    tinyChainSpec: {},
  },
  state: {
    ServiceAccountInfo: { Codec: {} },
  },
  state_merkleization: {
    serialize: {
      authPools: { Codec: {} },
      authQueues: { Codec: {} },
      recentBlocks: { Codec: {} },
      safrole: { Codec: {} },
      disputesRecords: { Codec: {} },
      entropy: { Codec: {} },
      designatedValidators: { Codec: {} },
      currentValidators: { Codec: {} },
      previousValidators: { Codec: {} },
      availabilityAssignment: { Codec: {} },
      timeslot: { Codec: {} },
      privilegedServices: { Codec: {} },
      statistics: { Codec: {} },
      accumulationQueue: { Codec: {} },
    },
  },
}));

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
