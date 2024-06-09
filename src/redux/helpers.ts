import axios from "axios";

export const handleError = (error: unknown) => {
  let errorMessage = "An unknown error occurred";

  if (axios.isAxiosError(error) && error.response) {
    errorMessage = error.response.data.message || error.message;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return errorMessage;
};
