import { Profile, Training, User, UsersProfiles } from "../../../src/models";
import { connectionSql } from "../../../src/database/connectionSql";

import { testServer } from "../../jest-setup";
import { encryptPassword } from "../../../src/helpers";

describe("@dev", () => {
  describe("TRAINIG CONTROLLER - Create Trainigs", () => {

    const nameTrainer = "test trainer create";
    const emailTrainer = "testcreateTrainigTrainer@gmail.com";
    const passwordTrainer = "123456";

    const nameNotTrainer = "test Nottrainer create";
    const emailNotTrainer = "testcreateTrainigNotTrainer@gmail.com";
    const passwordNotTrainer = "123456";

    let tokenTrainer: "";
    let tokenNotTrainer: "";

    beforeAll(async () => {
      const profileTrainer = await Profile.findOne({ where: { profile: "TRAINER" } });

      const newUserTrainer = await User.create({ 
        name: nameTrainer, 
        email: emailTrainer, 
        password: await encryptPassword({ password: passwordTrainer }) 
      });
      await User.create({ 
        name: nameNotTrainer, 
        email: emailNotTrainer, 
        password: await encryptPassword({ password: passwordNotTrainer }) 
      });
           
      await UsersProfiles.create({ profile_id: profileTrainer!.id, user_id: newUserTrainer.id });

      const responseTrainer = await testServer.post("/users/login").send({ email: emailTrainer, password: passwordTrainer });
      tokenTrainer =  responseTrainer.body.data[0].token;

      const responseNotTrainer = await testServer.post("/users/login").send({ email: emailNotTrainer, password: passwordNotTrainer });
      tokenNotTrainer =  responseNotTrainer.body.data[0].token;
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

    it("it should be possible to create trainings by token of TRAINER valid",  async () => {      
      const data: ITrainingCreateUpdate = {
        tag: "test tag CREATE",
        training: "test training CREATE",
        modality_id: 1,
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32",
        details: [
          { description: "teste01", value: "teste01value" }
        ],
      };
      const newResponse = await testServer.post("/trainings").send(data).set("authorization", tokenTrainer);

      expect(newResponse.body.isSuccess).toBeTruthy();
      expect(newResponse.body.data[0]).toHaveProperty("id");
      expect(newResponse.status).toEqual(200);
    });

    it("it not should be possible to create trainings by token NOT TRAINER valid",  async () => {   
      const data: ITrainingCreateUpdate = {
        tag: "test tag NOT TRAINER",
        training: "test training NOT TRAINER",
        modality_id: 1,
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32",
        details: [
          { description: "teste01", value: "teste01value" }
        ],
      };
      const newResponse = await testServer.post("/trainings").send(data).set("authorization", tokenNotTrainer);   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.status).toEqual(401);
    });

    it("it not should be possible to create trainings by token invalid",  async () => {   
      const data: ITrainingCreateUpdate = {
        tag: "test tag TOKEN INVALID",
        training: "test training TOKEN INVALID",
        modality_id: 1,
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32",
        details: [
          { description: "teste01", value: "teste01value" }
        ],
      };
      const newResponse = await testServer.post("/trainings").send(data).set("authorization", "123456789");   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.status).toEqual(401);
    });

    it("it not should be possible to create trainings with more than 5 detals",  async () => {   
      const data: ITrainingCreateUpdate = {
        tag: "test tag MORE THAN 5",
        training: "test training MORE THAN 5",
        modality_id: 1,
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32",
        details: [
          { description: "teste01", value: "teste01value" },
          { description: "teste02", value: "teste01value" },
          { description: "teste03", value: "teste01value" },
          { description: "teste04", value: "teste01value" },
          { description: "teste05", value: "teste01value" },
          { description: "teste06", value: "teste01value" }
        ],
      };
      const newResponse = await testServer.post("/trainings").send(data).set("authorization", tokenTrainer);   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("Informe no máximo 5 detalhes por treino.");
      expect(newResponse.status).toEqual(400);
    });

    it("it not should be possible to create trainings with repeated detals",  async () => {   
      const data: ITrainingCreateUpdate = {
        tag: "test tag REPEATED DETAILS",
        training: "test training REPEATED DETAILS",
        modality_id: 1,
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32",
        details: [
          { description: "teste01", value: "teste01value" },
          { description: "teste01", value: "teste01value" },
        ],
      };
      const newResponse = await testServer.post("/trainings").send(data).set("authorization", tokenTrainer);   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("Detalhes dos treinos repitidos. Analise os dados informados.");
      expect(newResponse.status).toEqual(400);
    });

    it("It should not be possible to register an existing training",  async () => {   
      const data: ITrainingCreateUpdate = {
        tag: "test tag TRAINING EXISTING",
        training: "test training TRAINING EXISTING",
        modality_id: 1,
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32",
        details: [
          { description: "teste01", value: "teste01value" },
          { description: "teste02", value: "teste01value" },
        ],
      };
      await Training.create(data);//ver aqui   
      const newResponse = await testServer.post("/trainings").send(data).set("authorization", tokenTrainer);   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("Detalhes dos treinos repitidos. Analise os dados informados.");
      expect(newResponse.status).toEqual(400);
    });
  });
});  
