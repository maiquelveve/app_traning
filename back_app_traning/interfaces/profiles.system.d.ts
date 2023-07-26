type EnumProfilesSystem = "USER" | "TRAINER" | "ROOT"
type EnumCodeProfilesSystem = "U" | "T" | "R"

interface IProfileSystem {
  id: number,
  profile: EnumProfilesSystem;
  code: EnumCodeProfilesSystem;
}
