import { 
  DataTypes,  
  Model, 
  InferAttributes, 
  InferCreationAttributes, 
  CreationOptional, 
  ForeignKey
} from "sequelize";

import Training from "./Training";

import { connectionSql } from "../database/connectionSql";

class TrainingDetail extends Model<InferAttributes<TrainingDetail>, InferCreationAttributes<TrainingDetail>> { 
  declare id: CreationOptional<number>;
  declare description: string;
  declare value: string;
  declare training_id: ForeignKey<Training["id"]>;
}
    
TrainingDetail.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    description: {
      type: new DataTypes.STRING(50),
      allowNull: false
    },
    value: {
      type: new DataTypes.STRING(25),
      allowNull: false
    },
    training_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "training_details",
    sequelize: connectionSql
  }
);

export default TrainingDetail;
