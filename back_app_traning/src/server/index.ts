import { server } from "./server";
import { API_URL, API_PORT } from "../config";

server.listen(API_PORT, () => console.log(`APPLICATION RUNNING ON ${API_URL}`));
