import { serializeData } from "../../../../src/helpers";

describe("@unit", () => {
  describe("HELPERS - Serialize Helpers", () => {
    it("it should be possible to serialized 'STRING'",  () => {
      const string = "  TeStEs  ";
      const result = serializeData(string);

      expect(typeof result).toBe("string");
      expect(string.length >= result.length).toBeTruthy();
    });

    it("it should be possible to serialized 'NUMBER'",  () => {
      const number = 9999;

      const result = serializeData(number);

      expect(typeof result).toBe("number");
    });
  });
});
