"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type ErrorModalProps = {
  isError: boolean;
  // This func should toggle isError
  closeModal: () => void;
  resolutionCallback?: () => void;
  message: string;
  title?: string;
};

export default function ErrorModal({
  isError,
  resolutionCallback,
  message,
  title,
  closeModal,
}: ErrorModalProps) {
  return (
    <Dialog open={isError}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>
            {title ? title : "Oops, Something Went Wrong..."}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>{message}</DialogDescription>
        <DialogFooter>
          {resolutionCallback && (
            <Button onClick={resolutionCallback}>Resolve</Button>
          )}
          <Button variant="secondary" onClick={closeModal}>
            Back
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

type ErrorState = {
  message?: string;
  resolutionCallback?: () => void;
};

export function useErrorModal() {
  const [errorState, setErrorState] = useState<ErrorState>({});

  // If you want the modal to close after resolve, call closeErrorModal in the callback func
  const closeErrorModal = () => setErrorState({});
  const openErrorModal = (message: string, resolutionCallback?: () => void) => {
    setErrorState({
      resolutionCallback,
      message,
    });
  };

  const isError = !!errorState.message;

  return {
    isError,
    errorState,
    closeErrorModal,
    openErrorModal,
  };
}
