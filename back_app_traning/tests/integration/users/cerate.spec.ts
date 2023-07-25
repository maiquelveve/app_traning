import { User } from "../../../src/models";
import { connectionSql } from "../../../src/database/connectionSql";

import { testServer } from "../../jest-setup";

describe("@integration", () => {
  describe("USER CONTROLLER - Create User", () => {

    afterAll(() => {
      connectionSql.close();
    });
  
    it("it should be possible to create a user",  async () => {
      const response = await testServer.post("/users").send({ name: "test", email: "testcreate@test.com", password: "123456" });
  
      await User.destroy({
        where: {},
        truncate: true
      });
  
      expect(response.body.isSuccess).toBeTruthy();
    });
  
    it("it shouldn't be possible to create a user without the 'name'",  async () => {
      const response = await testServer.post("/users").send({ email: "testcreate@test.com", password: "123456" });
  
      expect(response.statusCode).toBe(400);
      expect(response.body.isError).toBeTruthy();
      expect(response.body.errors[0]).toEqual("Nome é obrigatório.");
    });
  
    it("it shouldn't be possible to create a user with the 'name' < 3 char",  async () => {
      const response = await testServer.post("/users").send({ name: "as", email: "testcreate@test.com", password: "123456" });
  
      expect(response.statusCode).toBe(400);
      expect(response.body.isError).toBeTruthy();
      expect(response.body.errors[0]).toEqual("Nome deve ter no mínimo 3 caracteres.");
    });
  
    it("it shouldn't be possible to create a user with the 'name' > 50 char",  async () => {
      const name = "testetestetestetestetestetestetestetestetestetesteteste";
      const response = await testServer.post("/users").send({ name, email: "testcreate@test.com", password: "123456" });
  
      expect(response.statusCode).toBe(400);
      expect(response.body.isError).toBeTruthy();
      expect(response.body.errors[0]).toEqual("Nome deve ter no máximo 50 caracteres.");
    });
  
    it("it shouldn't be possible to create a user without the 'email'",  async () => {
      const response = await testServer.post("/users").send({ name: "test", password: "123456" });
  
      expect(response.statusCode).toBe(400);
      expect(response.body.isError).toBeTruthy();
      expect(response.body.errors[0]).toEqual("Email é obrigatório.");
    });
  
    it("it shouldn't be possible to create a user with email invalid",  async () => {
      const response = await testServer.post("/users").send({ name: "teste", email: "testcreate@", password: "123456" });
  
      expect(response.statusCode).toBe(400);
      expect(response.body.isError).toBeTruthy();
      expect(response.body.errors[0]).toEqual("Email invalido.");
    });
  
    it("it shouldn't be possible to create a user without the 'password'",  async () => {
      const response = await testServer.post("/users").send({ name: "test", email: "testcreate@test.com" });
  
      expect(response.statusCode).toBe(400);
      expect(response.body.isError).toBeTruthy();
      expect(response.body.errors[0]).toEqual("Senha é obrigatória.");
    });
  
    it("it shouldn't be possible to create a user with the 'password' < 5 char",  async () => {
      const response = await testServer.post("/users").send({ name: "test", email: "testcreate@test.com", password: "12" });
  
      expect(response.statusCode).toBe(400);
      expect(response.body.isError).toBeTruthy();
      expect(response.body.errors[0]).toEqual("Senha deve ter no mínimo 5 caracteres.");
    });
  
    it("it shouldn't be possible to create a user with the 'password' > 50 char",  async () => {
      const password = "123456123456123456123456123456123456123456123456123456123456123456";
      const response = await testServer.post("/users").send({ name: "test", email: "testcreate@test.com", password });
  
      expect(response.statusCode).toBe(400);
      expect(response.body.isError).toBeTruthy();
      expect(response.body.errors[0]).toEqual("Senha deve ter no máximo 50 caracteres.");
    });
  });
});
