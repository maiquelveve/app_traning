import * as fs from "node:fs";

import { TEST_FILE, PROFILE_IMG_FILE_DIR_TEST } from "../../../../src/config";
import { writeFile } from "../../../../src/helpers";

const NAME_NEW_FILE = "testwrite.jpg";

describe("@unit", () => {
  describe("HELPERS - File Helpers", () => {

    afterAll(() => {
      fs.unlinkSync(`${PROFILE_IMG_FILE_DIR_TEST}/${NAME_NEW_FILE}`);
    });

    it("it should be possible to save a file",  async () => {
      const file = fs.readFileSync(`${TEST_FILE}`); 
      writeFile({ pathFilename: `${PROFILE_IMG_FILE_DIR_TEST}/${NAME_NEW_FILE}`, fileBuffer: file });
      
      const newFile = fs.readFileSync(`${PROFILE_IMG_FILE_DIR_TEST}/${NAME_NEW_FILE}`);
      expect(typeof newFile).toEqual("object");
    });
  });
});
