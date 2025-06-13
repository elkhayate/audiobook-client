import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
}: ConfirmationModalProps) {
  const getVariantColor = () => {
    switch (variant) {
      case "danger":
        return "danger";
      case "warning":
        return "warning";
      case "info":
        return "primary";
      default:
        return "danger";
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
        <ModalBody>
          <p>{message}</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            {cancelText}
          </Button>
          <Button color={getVariantColor()} onPress={onConfirm}>
            {confirmText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
} 