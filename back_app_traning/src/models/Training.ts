import { 
  DataTypes,  
  Model, 
  InferAttributes, 
  InferCreationAttributes, 
  CreationOptional, 
  ForeignKey
} from "sequelize";

import Modality from "./Modality";
import User from "./User";

import { connectionSql } from "../database/connectionSql";
import TrainingDetail from "./TrainingDetail";

class Training extends Model<InferAttributes<Training>, InferCreationAttributes<Training>> { 
  declare id: CreationOptional<number>;
  declare tag: string;
  declare training: string;
  declare video_url: string;
  declare modality_id: ForeignKey<Modality["id"]>;
  declare user_trainer_id: ForeignKey<User["id"]>;
}
    
Training.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    tag: {
      type: new DataTypes.STRING(100),
      allowNull: false
    },
    training: {
      type: new DataTypes.STRING(100),
      allowNull: false
    },
    video_url: {
      type: new DataTypes.STRING(200),
      allowNull: false
    },
    modality_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_trainer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "trainings",
    sequelize: connectionSql
  }
);

Training.belongsTo(Modality, {
  foreignKey: "modality_id",
  as: "modality",
});

Training.belongsTo(User, {
  foreignKey: "user_trainer_id",
  as: "trainer",
});

// AQUI PARA FAZER A CONSULTA PELO TRAINING E TRAZER OS DETALHES [] - INCLUDE: [{model: TrainingDetail, as: "trainingDetails"}]
Training.hasMany(TrainingDetail, {
  sourceKey: "id",
  foreignKey: "training_id",
  as: "trainingDetails"
});

export default Training;
