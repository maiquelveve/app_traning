import { Router } from "express";

import { authSystem } from "../middleware";

const modalitiesRoutes = Router();

modalitiesRoutes.get(
  "/modalities", 
  authSystem({ permissions: ["root"] }),
  (req, res) => {
    return res.json({ok: true});
  }
);


export { modalitiesRoutes };
