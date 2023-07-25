import { passwordGenerator } from "../../../../src/helpers";

describe("@unit", () => {
  describe("HELPERS - Password Helpers", () => {
    it("it should be possible to generate a password",  () => {
      const newPassword = passwordGenerator();
      
      expect(newPassword).toHaveLength(7);
      expect(typeof newPassword).toBe("string");
    });
  });
});
