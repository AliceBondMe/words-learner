export interface SnackbarMessageProps {
  message: string;
  open: boolean;
  onClose: () => void;
  severity?: "success" | "info" | "warning" | "error";
}
