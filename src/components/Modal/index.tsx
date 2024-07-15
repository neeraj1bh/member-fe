import React, { FC, useEffect, useState } from "react";
import Button from "../Button";

interface ActionButtonProps {
  onClick: () => void;
  label?: string;
  disabled?: boolean;
}

interface Props {
  isOpen: boolean;
  title: string;
  children?: React.ReactNode;
  submitOptions?: ActionButtonProps;
  cancelOptions?: ActionButtonProps;
  onClose: () => void;
}

const Modal: React.FC<Props> = ({
  isOpen,
  title,
  children,
  cancelOptions,
  submitOptions,
  onClose,
}) => {
  //close on  esc
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        {children}
        <div className="flex gap-2 mt-4">
          {cancelOptions && (
            <Button
              fullWidth
              disabled={cancelOptions?.disabled}
              variant="outlined"
              onClick={cancelOptions ? cancelOptions.onClick : onClose}
            >
              {cancelOptions?.label}
            </Button>
          )}
          {submitOptions && (
            <Button
              fullWidth
              disabled={submitOptions?.disabled}
              onClick={submitOptions?.onClick}
              variant="filled"
            >
              {submitOptions?.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
