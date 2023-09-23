import { Modality, Profile, User, UsersProfiles } from "../../../src/models";
import { connectionSql } from "../../../src/database/connectionSql";

import { testServer } from "../../jest-setup";
import { encryptPassword, operatorsDB } from "../../../src/helpers";

describe("@integration", () => {
  describe("MODALITIES CONTROLLER - Update Modalities", () => {

    const nameRoot = "testRoot";
    const emailRoot = "testgatallmodalityRoot@test.com";
    const passwordRoot = "123456";

    const nameNotRoot = "testNotRoot";
    const emailNotRoot = "testgatallmodalityNotRoot@test.com";
    const passwordNotRoot = "123456";

    const modality = "modality";
    const modality_type_id = 1;
    
    let tokenRoot: string =  "";
    let tokenNotRoot: string =  "";
    let modalityId = 500;

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
            
      const newModalityTest = await Modality.create({
        modality,
        modality_type_id
      });
      modalityId = newModalityTest.id;
           
      await UsersProfiles.create({ profile_id: profileRoot!.id, user_id: newUserRoot.id });

      const responseRoot = await testServer.post("/users/login").send({ email: emailRoot, password: passwordRoot });
      tokenRoot =  responseRoot.body.data[0].token;

      const responseNotRoot = await testServer.post("/users/login").send({ email: emailNotRoot, password: passwordNotRoot });
      tokenNotRoot =  responseNotRoot.body.data[0].token;
    });

    afterAll(async () => {
      await UsersProfiles.destroy({
        where: {},
      });
      await User.destroy({
        where: {},
      });
      await Modality.destroy({
        where: {
          id: {
            [operatorsDB.gte]: modalityId
          }
        },
      });

      connectionSql.close();
    });

    it("it should be possible to update modalities by token of ROOT valid",  async () => {      
      const data: IModalityCreateUpdate = { modality: "testeCreateUpdate", modality_type_id: 2 };
      const newResponse = await testServer.put(`/modalities/${modalityId}`).send(data).set("authorization", tokenRoot);
      
      expect(newResponse.body.isSuccess).toBeTruthy();
      expect(newResponse.body.data[0]).toHaveProperty("id");
      expect(newResponse.body.data[0]).toHaveProperty("modality");
      expect(newResponse.body.data[0].modalityType).toHaveProperty("id");
      expect(newResponse.body.data[0].modalityType).toHaveProperty("type");
      expect(newResponse.status).toEqual(200);
    });

    it("it should be possible to update the prop MODALITY",  async () => {      
      const newModality = "newmodality";
      const data: IModalityCreateUpdate = { modality: newModality, modality_type_id: 1 };
      const newResponse = await testServer.put(`/modalities/${modalityId}`).send(data).set("authorization", tokenRoot);
      
      expect(newResponse.body.isSuccess).toBeTruthy();
      expect(newResponse.body.data[0].modality === newModality.toUpperCase()).toBeTruthy();
      expect(newResponse.status).toEqual(200);
    });

    it("it should be possible to update the prop MODALITY_TYPE_ID",  async () => {      
      const newModalityTypeId = 2;
      const data: IModalityCreateUpdate = { modality: "testemodality", modality_type_id: newModalityTypeId };
      const newResponse = await testServer.put(`/modalities/${modalityId}`).send(data).set("authorization", tokenRoot);
      
      expect(newResponse.body.isSuccess).toBeTruthy();
      expect(newResponse.body.data[0].modalityType.id === newModalityTypeId).toBeTruthy();
      expect(newResponse.status).toEqual(200);
    });

    it("it should be possible to update a modality with the MODALITY property, which is its own",  async () => {      
      const newModality = "modality with MADALITY props";
      await Modality.update({ modality: newModality, modality_type_id }, { where: { id: modalityId } });

      const newModalityTypeId = 2;
      const data: IModalityCreateUpdate = { modality: newModality, modality_type_id: newModalityTypeId };
      const newResponse = await testServer.put(`/modalities/${modalityId}`).send(data).set("authorization", tokenRoot);

      expect(newResponse.body.isSuccess).toBeTruthy();
      expect(newResponse.body.data[0].modalityType.id === newModalityTypeId).toBeTruthy();
      expect(newResponse.status).toEqual(200);
    });
    
    it("it not should be possible to update modalities by token NOT ROOT valid",  async () => {   
      const data: IModalityCreateUpdate = { modality: "testeCreateUpdate", modality_type_id: 2 };
      const newResponse = await testServer.put(`/modalities/${modalityId}`).send(data).set("authorization", tokenNotRoot);

      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.status).toEqual(401);
    });

    it("it not should be possible to update modalities by token invalid",  async () => {      
      const data: IModalityCreateUpdate = { modality: "testeCreateUpdate", modality_type_id: 2 };
      const newResponse = await testServer.put(`/modalities/${modalityId}`).send(data).set("authorization", "123456789");
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.status).toEqual(401);
    });

    it("it not should be possible to update modalities with prop MODALITY less 3 char",  async () => {      
      const data: IModalityCreateUpdate = { modality: "as", modality_type_id: 1 };
      const newResponse = await testServer.put(`/modalities/${modalityId}`).send(data).set("authorization", tokenRoot);
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors.length > 0).toBeTruthy();
      expect(newResponse.status).toEqual(400);
    });

    it("it not should be possible to update modalities with prop MODALITY more 50 char",  async () => {      
      const data: IModalityCreateUpdate = { 
        modality: "testetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetes", 
        modality_type_id: 1 
      };
      const newResponse = await testServer.put(`/modalities/${modalityId}`).send(data).set("authorization", tokenRoot);
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors.length > 0).toBeTruthy();
      expect(newResponse.status).toEqual(400);
    });

    it("it not should be possible to update modalities with prop MODALITY empty",  async () => {      
      const data: IModalityCreateUpdate = { modality: "", modality_type_id: 1 };
      const newResponse = await testServer.put(`/modalities/${modalityId}`).send(data).set("authorization", tokenRoot);

      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors.length > 0).toBeTruthy();
      expect(newResponse.status).toEqual(400);
    });

    it("it not should be possible to update modalities without prop MODALITY",  async () => {      
      const newResponse = await testServer
        .put(`/modalities/${modalityId}`)
        .send({ modality_type_id: 1 })
        .set("authorization", tokenRoot);

      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors.length > 0).toBeTruthy();
      expect(newResponse.status).toEqual(400);
    });

    it("it not should be possible to update modalities without prop MODALITY_TYPE_ID",  async () => {      
      const newResponse = await testServer
        .put(`/modalities/${modalityId}`)
        .send({ modality: "testeUpdated" })
        .set("authorization", tokenRoot);
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors.length > 0).toBeTruthy();
      expect(newResponse.status).toEqual(400);
    });

    it("it not should be possible to update modalities without prop MODALITY_TYPE_ID invalid",  async () => {     
      const data: IModalityCreateUpdate = { modality: "testemodality", modality_type_id: 1000 }; 
      const newResponse = await testServer.put(`/modalities/${modalityId}`).send(data).set("authorization", tokenRoot);
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors.length > 0).toBeTruthy();
      expect(newResponse.status).toEqual(500);
    });

    it("it not should be possible to update a modality with the existing MODALITY prop",  async () => {   
      const newModality = "modality existing MODALITY";   
      await Modality.create({ modality: newModality, modality_type_id: 1 });

      const data: IModalityCreateUpdate = { modality: newModality, modality_type_id: 1 };
      const newResponse = await testServer.put(`/modalities/${modalityId}`).send(data).set("authorization", tokenRoot);
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("Modalidade já existe no sistema.");
      expect(newResponse.status).toEqual(400);
    });

    it("it not should be possible to update a modality with the existing MODALITY property even with a different MODALITY_TYPE_ID property",  async () => {   
      const newModality = "modality different MODALITY_TYPE_ID";   
      await Modality.create({ modality: newModality, modality_type_id: 1 });

      const data: IModalityCreateUpdate = { modality: newModality, modality_type_id: 2 };
      const newResponse = await testServer.put(`/modalities/${modalityId}`).send(data).set("authorization", tokenRoot);
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("Modalidade já existe no sistema.");
      expect(newResponse.status).toEqual(400);
    });
  });
});  
