import { Profile, Training, TrainingDetail, User, UsersProfiles } from "../../../src/models";
import { connectionSql } from "../../../src/database/connectionSql";

import { testServer } from "../../jest-setup";
import { encryptPassword } from "../../../src/helpers";

describe("@integration", () => {
  describe("TRAINIG CONTROLLER - Update Trainings", () => {

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
        tag: "test tag UPDATE INIT",
        training: "test training UPDATE INIT",
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

    it("it should be possible to update trainings by token of TRAINER valid",  async () => {      
      const data: ITrainingCreateUpdate = {
        tag: "test tag UPDATE",
        training: "test training UPDATE",
        modality_id: 1,
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32",
        details: [
          { description: "teste01", value: "teste01value" }
        ],
      };
      const newResponse = await testServer.put(`/trainings/${id}`).send(data).set("authorization", tokenTrainer);

      expect(newResponse.body.isSuccess).toBeTruthy();
      expect(newResponse.body.data[0]).toHaveProperty("id");
      expect(newResponse.status).toEqual(200);
    });

    it("it should be possible to update the same training, but with training data from different TRAINERS",  async () => {     

      await Training.create({
        tag: "test UPDATE TRAINING DIFFERENT TRAINERS",
        training: "test UPDATE TRAINING DIFFERENT TRAINERS",
        modality_id: 1,
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32",
        user_trainer_id: user_trainer_id2
      });

      const data: ITrainingCreateUpdate = {
        tag: "test UPDATE TRAINING DIFFERENT TRAINERS",
        training: "test UPDATE TRAINING DIFFERENT TRAINERS",
        modality_id: 1,
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32",
        details: [
          { description: "teste01", value: "teste01value" }
        ],
      };
      const newResponse = await testServer.put(`/trainings/${id}`).send(data).set("authorization", tokenTrainer);

      expect(newResponse.body.isSuccess).toBeTruthy();
      expect(newResponse.body.data[0]).toHaveProperty("id");
      expect(newResponse.status).toEqual(200);
    });

    it("it not should be possible to update trainings by token NOT TRAINER valid",  async () => {   
      const data: ITrainingCreateUpdate = {
        tag: "test tag NOT TRAINER",
        training: "test training NOT TRAINER",
        modality_id: 1,
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32",
        details: [
          { description: "teste01", value: "teste01value" }
        ],
      };
      const newResponse = await testServer.put(`/trainings/${id}`).send(data).set("authorization", tokenNotTrainer);   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.status).toEqual(401);
    });

    it("it not should be possible to update trainings by token invalid",  async () => {   
      const data: ITrainingCreateUpdate = {
        tag: "test tag TOKEN INVALID",
        training: "test training TOKEN INVALID",
        modality_id: 1,
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32",
        details: [
          { description: "teste01", value: "teste01value" }
        ],
      };
      const newResponse = await testServer.put(`/trainings/${id}`).send(data).set("authorization", "123456789");   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.status).toEqual(401);
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

      await Training.create({ ...data, user_trainer_id });
      const newResponse = await testServer.put(`/trainings/${id}`).send(data).set("authorization", tokenTrainer);   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("Treino já cadastrado.");
      expect(newResponse.status).toEqual(400);
    });



    it("It should not be possible to updated training other user",  async () => {   
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

      const training = await Training.create({ ...data, user_trainer_id: user_trainer_id2 });
      const newResponse = await testServer.put(`/trainings/${training.id}`).send(data).set("authorization", tokenTrainer);   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("Treino inexistente no sistema.");
      expect(newResponse.status).toEqual(400);
    });
    
    it("it not should be possible to update trainings with more than 5 detals",  async () => {   
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

    it("it not should be possible to update trainings with repeated detals",  async () => {   
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

    it("it not should be possible to update trainings with TAG shorter than 3 characters",  async () => {   
      const data: ITrainingCreateUpdate = {
        tag: "te",
        training: "test training TAG",
        modality_id: 1,
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32",
        details: [
          { description: "teste01", value: "teste01value" },
        ],
      };
      const newResponse = await testServer.post("/trainings").send(data).set("authorization", tokenTrainer);   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("TAG deve conter 3 caracteres no mínimo.");
      expect(newResponse.status).toEqual(400);
    });

    it("it not should be possible to update trainings with TAG shorter than 3 characters with space",  async () => {   
      const data: ITrainingCreateUpdate = {
        tag: "te   ",
        training: "test training TAG",
        modality_id: 1,
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32",
        details: [
          { description: "teste01", value: "teste01value" },
        ],
      };
      const newResponse = await testServer.post("/trainings").send(data).set("authorization", tokenTrainer);   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("TAG deve conter 3 caracteres no mínimo.");
      expect(newResponse.status).toEqual(400);
    });

    it("it not should be possible to update trainings with TAG more than 80 characters",  async () => {   
      const data: ITrainingCreateUpdate = {
        tag: "testetestetestetestetestetestetestetestetestetestetestetestetestetestetestetesteteste",
        training: "test training TAG",
        modality_id: 1,
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32",
        details: [
          { description: "teste01", value: "teste01value" },
        ],
      };
      const newResponse = await testServer.post("/trainings").send(data).set("authorization", tokenTrainer);   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("TAG deve conter 80 caracteres no máximo.");
      expect(newResponse.status).toEqual(400);
    });

    it("it not should be possible to update trainings with an empty TAG",  async () => {   
      const data: ITrainingCreateUpdate = {
        tag: "",
        training: "test training TAG",
        modality_id: 1,
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32",
        details: [
          { description: "teste01", value: "teste01value" },
        ],
      };
      const newResponse = await testServer.post("/trainings").send(data).set("authorization", tokenTrainer);   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("TAG deve conter 3 caracteres no mínimo.");
      expect(newResponse.body.errors[1]).toEqual("TAG é obrigatória.");
      expect(newResponse.status).toEqual(400);
    });

    it("it not should be possible to update trainings without TAG",  async () => {   
      const data: Omit<ITrainingCreateUpdate, "tag"> = {
        training: "test training TAG",
        modality_id: 1,
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32",
        details: [
          { description: "teste01", value: "teste01value" },
        ],
      };
      const newResponse = await testServer.post("/trainings").send(data).set("authorization", tokenTrainer);   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("TAG é obrigatória.");
      expect(newResponse.status).toEqual(400);
    });

    it("it not should be possible to update trainings with TRAINING shorter than 3 characters",  async () => {   
      const data: ITrainingCreateUpdate = {
        tag: "teste TRAINING",
        training: "te",
        modality_id: 1,
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32",
        details: [
          { description: "teste01", value: "teste01value" },
        ],
      };
      const newResponse = await testServer.post("/trainings").send(data).set("authorization", tokenTrainer);   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("Nome do Treino deve conter 3 caracteres no mínimo.");
      expect(newResponse.status).toEqual(400);
    });

    it("it not should be possible to update trainings with TRAINING shorter than 3 characters with space",  async () => {   
      const data: ITrainingCreateUpdate = {
        tag: "teste TRAINING",
        training: "te        ",
        modality_id: 1,
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32",
        details: [
          { description: "teste01", value: "teste01value" },
        ],
      };
      const newResponse = await testServer.post("/trainings").send(data).set("authorization", tokenTrainer);   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("Nome do Treino deve conter 3 caracteres no mínimo.");
      expect(newResponse.status).toEqual(400);
    });

    it("it not should be possible to update trainings with TRAINING more than 80 characters",  async () => {   
      const data: ITrainingCreateUpdate = {
        tag: "test TRAINING",
        training: "testetestetestetestetestetestetestetestetestetestetestetestetestetestetestetesteteste",
        modality_id: 1,
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32",
        details: [
          { description: "teste01", value: "teste01value" },
        ],
      };
      const newResponse = await testServer.post("/trainings").send(data).set("authorization", tokenTrainer);   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("Nome do Treino deve conter 80 caracteres no máximo.");
      expect(newResponse.status).toEqual(400);
    });

    it("it not should be possible to update trainings with an empty TRAINING",  async () => {   
      const data: ITrainingCreateUpdate = {
        tag: "test TRAINING",
        training: "",
        modality_id: 1,
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32",
        details: [
          { description: "teste01", value: "teste01value" },
        ],
      };
      const newResponse = await testServer.post("/trainings").send(data).set("authorization", tokenTrainer);   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("Nome do Treino deve conter 3 caracteres no mínimo.");
      expect(newResponse.body.errors[1]).toEqual("Nome do Treino é obrigatório.");
      expect(newResponse.status).toEqual(400);
    });

    it("it not should be possible to update trainings without TRAINING",  async () => {   
      const data: Omit<ITrainingCreateUpdate, "training"> = {
        tag: "test TRAINING",
        modality_id: 1,
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32",
        details: [
          { description: "teste01", value: "teste01value" },
        ],
      };
      const newResponse = await testServer.post("/trainings").send(data).set("authorization", tokenTrainer);   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("Nome do Treino é obrigatório.");
      expect(newResponse.status).toEqual(400);
    });

    it("it not should be possible to update trainings with VIDEO_URL shorter than 20 characters",  async () => {   
      const data: ITrainingCreateUpdate = {
        tag: "test VIDEO_URL",
        training: "test VIDEO_URL",
        modality_id: 1,
        video_url: "www.youtube.com",
        details: [
          { description: "teste01", value: "teste01value" },
        ],
      };
      const newResponse = await testServer.post("/trainings").send(data).set("authorization", tokenTrainer);   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("Video URL deve conter 20 caracteres no mínimo.");
      expect(newResponse.status).toEqual(400);
    });

    it("it not should be possible to update trainings with VIDEO_URL shorter than 20 characters with space",  async () => {   
      const data: ITrainingCreateUpdate = {
        tag: "teste VIDEO_URL",
        training: "test VIDEO_URL",
        modality_id: 1,
        video_url: "www.youtube      ",
        details: [
          { description: "teste01", value: "teste01value" },
        ],
      };
      const newResponse = await testServer.post("/trainings").send(data).set("authorization", tokenTrainer);   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("Video URL deve conter 20 caracteres no mínimo.");
      expect(newResponse.status).toEqual(400);
    });

    it("it not should be possible to update trainings with VIDEO_URL more than 200 characters",  async () => {   
      const data: ITrainingCreateUpdate = {
        tag: "test VIDEO_URL",
        training: "test VIDEO_URL",
        modality_id: 1,
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32www.youtube.com/iusyiwehtwjkdnfq123eqw32www.youtube.com/iusyiwehtwjkdnfq123eqw32www.youtube.com/iusyiwehtwjkdnfq123eqw32www.youtube.com/iusyiwehtwjkdnfq123eqw32www.youtube.com/iusyiwehtwjkdnfq123eqw32www.youtube.com/iusyiwehtwjkdnfq123eqw32",
        details: [
          { description: "teste01", value: "teste01value" },
        ],
      };
      const newResponse = await testServer.post("/trainings").send(data).set("authorization", tokenTrainer);   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("Video URL deve conter 200 caracteres no máximo.");
      expect(newResponse.status).toEqual(400);
    });

    it("it not should be possible to update trainings with an empty VIDEO_URL",  async () => {   
      const data: ITrainingCreateUpdate = {
        tag: "test VIDEO_URL",
        training: "test VIDEO_URL",
        modality_id: 1,
        video_url: "",
        details: [
          { description: "teste01", value: "teste01value" },
        ],
      };
      const newResponse = await testServer.post("/trainings").send(data).set("authorization", tokenTrainer);   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("Video URL deve conter 20 caracteres no mínimo.");
      expect(newResponse.body.errors[1]).toEqual("Video URL é obrigatória.");
      expect(newResponse.status).toEqual(400);
    });

    it("it not should be possible to update trainings without VIDEO_URL",  async () => {   
      const data: Omit<ITrainingCreateUpdate, "video_url"> = {
        tag: "test VIDEO_URL",
        training: "test VIDEO_URL",
        modality_id: 1,
        details: [
          { description: "teste01", value: "teste01value" },
        ],
      };
      const newResponse = await testServer.post("/trainings").send(data).set("authorization", tokenTrainer);   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("Video URL é obrigatória.");
      expect(newResponse.status).toEqual(400);
    });

    it("it not should be possible to update trainings with MODALITY_ID not number",  async () => {   
      const data: any = {
        tag: "test MODALITY_ID",
        training: "test MODALITY_ID",
        modality_id: "as2d31asd",
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32",
        details: [
          { description: "teste01", value: "teste01value" },
        ],
      };
      const newResponse = await testServer.post("/trainings").send(data).set("authorization", tokenTrainer);   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("Modalidade invalida.");
      expect(newResponse.status).toEqual(400);
    });

    it("it not should be possible to update trainings without MODALITY_ID",  async () => {   
      const data: Omit<ITrainingCreateUpdate, "modality_id"> = {
        tag: "teste MODALITY_ID",
        training: "test MODALITY_ID",
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32",
        details: [
          { description: "teste01", value: "teste01value" },
        ],
      };
      const newResponse = await testServer.post("/trainings").send(data).set("authorization", tokenTrainer);   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("Modalidade do Treino é obrigatória.");
      expect(newResponse.status).toEqual(400);
    });

    it("it not should be possible to update trainings with MODALITY_ID nonexistent database",  async () => {   
      const data: ITrainingCreateUpdate = {
        tag: "teste MODALITY_ID",
        training: "test MODALITY_ID",
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32",
        modality_id: 99999999,
        details: [
          { description: "teste01", value: "teste01value" },
        ],
      };
      const newResponse = await testServer.post("/trainings").send(data).set("authorization", tokenTrainer);   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.status).toEqual(500);
    });

    it("it not should be possible to update trainings with DESCRIPTION DETAILS shorter than 5 characters",  async () => {   
      const data: ITrainingCreateUpdate = {
        tag: "test DESCRIPTION DETAILS",
        training: "test DESCRIPTION DETAILS",
        modality_id: 1,
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32",
        details: [
          { description: "tes", value: "teste01value" },
        ],
      };
      const newResponse = await testServer.post("/trainings").send(data).set("authorization", tokenTrainer);   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("A Descrição do detalhe 'TES' deve conter 5 caracteres no mínimo.");
      expect(newResponse.status).toEqual(400);
    });

    it("it not should be possible to update trainings with DESCRIPTION DETAILS shorter than 20 characters with space",  async () => {   
      const data: ITrainingCreateUpdate = {
        tag: "teste DESCRIPTION DETAILS",
        training: "test DESCRIPTION DETAILS",
        modality_id: 1,
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32",
        details: [
          { description: "tes    ", value: "teste01value" },
        ],
      };
      const newResponse = await testServer.post("/trainings").send(data).set("authorization", tokenTrainer);   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("A Descrição do detalhe 'TES' deve conter 5 caracteres no mínimo.");
      expect(newResponse.status).toEqual(400);
    });

    it("it not should be possible to update trainings with DESCRIPTION DETAILS shorter than 5 characters item 2",  async () => {   
      const data: ITrainingCreateUpdate = {
        tag: "test DESCRIPTION DETAILS",
        training: "test DESCRIPTION DETAILS",
        modality_id: 1,
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32",
        details: [
          { description: "testes", value: "teste01value" },
          { description: "tes", value: "teste01value" },
        ],
      };
      const newResponse = await testServer.post("/trainings").send(data).set("authorization", tokenTrainer);   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("A Descrição do detalhe 'TES' deve conter 5 caracteres no mínimo.");
      expect(newResponse.status).toEqual(400);
    });

    it("it not should be possible to update trainings with DESCRIPTION DETAILS shorter than 5 characters with space item 2",  async () => {   
      const data: ITrainingCreateUpdate = {
        tag: "teste DESCRIPTION DETAILS",
        training: "test DESCRIPTION DETAILS",
        modality_id: 1,
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32",
        details: [
          { description: "testes", value: "teste01value" },
          { description: "tes    ", value: "teste01value" },
        ],
      };
      const newResponse = await testServer.post("/trainings").send(data).set("authorization", tokenTrainer);   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("A Descrição do detalhe 'TES' deve conter 5 caracteres no mínimo.");
      expect(newResponse.status).toEqual(400);
    });

    it("it not should be possible to update trainings with DESCRIPTION DETAILS more than 50 characters",  async () => {   
      const data: ITrainingCreateUpdate = {
        tag: "test DESCRIPTION DETAILS",
        training: "test DESCRIPTION DETAILS",
        modality_id: 1,
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32",
        details: [
          { description: "teste01teste01teste01teste01teste01teste01teste01teste01teste01teste01", value: "teste01value" },
        ],
      };
      const newResponse = await testServer.post("/trainings").send(data).set("authorization", tokenTrainer);   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual(
        "A Descrição do detalhe 'TESTE01TESTE01TESTE01TESTE01TESTE01TESTE01TESTE01TESTE01TESTE01TESTE01' deve conter 50 caracteres no máximo."
      );
      expect(newResponse.status).toEqual(400);
    });

    it("it not should be possible to update trainings with DESCRIPTION DETAILS more than 50 characters item 2",  async () => {   
      const data: ITrainingCreateUpdate = {
        tag: "test DESCRIPTION DETAILS",
        training: "test DESCRIPTION DETAILS",
        modality_id: 1,
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32",
        details: [
          { description: "teste01tes", value: "teste01value" },
          { description: "teste01teste01teste01teste01teste01teste01teste01teste01teste01teste01", value: "teste01value" },
        ],
      };
      const newResponse = await testServer.post("/trainings").send(data).set("authorization", tokenTrainer);   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual(
        "A Descrição do detalhe 'TESTE01TESTE01TESTE01TESTE01TESTE01TESTE01TESTE01TESTE01TESTE01TESTE01' deve conter 50 caracteres no máximo."
      );
      expect(newResponse.status).toEqual(400);
    });

    it("it not should be possible to update trainings with an empty DESCRIPTION DETAILS",  async () => {   
      const data: ITrainingCreateUpdate = {
        tag: "test DESCRIPTION DETAILS",
        training: "test DESCRIPTION DETAILS",
        modality_id: 1,
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32",
        details: [
          { description: "", value: "teste01value" },
        ],
      };
      const newResponse = await testServer.post("/trainings").send(data).set("authorization", tokenTrainer);   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("A Descrição do detalhe '' deve conter 5 caracteres no mínimo.");
      expect(newResponse.body.errors[1]).toEqual("1º Descrição é obrigatória para os detalhes, reveja os dados informados.");
      expect(newResponse.status).toEqual(400);
    });

    it("it not should be possible to update trainings without DESCRIPTION DETAILS",  async () => {  
      const data: any = {
        tag: "test DESCRIPTION DETAILS",
        training: "test DESCRIPTION DETAILS",
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32",
        modality_id: 1,
        details: [
          { value: "teste01value" },
        ],
      };
      const newResponse = await testServer.post("/trainings").send(data).set("authorization", tokenTrainer);   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("1º Descrição é obrigatória para os detalhes, reveja os dados informados.");
      expect(newResponse.status).toEqual(400);
    });

    it("it not should be possible to update trainings without DESCRIPTION DETAILS item 2",  async () => {  
      const data: any = {
        tag: "test DESCRIPTION DETAILS",
        training: "test DESCRIPTION DETAILS",
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32",
        modality_id: 1,
        details: [
          { description: "teste01tes", value: "teste01value" },
          { value: "teste01value" },
        ],
      };
      const newResponse = await testServer.post("/trainings").send(data).set("authorization", tokenTrainer);   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("2º Descrição é obrigatória para os detalhes, reveja os dados informados.");
      expect(newResponse.status).toEqual(400);
    });

    it("it not should be possible to update trainings with VALUE DETAILS shorter than 1 characters",  async () => {   
      const data: ITrainingCreateUpdate = {
        tag: "test VALUE DETAILS",
        training: "test VALUE DETAILS",
        modality_id: 1,
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32",
        details: [
          { description: "testes", value: "" },
        ],
      };
      const newResponse = await testServer.post("/trainings").send(data).set("authorization", tokenTrainer);   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("O Valor do detalhe '' deve conter 1 caracteres no mínimo.");
      expect(newResponse.status).toEqual(400);
    });

    it("it not should be possible to update trainings with VALUE DETAILS shorter than 1 characters with space",  async () => {   
      const data: ITrainingCreateUpdate = {
        tag: "teste VALUE DETAILS",
        training: "test VALUE DETAILS",
        modality_id: 1,
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32",
        details: [
          { description: "testes", value: "   " },
        ],
      };
      const newResponse = await testServer.post("/trainings").send(data).set("authorization", tokenTrainer);   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("O Valor do detalhe '' deve conter 1 caracteres no mínimo.");
      expect(newResponse.status).toEqual(400);
    });

    it("it not should be possible to update trainings with VALUE DETAILS shorter than 1 characters item 2",  async () => {   
      const data: ITrainingCreateUpdate = {
        tag: "test VALUE DETAILS",
        training: "test VALUE DETAILS",
        modality_id: 1,
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32",
        details: [
          { description: "testes", value: "teste01value" },
          { description: "testes", value: "" },
        ],
      };
      const newResponse = await testServer.post("/trainings").send(data).set("authorization", tokenTrainer);   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("O Valor do detalhe '' deve conter 1 caracteres no mínimo.");
      expect(newResponse.status).toEqual(400);
    });

    it("it not should be possible to update trainings with VALUE DETAILS shorter than 1 characters with space item 2",  async () => {   
      const data: ITrainingCreateUpdate = {
        tag: "teste VALUE DETAILS",
        training: "test VALUE DETAILS",
        modality_id: 1,
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32",
        details: [
          { description: "testes01", value: "teste01value" },
          { description: "testes02", value: "   " },
        ],
      };
      const newResponse = await testServer.post("/trainings").send(data).set("authorization", tokenTrainer);   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("O Valor do detalhe '' deve conter 1 caracteres no mínimo.");
      expect(newResponse.status).toEqual(400);
    });

    it("it not should be possible to update trainings with VALUE DETAILS more than 25 characters",  async () => {   
      const data: ITrainingCreateUpdate = {
        tag: "test VALUE DETAILS",
        training: "test VALUE DETAILS",
        modality_id: 1,
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32",
        details: [
          { description: "teste", value: "teste01teste01teste01teste01teste01teste01teste01teste01teste01teste01" },
        ],
      };
      const newResponse = await testServer.post("/trainings").send(data).set("authorization", tokenTrainer);   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual(
        "O Valor do detalhe 'TESTE01TESTE01TESTE01TESTE01TESTE01TESTE01TESTE01TESTE01TESTE01TESTE01' deve conter 25 caracteres no máximo."
      );
      expect(newResponse.status).toEqual(400);
    });

    it("it not should be possible to update trainings with VALUE DETAILS more than 25 characters item 2",  async () => {   
      const data: ITrainingCreateUpdate = {
        tag: "test VALUE DETAILS",
        training: "test VALUE DETAILS",
        modality_id: 1,
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32",
        details: [
          { description: "teste01", value: "teste01value" },
          { description: "teste", value: "teste01teste01teste01teste01teste01teste01teste01teste01teste01teste01" },
        ],
      };
      const newResponse = await testServer.post("/trainings").send(data).set("authorization", tokenTrainer);   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual(
        "O Valor do detalhe 'TESTE01TESTE01TESTE01TESTE01TESTE01TESTE01TESTE01TESTE01TESTE01TESTE01' deve conter 25 caracteres no máximo."
      );
      expect(newResponse.status).toEqual(400);
    });

    it("it not should be possible to update trainings with an empty VALUE DETAILS",  async () => {   
      const data: ITrainingCreateUpdate = {
        tag: "test VALUE DETAILS",
        training: "test VALUE DETAILS",
        modality_id: 1,
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32",
        details: [
          { description: "teste01", value: "" },
        ],
      };
      const newResponse = await testServer.post("/trainings").send(data).set("authorization", tokenTrainer);   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("O Valor do detalhe '' deve conter 1 caracteres no mínimo.");
      expect(newResponse.body.errors[1]).toEqual("1º Valor é obrigatório para os detalhes, reveja os dados informados.");
      expect(newResponse.status).toEqual(400);
    });

    it("it not should be possible to update trainings without VALUE DETAILS",  async () => {  
      const data: any = {
        tag: "test VALUE DETAILS",
        training: "test VALUE DETAILS",
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32",
        modality_id: 1,
        details: [
          { description: "teste01" },
        ],
      };
      const newResponse = await testServer.post("/trainings").send(data).set("authorization", tokenTrainer);   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("1º Valor é obrigatório para os detalhes, reveja os dados informados.");
      expect(newResponse.status).toEqual(400);
    });

    it("it not should be possible to update trainings without VALUE DETAILS item 2",  async () => {  
      const data: any = {
        tag: "test VALUE DETAILS",
        training: "test VALUE DETAILS",
        video_url: "www.youtube.com/iusyiwehtwjkdnfq123eqw32",
        modality_id: 1,
        details: [
          { description: "teste01tes", value: "teste01value" },
          { description: "teste01" },
        ],
      };
      const newResponse = await testServer.post("/trainings").send(data).set("authorization", tokenTrainer);   
      
      expect(newResponse.body.isError).toBeTruthy();
      expect(newResponse.body.errors[0]).toEqual("2º Valor é obrigatório para os detalhes, reveja os dados informados.");
      expect(newResponse.status).toEqual(400);
    });
  });
});  
