import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Resizable } from "./Resizable";

// Mock CSS import
vi.mock("./Resizable.css", () => ({}));

describe("Resizable", () => {
  it("renders left and right content", () => {
    const leftContent = <div>Left Content</div>;
    const rightContent = <div>Right Content</div>;

    render(<Resizable left={leftContent} right={rightContent} />);

    expect(screen.getByText("Left Content")).toBeInTheDocument();
    expect(screen.getByText("Right Content")).toBeInTheDocument();
  });

  it("renders with resizable structure", () => {
    const leftContent = <div>Left</div>;
    const rightContent = <div>Right</div>;

    render(<Resizable left={leftContent} right={rightContent} />);

    const resizableContainer = document.querySelector(".resizable");
    expect(resizableContainer).toBeInTheDocument();

    const leftPanel = document.querySelector(".left");
    const rightPanel = document.querySelector(".right");
    const handle = document.querySelector(".handle");

    expect(leftPanel).toBeInTheDocument();
    expect(rightPanel).toBeInTheDocument();
    expect(handle).toBeInTheDocument();
  });

  it("sets initial width styles on panels", () => {
    const leftContent = <div>Left</div>;
    const rightContent = <div>Right</div>;

    render(<Resizable left={leftContent} right={rightContent} />);

    const leftPanel = document.querySelector(".left") as HTMLElement;
    const rightPanel = document.querySelector(".right") as HTMLElement;

    expect(leftPanel.style.width).toContain("calc(");
    expect(rightPanel.style.width).toContain("%");
  });
});
