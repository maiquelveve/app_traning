import { encryptPassword } from "../../../../src/helpers";

describe("@unit", () => {
  describe("HELPERS - Password Helpers", () => {
    it("it should be possible to decryption a password",  async () => {
      const password = "1234567";
      const hashPassword  = await encryptPassword({ password });

      expect(hashPassword).toHaveLength(60);
      expect(hashPassword).not.toEqual(password);
      expect(typeof hashPassword).toBe("string");
    });
  });
});
