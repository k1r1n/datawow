import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button, buttonVariants } from "../button"; // Adjust path as needed

describe("Button", () => {
  test("renders with default variant and size", () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    // Check for key classes of default variant and size
    expect(button).toHaveClass(
      "bg-primary",
      "text-primary-foreground",
      "h-9",
      "px-4",
      "py-2"
    );
  });

  test("renders with specified variant and size", () => {
    render(
      <Button variant="destructive" size="lg">
        Delete
      </Button>
    );
    const button = screen.getByRole("button", { name: /delete/i });
    // Check for key classes of destructive variant and lg size
    expect(button).toHaveClass("bg-destructive", "text-white", "h-10", "px-6");
  });

  test("renders with ghost variant", () => {
    render(<Button variant="ghost">Ghost Button</Button>);
    const button = screen.getByRole("button", { name: /ghost button/i });
    expect(button).toHaveClass(
      "hover:bg-accent",
      "hover:text-accent-foreground"
    );
  });

  test("renders with link variant", () => {
    render(<Button variant="link">Link Button</Button>);
    const button = screen.getByRole("button", { name: /link button/i });
    expect(button).toHaveClass(
      "text-primary",
      "underline-offset-4",
      "hover:underline"
    );
  });

  test("renders with outline variant", () => {
    render(<Button variant="outline">Outline Button</Button>);
    const button = screen.getByRole("button", { name: /outline button/i });
    expect(button).toHaveClass("border", "bg-background", "hover:bg-accent");
  });

  test("renders with secondary variant", () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    const button = screen.getByRole("button", { name: /secondary button/i });
    expect(button).toHaveClass(
      "bg-secondary",
      "text-secondary-foreground",
      "hover:bg-secondary/80"
    );
  });

  test("renders with sm size", () => {
    render(<Button size="sm">Small Button</Button>);
    const button = screen.getByRole("button", { name: /small button/i });
    // Check for key classes of sm size
    expect(button).toHaveClass("h-8", "rounded-md", "px-3");
    expect(button).toHaveClass("gap-1.5"); // sm size specific gap
  });

  test("renders with icon size", () => {
    render(<Button size="icon">Icon</Button>);
    const button = screen.getByRole("button", { name: /icon/i });
    expect(button).toHaveClass("size-9");
  });

  test("applies className prop", () => {
    render(<Button className="extra-class">Styled Button</Button>);
    const button = screen.getByRole("button", { name: /styled button/i });
    expect(button).toHaveClass("extra-class");
  });

  test("renders as a different component when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/">Link Button</a>
      </Button>
    );
    const linkButton = screen.getByRole("link", { name: /link button/i });
    expect(linkButton).toBeInTheDocument();
    expect(linkButton.tagName).toBe("A");
    // Check for a base class that should always be applied by buttonVariants
    expect(linkButton).toHaveClass("inline-flex");
  });

  test("passes additional props to the underlying component", () => {
    render(
      <Button data-testid="custom-button" aria-label="Custom Label">
        Prop Test
      </Button>
    );
    const button = screen.getByTestId("custom-button");
    expect(button).toHaveAttribute("aria-label", "Custom Label");
  });

  test("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole("button", { name: /disabled button/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass("disabled:opacity-50");
  });
});

// It's generally more robust to test the component's rendered output
// rather than the direct output of the cva function if the goal is to test the component.
// However, if buttonVariants itself is complex and needs separate unit testing,
// these tests can be useful. For now, focusing on component behavior.
describe("buttonVariants (direct CVA output tests - optional)", () => {
  test("generates correct classes for default variant and size", () => {
    expect(buttonVariants()).toMatch(/bg-primary/);
    expect(buttonVariants()).toMatch(/text-primary-foreground/);
    expect(buttonVariants()).toMatch(/h-9/);
  });

  test("generates correct classes for destructive variant", () => {
    expect(buttonVariants({ variant: "destructive" })).toMatch(
      /bg-destructive/
    );
  });

  test("generates correct classes for outline variant", () => {
    expect(buttonVariants({ variant: "outline" })).toMatch(/border/);
  });

  test("generates correct classes for secondary variant", () => {
    expect(buttonVariants({ variant: "secondary" })).toMatch(/bg-secondary/);
  });

  test("generates correct classes for ghost variant", () => {
    expect(buttonVariants({ variant: "ghost" })).toMatch(/hover:bg-accent/);
  });

  test("generates correct classes for link variant", () => {
    expect(buttonVariants({ variant: "link" })).toMatch(/text-primary/);
  });

  test("generates correct classes for sm size", () => {
    expect(buttonVariants({ size: "sm" })).toMatch(/h-8/);
    expect(buttonVariants({ size: "sm" })).toMatch(/gap-1.5/);
  });

  test("generates correct classes for lg size", () => {
    expect(buttonVariants({ size: "lg" })).toMatch(/h-10/);
  });

  test("generates correct classes for icon size", () => {
    expect(buttonVariants({ size: "icon" })).toMatch(/size-9/);
  });

  test("generates correct classes with custom className", () => {
    // cn function merges classes, so the custom class will be part of the string
    expect(buttonVariants({ className: "my-custom-class" })).toMatch(
      /my-custom-class/
    );
  });
});
