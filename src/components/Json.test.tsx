import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Json } from "./Json";

describe("Json", () => {
  it("renders json result in pre tag", () => {
    const testResult = '{"test": "value"}';
    render(<Json result={testResult} />);

    const preElement = screen.getByText(testResult);
    expect(preElement).toBeInTheDocument();
    expect(preElement.tagName).toBe("PRE");
  });

  it("renders empty result", () => {
    render(<Json result="" />);

    const preElement = document.querySelector("pre");
    expect(preElement).toBeInTheDocument();
    expect(preElement?.textContent).toBe("");
  });
});
