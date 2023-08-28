import { Profile, User, UsersProfiles } from "../../../src/models";
import { connectionSql } from "../../../src/database/connectionSql";

import { testServer } from "../../jest-setup";
import { encryptPassword } from "../../../src/helpers";

describe("@dev", () => {
  describe("MODALITIES CONTROLLER - Get All Modalities", () => {

    const nameRoot = "testRoot";
    const emailRoot = "testgatallmodalityRoot@test.com";
    const passwordRoot = "123456";

    const nameNotRoot = "testNotRoot";
    const emailNotRoot = "testgatallmodalityNotRoot@test.com";
    const passwordNotRoot = "123456";

    let tokenRoot: string =  "";
    let tokenNotRoot: string =  "";

    beforeAll(async () => {
      const profileRoot = await Profile.findOne({ where: { profile: "ROOT" } });
      const newUserRoot = await User.create({ 
        name: nameRoot, 
        email: emailRoot, 
        password: await encryptPassword({ password: passwordRoot }) 
      });
      await User.create({ 
        name: nameNotRoot, 
        email: emailNotRoot, 
        password: await encryptPassword({ password: passwordNotRoot }) 
      });
           
      await UsersProfiles.create({ profile_id: profileRoot!.id, user_id: newUserRoot.id });

      const responseRoot = await testServer.post("/users/login").send({ email: emailRoot, password: passwordRoot });
      tokenRoot =  responseRoot.body.data[0].token;

      const responseNotRoot=await testServer.post("/users/login").send({ email: emailNotRoot, password: passwordNotRoot });
      tokenNotRoot =  responseNotRoot.body.data[0].token;
    });

    afterAll(async () => {
      await UsersProfiles.destroy({
        where: {},
      });
      await User.destroy({
        where: {},
      });

      connectionSql.close();
    });

    it("it should be possible to get all modalities by token of ROOT valid",  async () => {      
      const newResponse = await testServer.get("/modalities").set("authorization", tokenRoot);
      
      expect(newResponse.body.isSuccess).toBeTruthy();
    });

    it("it not should be possible to get all modalities by token NOT ROOT valid",  async () => {      
      const newResponse = await testServer.get("/modalities").set("authorization", tokenNotRoot);
      
      expect(newResponse.body.isError).toBeTruthy();
    });

    it("it not should be possible to get all modalities by token invalid",  async () => {      
      const newResponse = await testServer.get("/modalities").set("authorization", "123456789");
      
      expect(newResponse.body.isError).toBeTruthy();
    });
  });
});  

