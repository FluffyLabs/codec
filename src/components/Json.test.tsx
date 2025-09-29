import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Json } from "./Json";

vi.mock("./ui/Checkbox", () => ({
  Checkbox: ({
    label,
    checked,
    onChange,
  }: {
    label?: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => (
    <label>
      <input type="checkbox" checked={checked} onChange={onChange} />
      {label && <span>{label}</span>}
    </label>
  ),
}));

vi.mock("./ui/Textarea", () => ({
  Textarea: ({
    value,
    onChange,
    className,
  }: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    className?: string;
  }) => <textarea value={value} onChange={onChange} className={className} />,
}));

vi.mock("./DiffHighlight", () => ({
  DiffHighlight: ({ value }: { value: string; previousValue: string | null; isEnabled: boolean }) => (
    <div data-testid="diff-highlight">{value}</div>
  ),
}));

describe("Json", () => {
  const defaultProps = {
    value: '{"test": "value"}',
    previousValue: null,
    isJsonEditable: false,
    setIsJsonEditable: vi.fn(),
    onJsonChange: vi.fn(),
    error: null,
    isDiffEnabled: false,
  };

  it("renders json result via DiffHighlight when not editable", () => {
    render(<Json {...defaultProps} />);

    expect(screen.getByTestId("diff-highlight")).toBeInTheDocument();
    expect(screen.getByText(defaultProps.value)).toBeInTheDocument();
  });

  it("renders empty value", () => {
    const emptyProps = { ...defaultProps, value: "" };
    render(<Json {...emptyProps} />);

    expect(screen.getByTestId("diff-highlight")).toBeInTheDocument();
  });

  it("renders textarea when editable", () => {
    const editableProps = { ...defaultProps, isJsonEditable: true };
    render(<Json {...editableProps} />);

    expect(screen.getByDisplayValue(defaultProps.value)).toBeInTheDocument();
    expect(screen.queryByTestId("diff-highlight")).not.toBeInTheDocument();
  });

  it("shows error when json is editable and has error", () => {
    const errorProps = {
      ...defaultProps,
      isJsonEditable: true,
      error: "JSON parsing error",
    };
    render(<Json {...errorProps} />);

    expect(screen.getByText("JSON parsing error")).toBeInTheDocument();
  });
});
