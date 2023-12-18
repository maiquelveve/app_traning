import axios from "axios";
import { API_BASE_URL } from "@src/config/constants";

export const apiService = axios.create({
  baseURL: API_BASE_URL,
  validateStatus: status => status < 500,
});
