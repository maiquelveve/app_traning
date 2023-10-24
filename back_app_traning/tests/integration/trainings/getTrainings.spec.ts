import { Profile, Training, TrainingDetail, User, UsersProfiles } from "../../../src/models";
import { connectionSql } from "../../../src/database/connectionSql";

import { testServer } from "../../jest-setup";
import { encryptPassword } from "../../../src/helpers";

describe("@integration", () => {
  describe("TRAINIG CONTROLLER - Get Trainings", () => {

    const nameTrainer = "test trainer get";
    const emailTrainer = "testgetTrainigTrainer@gmail.com";
    const passwordTrainer = "123456";

    const nameTrainer2 = "test trainer get2";
    const emailTrainer2 = "testget2TrainigTrainer@gmail.com";
    const passwordTrainer2 = "123456";

    const nameNotTrainer = "test Nottrainer get";
    const emailNotTrainer = "testgetTrainigNotTrainer@gmail.com";
    const passwordNotTrainer = "123456";

    let tokenTrainer: "";
    let tokenNotTrainer: "";
    let user_trainer_id: number;
    let user_trainer_id2: number;

    beforeAll(async () => {
      const profileTrainer = await Profile.findOne({ where: { profile: "TRAINER" } });

      await User.create({ 
        name: nameNotTrainer, 
        email: emailNotTrainer, 
        password: await encryptPassword({ password: passwordNotTrainer }) 
      });
      const newUserTrainer = await User.create({ 
        name: nameTrainer, 
        email: emailTrainer, 
        password: await encryptPassword({ password: passwordTrainer }) 
      });

      const newUserTrainer2 = await User.create({ 
        name: nameTrainer2, 
        email: emailTrainer2, 
        password: await encryptPassword({ password: passwordTrainer2 }) 
      });

      user_trainer_id = newUserTrainer.id;
      await UsersProfiles.create({ profile_id: profileTrainer!.id, user_id: newUserTrainer.id });
      
      user_trainer_id2 = newUserTrainer2.id;
      await UsersProfiles.create({ profile_id: profileTrainer!.id, user_id: newUserTrainer2.id });

      const responseTrainer = await testServer.post("/users/login").send({ email: emailTrainer, password: passwordTrainer });
      tokenTrainer =  responseTrainer.body.data[0].token;

      const responseNotTrainer = await testServer.post("/users/login").send({ email: emailNotTrainer, password: passwordNotTrainer });
      tokenNotTrainer =  responseNotTrainer.body.data[0].token;

      const newTraining = await Training.create({
        tag: "test tag GET INIT",
        training: "test training GET INIT",
        modality_id: 1,
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32INIT",
        user_trainer_id,
      });
      await TrainingDetail.create({
        description: "teste01 INIT", 
        value: "teste01value INIT",
        training_id: newTraining.id
      });

      const newTraining2 = await Training.create({
        tag: "test tag GET INIT2",
        training: "test training GET INIT2",
        modality_id: 1,
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32INIT2",
        user_trainer_id: user_trainer_id2,
      });
      await TrainingDetail.create({
        description: "teste01 INIT2", 
        value: "teste01value INIT2",
        training_id: newTraining2.id
      });

      const trainingPages = await Training.create({
        tag: "test tag GET 01",
        training: "test training GET 01",
        modality_id: 1,
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw3201",
        user_trainer_id,
      });
      await TrainingDetail.create({
        description: "teste01 01", 
        value: "teste01value 01",
        training_id: trainingPages.id
      });

      const trainingPages2 = await Training.create({
        tag: "test tag GET 02",
        training: "test training GET 02",
        modality_id: 1,
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw3201",
        user_trainer_id,
      });
      await TrainingDetail.create({
        description: "teste01 02", 
        value: "teste01value 02",
        training_id: trainingPages2.id
      });

      const trainingPages3 = await Training.create({
        tag: "test tag GET 03",
        training: "test training GET 03",
        modality_id: 1,
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw3203",
        user_trainer_id,
      });
      await TrainingDetail.create({
        description: "teste01 03", 
        value: "teste01value 03",
        training_id: trainingPages3.id
      });

      const trainingPages4 = await Training.create({
        tag: "test tag GET 04",
        training: "test training GET 04",
        modality_id: 1,
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw3204",
        user_trainer_id,
      });
      await TrainingDetail.create({
        description: "teste01 04", 
        value: "teste01value 04",
        training_id: trainingPages4.id
      });
    });

    afterAll(async () => {
      await UsersProfiles.destroy({
        where: {},
      });
      await User.destroy({
        where: {},
      });
      await TrainingDetail.destroy({ 
        where: {} 
      });
      await Training.destroy({ 
        where: {} 
      });

      connectionSql.close();
    });

    it("it should be possible to get trainings by token of TRAINER valid",  async () => {      
      const newResponse = await testServer.get("/trainings").set("authorization", tokenTrainer);
            
      expect(newResponse.body.isSuccess).toBeTruthy();
      expect(newResponse.body.data[0].trainings.length > 0).toBeTruthy();
      expect(newResponse.status).toEqual(200);
    });

    it("it not should be possible to get trainings by token of NOT TRAINER valid",  async () => {      
      const newResponse = await testServer.get("/trainings").set("authorization", tokenNotTrainer);

      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("Usuário não autorizado.");
      expect(newResponse.status).toEqual(401);
    });

    it("it not should be possible to get trainings by token of TRAINER invalid",  async () => {      
      const newResponse = await testServer.get("/trainings").set("authorization", "123456789");

      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("Usuário não autorizado.");
      expect(newResponse.status).toEqual(401);
    });

    it("it should be possible to get trainings with all filters",  async () => {  
      const route = "/trainings?trainingSearch=test training&modality_id=1";   
      const newResponse = await testServer.get(route).set("authorization", tokenTrainer);

      expect(newResponse.body.isSuccess).toBeTruthy();
      expect(newResponse.body.data[0].trainings.length > 0).toBeTruthy();
      expect(newResponse.status).toEqual(200);
    });

    it("it should not be possible to get trainings with filters from another trainer",  async () => {  
      const route = "/trainings?trainingSearch=test training GET INIT2&modality_id=1";   
      const newResponse = await testServer.get(route).set("authorization", tokenTrainer);

      expect(newResponse.body.isSuccess).toBeTruthy();
      expect(newResponse.body.data[0].trainings.length === 0).toBeTruthy();
      expect(newResponse.status).toEqual(200);
    });

    it("it should be possible to get trainings with filters TRAINING full",  async () => {  
      const route = "/trainings?trainingSearch=test training GET INIT";   
      const newResponse = await testServer.get(route).set("authorization", tokenTrainer);

      expect(newResponse.body.isSuccess).toBeTruthy();
      expect(newResponse.body.data[0].trainings.length > 0).toBeTruthy();
      expect(newResponse.status).toEqual(200);
    });

    it("it should be possible to get trainings with filters TRAINING",  async () => {  
      const route = "/trainings?trainingSearch=GET INIT";   
      const newResponse = await testServer.get(route).set("authorization", tokenTrainer);

      expect(newResponse.body.isSuccess).toBeTruthy();
      expect(newResponse.body.data[0].trainings.length > 0).toBeTruthy();
      expect(newResponse.status).toEqual(200);
    });

    it("it should not be possible to get trainings with filters TRAINING incorrect",  async () => {  
      const route = "/trainings?trainingSearch=123456";   
      const newResponse = await testServer.get(route).set("authorization", tokenTrainer);

      expect(newResponse.body.isSuccess).toBeTruthy();
      expect(newResponse.body.data[0].trainings.length === 0).toBeTruthy();
      expect(newResponse.status).toEqual(200);
    });

    it("it should be possible to get trainings with filters TRAINING empty",  async () => {  
      const route = "/trainings?trainingSearch=";   
      const newResponse = await testServer.get(route).set("authorization", tokenTrainer);

      expect(newResponse.body.isSuccess).toBeTruthy();
      expect(newResponse.body.data[0].trainings.length > 0).toBeTruthy();
      expect(newResponse.status).toEqual(200);
    });

    it("it should be possible to get trainings with filters TRAINING for TAG",  async () => {  
      const route = "/trainings?trainingSearch=test tag GET INIT";   
      const newResponse = await testServer.get(route).set("authorization", tokenTrainer);

      expect(newResponse.body.isSuccess).toBeTruthy();
      expect(newResponse.body.data[0].trainings.length > 0).toBeTruthy();
      expect(newResponse.status).toEqual(200);
    });

    it("it should be possible to get trainings with filters MODALITY_ID",  async () => {  
      const route = "/trainings?modality_id=1";   
      const newResponse = await testServer.get(route).set("authorization", tokenTrainer);

      expect(newResponse.body.isSuccess).toBeTruthy();
      expect(newResponse.body.data[0].trainings.length > 0).toBeTruthy();
      expect(newResponse.status).toEqual(200);
    });

    it("it should not be possible to get trainings with filters MODALITY_ID incorrect",  async () => {  
      const route = "/trainings?modality_id=1123456";   
      const newResponse = await testServer.get(route).set("authorization", tokenTrainer);

      expect(newResponse.body.isSuccess).toBeTruthy();
      expect(newResponse.body.data[0].trainings.length === 0).toBeTruthy();
      expect(newResponse.status).toEqual(200);
    });

    it("it should be possible to get trainings with filters MODALITY_ID empty",  async () => {  
      const route = "/trainings?modality_id=";   
      const newResponse = await testServer.get(route).set("authorization", tokenTrainer);

      expect(newResponse.body.isSuccess).toBeTruthy();
      expect(newResponse.body.data[0].trainings.length > 0).toBeTruthy();
      expect(newResponse.status).toEqual(200);
    });

    it("it should be possible to get trainings with all filters and pagination",  async () => {  
      const route = "/trainings?page=1&perPage=2&trainingSearch=test training&modality_id=1";   
      const route2 = "/trainings?page=2&perPage=2&trainingSearch=test training&modality_id=1";   
      const newResponse = await testServer.get(route).set("authorization", tokenTrainer);
      const newResponse2 = await testServer.get(route2).set("authorization", tokenTrainer);

      expect(newResponse.body.isSuccess).toBeTruthy();
      expect(newResponse.body.data[0].trainings.length === 2).toBeTruthy();
      expect(newResponse.status).toEqual(200);

      expect(newResponse2.body.isSuccess).toBeTruthy();
      expect(newResponse2.body.data[0].trainings.length === 2).toBeTruthy();
      expect(newResponse2.status).toEqual(200);
    });

    it("it should be possible to get trainings with all filters and pagination empty",  async () => {  
      const route = "/trainings?page=&perPage=&trainingSearch=test training&modality_id=1";   
      const newResponse = await testServer.get(route).set("authorization", tokenTrainer);

      expect(newResponse.body.isSuccess).toBeTruthy();
      expect(newResponse.body.data[0].trainings.length > 2).toBeTruthy();
      expect(newResponse.status).toEqual(200);
    });

    it("it should not be possible to get trainings with all filters and pagination 0",  async () => {  
      const route = "/trainings?page=0&perPage=0&trainingSearch=test training&modality_id=1";   
      const newResponse = await testServer.get(route).set("authorization", tokenTrainer);

      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.data.length === 0).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("Erro nos atributos para realizar a páginação da consulta.");
      expect(newResponse.status).toEqual(404);
    });
  });
}); 
