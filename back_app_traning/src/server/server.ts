import "dotenv/config";
import express from "express";
import cors from "cors";

import routes from "../routes";
import { PROFILE_IMG_FILE_DIR, ROUTES_FILES_IMGS } from "../config";

const server = express();

server.use(express.json());
server.use(cors());
server.use(routes);
server.use(ROUTES_FILES_IMGS, express.static(PROFILE_IMG_FILE_DIR));

export { server };
