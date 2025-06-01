import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose, // Standalone DialogClose
  DialogPortal,
} from "../dialog"; // Adjust path as needed

describe("Dialog Components", () => {
  test("DialogTrigger renders and can open a Dialog", () => {
    render(
      <Dialog>
        <DialogTrigger data-testid="trigger">Open Dialog</DialogTrigger>
        <DialogContent data-testid="content">
          <DialogTitle>Test Title</DialogTitle>
          <DialogDescription>Trigger Test Description</DialogDescription>
        </DialogContent>
      </Dialog>
    );

    const trigger = screen.getByTestId("trigger");
    expect(trigger).toBeInTheDocument();
    expect(screen.queryByTestId("content")).not.toBeInTheDocument(); // Initially closed

    fireEvent.click(trigger);
    expect(screen.getByTestId("content")).toBeInTheDocument(); // Opens on click
  });

  test("DialogContent renders with children and respects showCloseButton=false", () => {
    render(
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent showCloseButton={false}>
          <DialogTitle>No Close Button</DialogTitle>
          <DialogDescription>No close button test.</DialogDescription>
          <p>Content here</p>
        </DialogContent>
      </Dialog>
    );
    expect(screen.getByText("No Close Button")).toBeInTheDocument();
    expect(screen.getByText("Content here")).toBeInTheDocument();
    // The X close button is identified by its "Close" sr-only text or its icon.
    // Since showCloseButton is false, it should not be there.
    expect(
      screen.queryByRole("button", { name: /close/i })
    ).not.toBeInTheDocument();
  });

  test("DialogContent renders default X close button", () => {
    render(
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent>
          <DialogTitle>With Close Button</DialogTitle>
          <DialogDescription>With close button test.</DialogDescription>
        </DialogContent>
      </Dialog>
    );
    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
  });

  test("Standalone DialogClose button can close a Dialog", () => {
    const handleOpenChange = jest.fn();
    render(
      <Dialog open={true} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogTitle>Test Close</DialogTitle>
          <DialogDescription>Standalone close test.</DialogDescription>
          <DialogFooter>
            <DialogClose data-testid="standalone-close-btn">
              Close Manually
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    const closeButton = screen.getByTestId("standalone-close-btn");
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
    // Radix Dialog calls onOpenChange with false when its internal close is triggered.
    // We expect our handleOpenChange to be called because DialogClose triggers it.
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  test("DialogHeader, DialogFooter, DialogTitle, DialogDescription render correctly", () => {
    render(
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent>
          <DialogHeader data-testid="header">
            <DialogTitle data-testid="title">Header Title</DialogTitle>
          </DialogHeader>
          <DialogDescription data-testid="description">
            This is a description.
          </DialogDescription>
          <p>Some content</p>
          <DialogFooter data-testid="footer">
            <button>OK</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("title")).toHaveTextContent("Header Title");
    expect(screen.getByTestId("description")).toHaveTextContent(
      "This is a description."
    );
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  test("DialogContent implies DialogPortal and renders DialogOverlay", () => {
    render(
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent data-testid="dialog-content">
          <DialogTitle>Portal/Overlay Test</DialogTitle>
          <DialogDescription>
            Testing portal and overlay implicitly.
          </DialogDescription>
        </DialogContent>
      </Dialog>
    );
    // Check that DialogContent is rendered (implies portal is working)
    expect(screen.getByTestId("dialog-content")).toBeInTheDocument();

    // Radix UI renders the overlay as a sibling with a specific data-state when open.
    // Our DialogOverlay component adds data-slot="dialog-overlay".
    // Let's find it by the data-slot attribute we added in our component wrapper.
    // We expect only one overlay when one dialog is open.
    const overlayElement = document.querySelector(
      '[data-slot="dialog-overlay"]'
    );
    // In Radix 1.1.x (and potentially others), the overlay might be rendered by DialogPrimitive.Content itself
    // if we don't explicitly provide DialogOverlay within DialogPortal.
    // Our component DialogContent *always* renders its own DialogOverlay.
    // Let's find the overlay by its data-slot, which our component adds.
    // If DialogContent itself renders an overlay, it might also have specific Radix attributes.

    // Find the overlay by the `data-slot` attribute we added in our `DialogOverlay` component
    // This requires that our `DialogOverlay` wrapper component is used by `DialogContent`.
    // From the dialog.tsx, DialogContent always renders <DialogOverlay />
    expect(overlayElement).toBeInTheDocument();
    expect(overlayElement).toHaveAttribute("data-state", "open");
  });

  test("Dialog (root) renders its children", () => {
    render(
      <Dialog>
        <span data-testid="child-span">Hello</span>
      </Dialog>
    );
    expect(screen.getByTestId("child-span")).toBeInTheDocument();
  });

  // Test for DialogPortal specifically if needed, though its usage is implicit in DialogContent
  test("DialogPortal correctly portals its children to document.body", () => {
    render(
      <Dialog open={true}>
        <DialogPortal data-testid="portal-direct-test">
          <div data-testid="portaled-div">Portaled Content</div>
        </DialogPortal>
      </Dialog>
    );
    // Content rendered via DialogPortal should be in the document, typically at the end of body
    const portaledDiv = screen.getByTestId("portaled-div");
    expect(portaledDiv).toBeInTheDocument();
    // Check if it's a direct child of body or within a div that is a direct child of body (Radix specific)
    expect(document.body).toContainElement(portaledDiv.parentElement);
  });
});
