import { FC } from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

import { SnackbarMessageProps } from "./types";

const SnackbarMessage: FC<SnackbarMessageProps> = ({
  message,
  open,
  onClose,
  severity = "info",
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{ width: "70%" }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarMessage;
