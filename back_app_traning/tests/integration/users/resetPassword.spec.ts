import { User } from "../../../src/models";
import { connectionSql } from "../../../src/database/connectionSql";

import { testServer } from "../../jest-setup";
import { encryptPassword } from "../../../src/helpers";

describe("USER CONTROLLER - Reset Password User", () => {

  const name = "test";
  const email = "testresetpassword@test.com";
  const password = "123456";

  beforeAll(async () => {
    await User.create({ name, email, password: await encryptPassword({ password }) });
  });

  afterAll(async () => {
    await User.destroy({
      where: {},
      truncate: true
    });

    connectionSql.close();
  });

  it("it should be possible to reset password a user",  async () => {
    const response = await testServer.post("/users/resetPassword").send({ email });
    
    expect(response.body.isSuccess).toBeTruthy();
  });

  it("it shouldn't be possible to reset password a user without the 'email'",  async () => {
    const response = await testServer.post("/users/resetPassword").send({ });

    expect(response.statusCode).toBe(400);
    expect(response.body.isError).toBeTruthy();
    expect(response.body.errors[0]).toEqual("Email é obrigatório.");
  });

  it("it shouldn't be possible to signin a user with the 'email' invalid",  async () => {
    const response = await testServer.post("/users/resetPassword").send({ email: "testresetpassword@" });

    expect(response.statusCode).toBe(400);
    expect(response.body.isError).toBeTruthy();
    expect(response.body.errors[0]).toEqual("Email invalido.");
  });
});
