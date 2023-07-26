import { 
  DataTypes, 
  Model, 
  InferAttributes, 
  InferCreationAttributes, 
  CreationOptional, 
  Association, 
  ForeignKey 
} from "sequelize";

import { connectionSql } from "../database/connectionSql";

import User from "./User";
import Profile from "./Profile";

class UsersProfiles extends Model <InferAttributes<UsersProfiles>,InferCreationAttributes<UsersProfiles>> { 
  
  declare id: CreationOptional<number>;
  declare user_id: ForeignKey<User["id"]>;
  declare profile_id: ForeignKey<Profile["id"]>;
  
  declare static associations: {
    user: Association<UsersProfiles, User>;
    profile: Association<UsersProfiles, Profile>
  };
}
  
UsersProfiles.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
  },
  {
    tableName: "users_profiles",
    sequelize: connectionSql
  }
);

export default UsersProfiles;
