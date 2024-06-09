import { useState, useCallback } from "react";

const useSnackbar = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleOpenSnackbar = useCallback(() => {
    setSnackbarOpen(true);
  }, []);

  const handleCloseSnackbar = useCallback(() => {
    setSnackbarOpen(false);
  }, []);

  return {
    snackbarOpen,
    handleOpenSnackbar,
    handleCloseSnackbar,
  };
};

export default useSnackbar;
