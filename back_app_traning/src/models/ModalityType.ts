import { 
  DataTypes,  
  Model, 
  InferAttributes, 
  InferCreationAttributes, 
  CreationOptional, 
} from "sequelize";

import { connectionSql } from "../database/connectionSql";

class ModalityType extends Model<InferAttributes<ModalityType>, InferCreationAttributes<ModalityType>> { 
  declare id: CreationOptional<number>;
  declare type: string;
}
    
ModalityType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    type: {
      type: new DataTypes.STRING(150),
      allowNull: false
    },
  },
  {
    tableName: "modalities_types",
    sequelize: connectionSql
  }
);

export default ModalityType;
