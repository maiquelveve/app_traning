interface IAuthUserContext {
  profilesUsersCurrent: IUserPofile[];
  isRootProfiles: boolean; 
  isTrainerProfiles: boolean;
  isUserProfiles: boolean;
  loadingAuthUserContext: boolean;
  setProfilesUser: (profiles: IUserPofile[]) => void;
  setToken: (token: string) => void;
  getToken: () => string | null;
  handleLogout: () => void;
}
