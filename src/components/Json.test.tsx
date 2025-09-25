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

describe("Json", () => {
  const defaultProps = {
    result: '{"test": "value"}',
    isJsonEditable: false,
    setIsJsonEditable: vi.fn(),
    onJsonChange: vi.fn(),
    error: null,
  };

  it("renders json result in pre tag when not editable", () => {
    render(<Json {...defaultProps} />);

    const preElement = screen.getByText(defaultProps.result);
    expect(preElement).toBeInTheDocument();
    expect(preElement.tagName).toBe("PRE");
  });

  it("renders empty result", () => {
    const emptyProps = { ...defaultProps, result: "" };
    render(<Json {...emptyProps} />);

    const preElement = document.querySelector("pre");
    expect(preElement).toBeInTheDocument();
    expect(preElement?.textContent).toBe("");
  });
});
