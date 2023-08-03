import { User } from "../../../src/models";
import { connectionSql } from "../../../src/database/connectionSql";

import { testServer } from "../../jest-setup";
import { encryptPassword } from "../../../src/helpers";

describe("@integration", () => {
  describe("USER CONTROLLER - Update Profile", () => {

    const name = "test";
    const email = "testupdateprofile@test.com";
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

    it("it should be possible to updated profile",  async () => {      
      const newResponse = await testServer.put("/users/profile")
        .set("authorization", token)
        .send({ name: "test", email: "testcreate@test.com" });
    
      expect(newResponse.body.isSuccess).toBeTruthy();
    });

    it("it should not be possible to update the profile without the name",  async () => {      
      const newResponse = await testServer.put("/users/profile")
        .set("authorization", token)
        .send({ email: "testcreate@test.com" });
    
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.statusCode).toBe(400);
      expect(newResponse.body.errors[0]).toEqual("Nome é obrigatório.");
    });

    it("it should not be possible to update the profile without the email",  async () => {      
      const newResponse = await testServer.put("/users/profile")
        .set("authorization", token)
        .send({ name: "test" });
    
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.statusCode).toBe(400);
      expect(newResponse.body.errors[0]).toEqual("Email é obrigatório.");
    });
  });
});  

