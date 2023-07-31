interface IAuthUserContext {
  profilesUsersCurrent: IUserPofile[];
  authUserCurrent: IAuthUser | null;
  isRootProfiles: boolean; 
  isTrainerProfiles: boolean;
  isUserProfiles: boolean;
  loadingAuthUserContext: boolean;
  setAuthUserCurrent: (userCurrent: IAuthUser) => void;
  setProfilesUser: (profiles: IUserPofile[]) => void;
  setToken: (token: string) => void;
  getToken: () => string | null;
  handleLogout: () => void;
}

interface IAuthUser {
  name: string;
  email: string
}
