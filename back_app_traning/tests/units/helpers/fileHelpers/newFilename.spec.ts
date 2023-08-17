import { newFilename } from "../../../../src/helpers";

const NAME_NEW_FILE = "testwrite.jpg";

describe("@unit", () => {
  describe("HELPERS - File Helpers", () => {
    it("it should be possible change the name file to new name",  async () => {
      const newName = await newFilename({ originalname:  NAME_NEW_FILE });
      
      const splitNewName = newName.split("-");

      expect(newName !== NAME_NEW_FILE).toBeTruthy();
      expect(splitNewName.length).toBe(2);
      expect(splitNewName[1]).toEqual(NAME_NEW_FILE);
      expect(splitNewName[0]).toHaveLength(32);
    });
  });
});
