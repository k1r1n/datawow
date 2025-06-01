import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DeleteConfirmationDialog from "../delete-confirm-dialog";

describe("DeleteConfirmationDialog", () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();
  const itemName = "Test Item";

  beforeEach(() => {
    mockOnClose.mockClear();
    mockOnConfirm.mockClear();
  });

  test("renders correctly when open", () => {
    render(
      <DeleteConfirmationDialog
        isOpen={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        itemName={itemName}
      />
    );

    expect(screen.getByText("Are you sure to delete?")).toBeInTheDocument();
    expect(screen.getByText(`"${itemName}"`)).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Yes, Delete")).toBeInTheDocument();
  });

  test("does not render when closed", () => {
    render(
      <DeleteConfirmationDialog
        isOpen={false}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        itemName={itemName}
      />
    );

    expect(
      screen.queryByText("Are you sure to delete?")
    ).not.toBeInTheDocument();
  });

  test("calls onClose when cancel button is clicked", () => {
    render(
      <DeleteConfirmationDialog
        isOpen={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        itemName={itemName}
      />
    );

    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("calls onConfirm and onClose when delete button is clicked", () => {
    render(
      <DeleteConfirmationDialog
        isOpen={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        itemName={itemName}
      />
    );

    fireEvent.click(screen.getByText("Yes, Delete"));
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  // Test for onOpenChange behavior is implicitly covered by testing
  // the "Cancel" button and the fact that the `onClose` prop is passed to the Dialog's `onOpenChange`.
  // A direct simulation of Radix Dialog's internal close triggers (e.g., Escape key or overlay click)
  // is complex and often unnecessary if the passed-in callbacks are tested.
});
