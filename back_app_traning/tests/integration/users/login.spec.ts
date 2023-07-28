import { User } from "../../../src/models";
import { connectionSql } from "../../../src/database/connectionSql";

import { testServer } from "../../jest-setup";
import { encryptPassword } from "../../../src/helpers";

describe("@integration", () => {
  describe("USER CONTROLLER - Login User", () => {

    const name = "test";
    const email = "testlogin@test.com";
    const password = "123456";

    beforeAll(async () => {
      await User.create({ name, email, password: await encryptPassword({ password }) });
    });

    afterAll(async () => {
      await User.destroy({
        where: {},
      });

      connectionSql.close();
    });

    it("it should be possible to signin a user",  async () => {
      const response = await testServer.post("/users/login").send({ email, password });
      
      expect(response.body.isSuccess).toBeTruthy();
    });

    it("it shouldn't be possible to signin a user with the 'email' incorrect",  async () => {
      const response = await testServer.post("/users/login").send({ email:"testlogin@test.com2", password });

      expect(response.statusCode).toBe(400);
      expect(response.body.isError).toBeTruthy();
      expect(response.body.errors[0]).toEqual("Email ou senha invalidos.");
    });

    it("it shouldn't be possible to signin a user with the 'password' incorrect",  async () => {
      const response = await testServer.post("/users/login").send({ email, password: "654321" });

      expect(response.statusCode).toBe(400);
      expect(response.body.isError).toBeTruthy();
      expect(response.body.errors[0]).toEqual("Email ou senha invalidos.");
    });

    it("it shouldn't be possible to signin a user without the 'email'",  async () => {
      const response = await testServer.post("/users/login").send({ password });

      expect(response.statusCode).toBe(400);
      expect(response.body.isError).toBeTruthy();
      expect(response.body.errors[0]).toEqual("Email é obrigatório.");
    });

    it("it shouldn't be possible to signin a user with the 'email' invalid",  async () => {
      const response = await testServer.post("/users/login").send({ email: "testlogin@", password });

      expect(response.statusCode).toBe(400);
      expect(response.body.isError).toBeTruthy();
      expect(response.body.errors[0]).toEqual("Email invalido.");
    });

    it("it shouldn't be possible to signin a user without the 'password'",  async () => {
      const response = await testServer.post("/users/login").send({ email });

      expect(response.statusCode).toBe(400);
      expect(response.body.isError).toBeTruthy();
      expect(response.body.errors[0]).toEqual("Senha é obrigatória.");
    });

    it("it shouldn't be possible to signin a user with the 'password' < 5 char",  async () => {
      const response = await testServer.post("/users/login").send({ email, password: "12" });

      expect(response.statusCode).toBe(400);
      expect(response.body.isError).toBeTruthy();
      expect(response.body.errors[0]).toEqual("Senha deve ter no mínimo 5 caracteres.");
    });

    it("it shouldn't be possible to signin a user with the 'password' > 50 char",  async () => {
      const password = "123456123456123456123456123456123456123456123456123456123456123456";
      const response = await testServer.post("/users/login").send({ email, password });

      expect(response.statusCode).toBe(400);
      expect(response.body.isError).toBeTruthy();
      expect(response.body.errors[0]).toEqual("Senha deve ter no máximo 50 caracteres.");
    });
  });
});  
