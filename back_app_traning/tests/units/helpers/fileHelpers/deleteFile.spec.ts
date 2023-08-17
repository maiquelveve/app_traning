import * as fs from "node:fs";

import { FILE_TEST, PROFILE_IMG_FILE_DIR_TEST } from "../../../../src/config";
import { deleteFile } from "../../../../src/helpers";

const NAME_NEW_FILE = "testwrite.jpg";

describe("@unit", () => {
  describe("HELPERS - File Helpers", () => {

    afterAll(() => {
      fs.unlinkSync(`${PROFILE_IMG_FILE_DIR_TEST}/${NAME_NEW_FILE}`);
    });

    beforeEach(() => {
      const file = fs.readFileSync(`${FILE_TEST}`); 
      fs.writeFileSync(`${PROFILE_IMG_FILE_DIR_TEST}/${NAME_NEW_FILE}`, file);
    });

    it("it should be possible detele a file",  async () => {
      deleteFile({ pathFile: `${PROFILE_IMG_FILE_DIR_TEST}/${NAME_NEW_FILE}` });
      expect(true).toBeTruthy();
    });

    it("it should not be possible detele a file nonexistent",  async () => {
      let result: boolean;
      try {
        deleteFile({ pathFile: `${PROFILE_IMG_FILE_DIR_TEST}/nonexistent${NAME_NEW_FILE}` });
        result = true;

      } catch (error) {
        result = false;
      }
      
      expect(result).toBeFalsy();
    });
  });
});
