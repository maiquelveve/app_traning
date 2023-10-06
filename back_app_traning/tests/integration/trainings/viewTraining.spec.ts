import { Profile, Training, TrainingDetail, User, UsersProfiles } from "../../../src/models";
import { connectionSql } from "../../../src/database/connectionSql";

import { testServer } from "../../jest-setup";
import { encryptPassword } from "../../../src/helpers";

describe("@integration", () => {
  describe("TRAINIG CONTROLLER - View Trainings", () => {

    const nameTrainer = "test trainer update";
    const emailTrainer = "testupdateTrainigTrainer@gmail.com";
    const passwordTrainer = "123456";

    const nameTrainer2 = "test trainer update";
    const emailTrainer2 = "testupdateTrainigTrainer@gmail.com";
    const passwordTrainer2 = "123456";

    const nameNotTrainer = "test Nottrainer update";
    const emailNotTrainer = "testupdateTrainigNotTrainer@gmail.com";
    const passwordNotTrainer = "123456";

    let id: number;
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
        tag: "test tag VIEW INIT",
        training: "test training VIEW INIT",
        modality_id: 1,
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32INIT",
        user_trainer_id,
      });
      await TrainingDetail.create({
        description: "teste01 INIT", 
        value: "teste01value INIT",
        training_id: newTraining.id
      });

      id = newTraining.id;
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

    it("it should be possible to view trainings by token of TRAINER valid",  async () => {      
      const newResponse = await testServer.get(`/trainings/${id}`).set("authorization", tokenTrainer);

      expect(newResponse.body.isSuccess).toBeTruthy();
      expect(newResponse.body.data[0]).toHaveProperty("id");
      expect(newResponse.status).toEqual(200);
    });

    it("it not should be possible to view trainings by token NOT TRAINER valid",  async () => {   
      const newResponse = await testServer.get(`/trainings/${id}`).set("authorization", tokenNotTrainer);   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.status).toEqual(401);
    });

    it("it not should be possible to view trainings by token invalid",  async () => {   
      const newResponse = await testServer.get(`/trainings/${id}`).set("authorization", "123456789");   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.status).toEqual(401);
    });

    it("It shouldn't be possible to view training from different TRAINER",  async () => {  
      const newTraining = await Training.create({
        tag: "test tag VIEW OTHER",
        training: "test training VIEW OTHER",
        modality_id: 1,
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32OTHER",
        user_trainer_id: user_trainer_id2,
      });
      await TrainingDetail.create({
        description: "teste01 OTHER", 
        value: "teste01value OTHER",
        training_id: newTraining.id
      });

      const newResponse = await testServer.get(`/trainings/${newTraining.id}`).set("authorization", tokenTrainer); 
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("Treino inexistente no sistema.");
      expect(newResponse.status).toEqual(400);
    });
  });
}); 
