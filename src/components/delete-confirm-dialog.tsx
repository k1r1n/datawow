"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
}

export default function DeleteConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  itemName,
}: DeleteConfirmationDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md mx-4">
        <DialogHeader className="flex items-center justify-center">
          <div className="rounded-full bg-red-100 p-2 mb-4">
            <X className="h-6 w-6 text-red-500" />
          </div>
        </DialogHeader>
        <DialogTitle className="text-center text-base sm:text-lg">
          Are you sure to delete?
        </DialogTitle>
        <DialogDescription className="text-center font-medium text-sm sm:text-base">
          &quot;{itemName}&quot;
        </DialogDescription>
        <DialogFooter className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 sm:justify-between">
          <Button
            type="button"
            variant="outline"
            className="flex-1 border-gray-200 order-2 sm:order-1"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            className="flex-1 bg-red-500 hover:bg-red-600 order-1 sm:order-2"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Yes, Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
