import "dotenv/config";
import express from "express";
import path from "path";
import cors from "cors";

import routes from "../routes";
import { ROUTES_FILES_IMGS } from "../config";
import { errorUploadFileSystem } from "../middleware";

const server = express();

server.use(express.json());
server.use(cors());
server.use(routes);
server.use(errorUploadFileSystem);
server.use(ROUTES_FILES_IMGS, express.static(path.resolve(__dirname, "..", "..", "tmp", "uploads", "imgsProfiles")));

export { server };
