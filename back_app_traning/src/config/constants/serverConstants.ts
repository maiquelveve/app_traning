const API_PROTOCOL = process.env.API_PROTOCOL || "http://";
const API_HOST = process.env.API_HOST || "localhost";
const API_PORT = process.env.API_PORT || 3333;

const API_URL = `${API_PROTOCOL}${API_HOST}:${API_PORT}`;

const ROUTES_FILES_IMGS = "/files";

export {
  API_PROTOCOL,
  API_HOST,
  API_PORT,
  API_URL,
  ROUTES_FILES_IMGS,
};
