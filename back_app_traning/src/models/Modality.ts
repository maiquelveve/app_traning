import { 
  DataTypes,  
  Model, 
  InferAttributes, 
  InferCreationAttributes, 
  CreationOptional, 
  ForeignKey
} from "sequelize";

import { connectionSql } from "../database/connectionSql";
import ModalityType from "./ModalityType";

class Modality extends Model<InferAttributes<Modality>, InferCreationAttributes<Modality>> { 
  declare id: CreationOptional<number>;
  declare modality: string;
  declare modality_type_id: ForeignKey<ModalityType["id"]>;
}
    
Modality.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    modality: {
      type: new DataTypes.STRING(150),
      allowNull: false
    },
    modality_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "modalities",
    sequelize: connectionSql
  }
);

Modality.belongsTo(ModalityType, {
  foreignKey: "modality_type_id",
  as: "modalityType",
});

export default Modality;
