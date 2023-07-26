import { 
  DataTypes,  
  Model, 
  InferAttributes, 
  InferCreationAttributes, 
  CreationOptional, 
  Association,
  HasManyGetAssociationsMixin
} from "sequelize";

import { connectionSql } from "../database/connectionSql";
import UsersProfiles from "./UsersProfiles";

class Profile extends Model<InferAttributes<Profile>, InferCreationAttributes<Profile>> { 
  declare id: CreationOptional<number>;
  declare profile: string;
  declare code: "U" | "T" | "R";

  declare getUserProfile: HasManyGetAssociationsMixin<UsersProfiles>;

  declare static associations: {
    usersProfiles: Association<Profile, UsersProfiles>;
  };
}
    
Profile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    profile: {
      type: new DataTypes.STRING(150),
      allowNull: false
    },
    code: {
      type: new DataTypes.ENUM("U", "T", "R"),
      allowNull: false
    },
  },
  {
    tableName: "profiles",
    sequelize: connectionSql
  }
);

Profile.hasMany(UsersProfiles, {
  sourceKey: "id",
  foreignKey: "profile_id",
  as: "user_profile" // Name is "AS" in the INCLUDE association
});

UsersProfiles.belongsTo(Profile, { foreignKey: "profile_id", targetKey: "id", as: "user_profile" });

export default Profile;
