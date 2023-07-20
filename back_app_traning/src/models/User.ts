import { 
  DataTypes,  
  Model, 
  InferAttributes, 
  InferCreationAttributes, 
  CreationOptional, 
} from "sequelize";

import { connectionSql } from "../database/connectionSql";


class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> { 
  declare id: CreationOptional<number>;
  declare name: string;
  declare email: string;
  declare password: string;  
    
}
    
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
  },
  {
    tableName: "users",
    sequelize: connectionSql
  }
);

export default User;
