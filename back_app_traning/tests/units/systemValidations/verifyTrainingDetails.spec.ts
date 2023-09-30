import { verifyTrainingDetail } from "../../../src/validations";

describe("@unit", () => {
  describe("SYSTEM VALIDATIONS - Verify Details Training", () => {

    it("It should be possible to register training details", async () => {
      const details: ITrainingDetail[] = [
        { description: "desc 01", value: "123 reps", training_id: 1 }
      ];

      const verifyDetailsTraining = await verifyTrainingDetail({ details});
      expect(verifyDetailsTraining.error).toBeFalsy();
    });

    it("It shouldn't be possible to register more than 5 training details", async () => {
      const details: ITrainingDetail[] = [
        { description: "desc 01", value: "123 reps", training_id: 1 },
        { description: "desc 02", value: "123 reps", training_id: 1 },
        { description: "desc 03", value: "123 reps", training_id: 1 },
        { description: "desc 04", value: "123 reps", training_id: 1 },
        { description: "desc 05", value: "123 reps", training_id: 1 },
        { description: "desc 06", value: "123 reps", training_id: 1 },
      ];

      const verifyDetailsTraining = await verifyTrainingDetail({ details});
      expect(verifyDetailsTraining.error).toBeTruthy();
      expect(verifyDetailsTraining.message).toEqual("Informe no máximo 5 detalhes por treino.");
    });

    it("It should not be possible to register training details with repeated descriptions", async () => {
      const details: ITrainingDetail[] = [
        { description: "desc 01", value: "123 reps", training_id: 1 },
        { description: "desc 01", value: "123 reps", training_id: 1 },
      ];

      const verifyDetailsTraining = await verifyTrainingDetail({ details});
      expect(verifyDetailsTraining.error).toBeTruthy();
      expect(verifyDetailsTraining.message).toEqual("Detalhes dos treinos repitidos. Analise os dados informados.");
    });

  });
});
