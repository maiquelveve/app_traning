import axios from "axios";

export const apiService = axios.create({
  baseURL: "http://10.76.64.205:3333",
  validateStatus: status => status < 500,
});
