interface IAuthUserContext {
  createUser: (props: IUserCreateProps) => Promise<boolean | undefined>;
  loginUser: (props: IUserLoginProps) => Promise<void>;
  logout: () => Promise<void>;
  getToken: () => string | null;
  getUserAuth: () => IUserAuthLocalStorageData | null;
  getProfilesUserAuth: () => IProfilesLocalStorageData;
}

interface ISaveUserAuthLocalStorageProps {
  user: IUserAuth;
}

interface IUserAuthLocalStorageData {
  name: string;
  email: string;
  avatar_url: string | null;
  avatar_filename: string | null;
}

interface IProfilesLocalStorageData {
  isUserProfiles: boolean;
  isTrainerProfiles: boolean;
  isRootProfiles: boolean;
}
