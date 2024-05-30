import axios from "axios";

axios.defaults.baseURL = "https://vocab-builder-backend.p.goit.global/api";

export const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};
