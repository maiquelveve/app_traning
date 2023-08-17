import * as fs from "node:fs";

import { TEST_FILE, TEST_FILE_PLUS_2MB, TEST_FILE_TXT, PROFILE_IMG_FILE_DIR } from "../../../src/config";
import { User } from "../../../src/models";
import { connectionSql } from "../../../src/database/connectionSql";

import { testServer } from "../../jest-setup";
import { encryptPassword } from "../../../src/helpers";

describe("@integration", () => {
  describe("USER CONTROLLER - Upload Image Profile", () => {

    const name = "test";
    const email = "testuploadimgprofile@test.com";
    const password = "123456";

    let token: string =  "";
    beforeAll(async () => {
      await User.create({ name, email, password: await encryptPassword({ password }) });
      const response = await testServer.post("/users/login").send({ email, password });
      token =  response.body.data[0].token;
    });

    afterAll(async () => {
      await User.destroy({
        where: {},
      });

      connectionSql.close();
    });

    it("it should be possible to upload file profile image",  async () => {  
      const newResponse = await testServer.post("/users/uploadImgProfile")
        .set("authorization", token)
        .attach("file", TEST_FILE);
            
      let result: boolean;
      try {
        const file = fs.readFileSync(`${PROFILE_IMG_FILE_DIR}/${newResponse.body.data[0].user.avatar_filename}`);
        result = file ? true : false;

      } catch (error) {
        result = false;
      }

      expect(result).toBeTruthy();
      expect(newResponse.body.isSuccess).toBeTruthy();
      expect(newResponse.body.data[0].user).toHaveProperty("avatar_filename");
      expect(newResponse.body.data[0].user).toHaveProperty("avatar_url");

      fs.unlinkSync(`${PROFILE_IMG_FILE_DIR}/${newResponse.body.data[0].user.avatar_filename}`);
    });

    it("it should be possible to upload file profile image wihtout prop 'TOKEN'",  async () => {  
      const newResponse = await testServer.post("/users/uploadImgProfile")
        .set("authorization", "")
        .attach("file", TEST_FILE);
            
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("Usuário não autorizado.");
    });

    it("it should be possible to upload file profile image wiht TOKEN invalid",  async () => {  
      const newResponse = await testServer.post("/users/uploadImgProfile")
        .set("authorization", "123456789")
        .attach("file", TEST_FILE);
            
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("Usuário não autorizado.");
    });

    it("it should not be possible to upload file profile image  without prop 'FILE'",  async () => {  
      const newResponse = await testServer.post("/users/uploadImgProfile")
        .set("authorization", token)
        .attach("file", "");

      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("Selecione um arquivo.");
    });

    it("it should not be possible to upload file profile image more than 2 MB",  async () => {  
      const newResponse = await testServer.post("/users/uploadImgProfile")
        .set("authorization", token)
        .attach("file", TEST_FILE_PLUS_2MB);

      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("O tamanho do arquivo deve ser no máximo de 2 MB.");
    });

    it("it should not be possible to upload file profile image without extension JPG, JPEG, PNG",  async () => {  
      const newResponse = await testServer.post("/users/uploadImgProfile")
        .set("authorization", token)
        .attach("file", TEST_FILE_TXT);
      
      expect(true).toBeTruthy();
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("Arquivo invalido, escolha arquivo do tipo JPGE, JPG, PNG.");
    });
  });
});  

