type EnumProfilesSystem = "USER" | "TRAINER" | "ROOT"
type EnumCodeProfilesSystem = "U" | "T" | "R"

interface IProfileSystem {
  profile: EnumProfilesSystem;
  code: EnumCodeProfilesSystem;
}

interface IUserPofile {
  user_profile: IProfileSystem
}

