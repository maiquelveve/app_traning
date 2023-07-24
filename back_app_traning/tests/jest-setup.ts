import * as dotenv from "dotenv";
import supertest from "supertest"; 

import { server } from "../src/server/server";

dotenv.config({ path: ".env" });
jest.setTimeout(20000);

export const testServer = supertest(server);
