import { User } from "../../../src/models";
import { connectionSql } from "../../../src/database/connectionSql";

import { testServer } from "../../jest-setup";
import { encryptPassword } from "../../../src/helpers";

describe("@dev", () => {
  describe("USER CONTROLLER - Change Password", () => {

    const name = "test";
    const email = "testchangepassword@test.com";
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
      const newResponse = await testServer.put("/users/changePassword")
        .set("authorization", token)
        .send({ passwordCurrent: "123456", newPassword: "654321" });
    
      expect(newResponse.body.isSuccess).toBeTruthy();
    });

    it("it should not be possible to update the profile with the password invalid",  async () => {      
      const newResponse = await testServer.put("/users/changePassword")
        .set("authorization", token)
        .send({ newPassword: "999999999"  });
    
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.statusCode).toBe(400);
      expect(newResponse.body.errors[0]).toEqual("Senha Invalida.");
    });

    it("it should not be possible to update the profile without the password",  async () => {      
      const newResponse = await testServer.put("/users/changePassword")
        .set("authorization", token)
        .send({ newPassword: "654321"  });
    
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.statusCode).toBe(400);
      expect(newResponse.body.errors[0]).toEqual("Senha é obrigatória.");
    });

    it("it should not be possible to update the profile without the new password",  async () => {      
      const newResponse = await testServer.put("/users/changePassword")
        .set("authorization", token)
        .send({ password: "123456"  });
    
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.statusCode).toBe(400);
      expect(newResponse.body.errors[0]).toEqual("Nova Senha é obrigatória.");
    });
  });
});  

