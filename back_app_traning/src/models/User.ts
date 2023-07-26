import { 
  DataTypes,  
  Model, 
  InferAttributes, 
  InferCreationAttributes, 
  CreationOptional,
  HasManyGetAssociationsMixin, 
  Association
} from "sequelize";

import { connectionSql } from "../database/connectionSql";

import UsersProfiles from "./UsersProfiles";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare email: string;
  declare password: string;  

  declare getProfilesUser: HasManyGetAssociationsMixin<UsersProfiles>;

  declare static associations: {
    usersProfiles: Association<User, UsersProfiles>;
  };
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

User.hasMany(UsersProfiles, {
  sourceKey: "id",
  foreignKey: "user_id",
  as: "user_profile" // Name is "AS" in the INCLUDE association  
});

UsersProfiles.belongsTo(User, { foreignKey: "user_id", targetKey: "id", as: "user" });

export default User;
