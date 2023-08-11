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
  declare avatar_url?: string;
  declare avatar_filename?: string;
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
    avatar_url: {
      type: new DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
    },
    avatar_filename: {
      type: new DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
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
  as: "profiles" // Name is "AS" in the INCLUDE association
});

UsersProfiles.belongsTo(User, { foreignKey: "user_id", targetKey: "id", as: "profiles" });

export default User;
