import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import SettingsDialog from "./SettingsDialog";

// Mock @fluffylabs/shared-ui
vi.mock("@fluffylabs/shared-ui", () => ({
  Button: ({
    children,
    onClick,
    ...props
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    [key: string]: unknown;
  }) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
}));

// Mock @typeberry/lib
vi.mock("@typeberry/lib", () => ({
  utils: {
    GpVersion: {
      V1: "V1",
      V2: "V2",
    },
    TestSuite: {
      Suite1: "Suite1",
      Suite2: "Suite2",
    },
    CURRENT_VERSION: "V1",
    CURRENT_SUITE: "Suite1",
  },
}));

// Mock window.process.env
Object.defineProperty(window, "process", {
  value: {
    env: {
      GP_VERSION: "V1",
      TEST_SUITE: "Suite1",
    },
  },
});

describe("SettingsDialog", () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it("renders nothing when not open", () => {
    render(<SettingsDialog isOpen={false} onClose={mockOnClose} />);

    expect(screen.queryByText("Settings")).not.toBeInTheDocument();
  });

  it("renders dialog when open", () => {
    render(<SettingsDialog isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("renders form fields when open", () => {
    render(<SettingsDialog isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByText("Gray Paper Version")).toBeInTheDocument();
    expect(screen.getByText("Test Vector Suite")).toBeInTheDocument();
    expect(screen.getByLabelText("Gray Paper Version")).toBeInTheDocument();
    expect(screen.getByLabelText("Test Vector Suite")).toBeInTheDocument();
  });

  it("renders reload button", () => {
    render(<SettingsDialog isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByText("Reload")).toBeInTheDocument();
  });

  it("renders close button", () => {
    render(<SettingsDialog isOpen={true} onClose={mockOnClose} />);

    const closeButton = screen.getByLabelText("Close dialog");
    expect(closeButton).toBeInTheDocument();
  });
});
