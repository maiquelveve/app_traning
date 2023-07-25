import { decryptPassword, encryptPassword } from "../../../../src/helpers";

describe("@unit", () => {
  describe("HELPERS - Password Helpers", () => {
    it("it should be possible to decryption a password",  async () => {
      const password = "123456";

      const hashPassword  = await encryptPassword({ password: password });

      const result = await decryptPassword({ passwordHashDB: hashPassword, passwordUser: password });

      expect(result).toBeTruthy();
    });

    it("it should not be possible to decryption a password",  async () => {
      const hashPassword  = await encryptPassword({ password: "123456" });
      const result = await decryptPassword({ passwordHashDB: hashPassword, passwordUser: "aaaaaa" });

      expect(result).toBeFalsy();
    });
  });
});
