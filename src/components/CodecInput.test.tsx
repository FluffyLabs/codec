import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CodecInput } from "./CodecInput";

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
  ButtonGroup: ({ children }: { children: React.ReactNode }) => <div data-testid="button-group">{children}</div>,
  cn: (...classes: unknown[]) => classes.filter(Boolean).join(" "),
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
      parseBlob: vi.fn().mockReturnValue(new Uint8Array()),
      blobFrom: vi.fn().mockReturnValue({ toString: () => "mocked-blob" }),
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

// Mock child components
vi.mock("./ChainSpecSelect", () => ({
  ChainSpecSelect: ({ chainSpec }: { setChainSpec: (spec: string) => void; chainSpec: string }) => (
    <div data-testid="chain-spec-select">ChainSpec: {chainSpec}</div>
  ),
}));

vi.mock("./JamObjectSelect", () => ({
  JamObjectSelect: ({ kind }: { setKind: (kind: string) => void; kind: string }) => (
    <div data-testid="jam-object-select">JAM Object: {kind}</div>
  ),
}));

vi.mock("./KindFinder", () => ({
  KindFinder: () => (
    <div data-testid="kind-finder">KindFinder</div>
  ),
}));

vi.mock("./ui/Textarea", () => ({
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
}));

describe("CodecInput", () => {
  const defaultProps = {
    onChange: vi.fn(),
    value: "test-value",
    error: null,
    kind: "Block",
    setKind: vi.fn(),
    chainSpec: "Tiny",
    setChainSpec: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all main elements", () => {
    render(<CodecInput {...defaultProps} />);

    expect(screen.getByTestId("jam-object-select")).toBeInTheDocument();
    expect(screen.getByTestId("chain-spec-select")).toBeInTheDocument();
    expect(screen.getByText("From file")).toBeInTheDocument();
    expect(screen.getByText("Block Example")).toBeInTheDocument();
    expect(screen.getByText("Header Example")).toBeInTheDocument();
    expect(screen.getByDisplayValue("test-value")).toBeInTheDocument();
  });

  it("renders error state correctly", () => {
    const propsWithError = {
      ...defaultProps,
      error: "Test error message",
    };

    render(<CodecInput {...propsWithError} />);

    expect(screen.getByText("Test error message")).toBeInTheDocument();
    expect(screen.getByTestId("kind-finder")).toBeInTheDocument();
  });

  it("does not render error elements when no error", () => {
    render(<CodecInput {...defaultProps} />);

    expect(screen.queryByTestId("kind-finder")).not.toBeInTheDocument();
  });

  it("renders button group with example buttons", () => {
    render(<CodecInput {...defaultProps} />);

    expect(screen.getByTestId("button-group")).toBeInTheDocument();
    expect(screen.getByText("Block Example")).toBeInTheDocument();
    expect(screen.getByText("Header Example")).toBeInTheDocument();
  });
});
