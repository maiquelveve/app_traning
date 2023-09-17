import { connectionSql } from "../../../src/database/connectionSql";

import { testServer } from "../../jest-setup";

describe("@integration", () => {
  describe("MODALITIES TYPES CONTROLLER - Get All Modalities Types", () => {
    afterAll(async () => {
      connectionSql.close();
    });

    it("it should be possible to get all modalities types",  async () => {      
      const newResponse = await testServer.get("/modalitiesTypes");
      
      expect(newResponse.body.isSuccess).toBeTruthy();
      expect(newResponse.body.data[0].modalitiesTypes.length > 0).toBeTruthy();
      expect(newResponse.status).toEqual(200);
    });
  });
});  

