import "dotenv/config";
import express from "express";
import cors from "cors";

import routes from "../routes";
import { errorUploadFileSystem } from "../middleware";

const server = express();

server.use(express.json());
server.use(cors());
server.use(routes);
server.use(errorUploadFileSystem);

export { server };
