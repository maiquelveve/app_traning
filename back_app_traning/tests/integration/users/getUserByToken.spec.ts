import { User } from "../../../src/models";
import { connectionSql } from "../../../src/database/connectionSql";

import { testServer } from "../../jest-setup";
import { encryptPassword } from "../../../src/helpers";

describe("@integration", () => {
  describe("USER CONTROLLER - Get User By Token", () => {

    const name = "test";
    const email = "testgetbyuser@test.com";
    const password = "123456";

    let token: string =  "";
    beforeAll(async () => {
      await User.create({ name, email, password: await encryptPassword({ password }) });
      const response = await testServer.post("/users/login").send({ email, password });
      token =  response.body.data[0].token;
    });

    afterAll(async () => {
      await User.destroy({
        where: {},
      });

      connectionSql.close();
    });

    it("it should be possible to get a user by token valid",  async () => {      
      const newResponse = await testServer.get("/users/byToken").set("authorization", token);
    
      expect(newResponse.body.isSuccess).toBeTruthy();
      expect(newResponse.body.data[0].user.name).toEqual(name);
      expect(newResponse.body.data[0].user.email).toEqual(email);
    });

    it("it should not be possible to get a user by token invalid",  async () => {      
      const newResponse = await testServer.get("/users/byToken").set("authorization", "123456");
    
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.statusCode).toEqual(401);
    });

    it("it should not be possible to get a user by not token",  async () => {      
      const newResponse = await testServer.get("/users/byToken");
    
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.statusCode).toEqual(401);
    });
  });
});  

