import * as fs from "node:fs";

import { TEST_FILE, PROFILE_IMG_FILE_DIR_TEST } from "../../../../src/config";
import { findFile } from "../../../../src/helpers";

const NAME_NEW_FILE = "testwrite.jpg";

describe("@unit", () => {
  describe("HELPERS - File Helpers", () => {

    afterAll(() => {
      fs.unlinkSync(`${PROFILE_IMG_FILE_DIR_TEST}/${NAME_NEW_FILE}`);
    });

    it("it should be possible find a file",  async () => {
      const file = fs.readFileSync(`${TEST_FILE}`); 
      fs.writeFileSync(`${PROFILE_IMG_FILE_DIR_TEST}/${NAME_NEW_FILE}`, file);
      
      const newFile = findFile({ pathFile: `${PROFILE_IMG_FILE_DIR_TEST}/${NAME_NEW_FILE}` });
      
      expect(typeof newFile).toEqual("object");
    });

    it("it should not be possible find a file nonexistent",  async () => {
      const newFile = findFile({ pathFile: `${PROFILE_IMG_FILE_DIR_TEST}/nonexistent${NAME_NEW_FILE}` });
      expect(newFile).toEqual("");
    });
  });
});
