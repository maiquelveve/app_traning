import { connectionSql } from "../../../src/database/connectionSql";
import { User } from "../../../src/models";
import { testServer } from "../../jest-setup";

describe("HELPERS - Password Helpers", () => {

  afterAll(() => {
    connectionSql.close();
  });

  it("it should be possible to create a user",  async () => {
    const response = await testServer.post("/users").send({ name: "test", email: "test@test.com", password: "123456" });

    await User.destroy({
      where: {},
      truncate: true
    });

    expect(response.body.isSuccess).toBeTruthy();
  });

  it("it shouldn't be possible to create a user without the name",  async () => {
    const response = await testServer.post("/users").send({ name: "", email: "test@test.com", password: "123456" });

    expect(response.statusCode).toBe(400);
    expect(response.body.isError).toBeTruthy();
    expect(response.body.errors[0]).toEqual("Nome é obrigatório.");
  });
});
