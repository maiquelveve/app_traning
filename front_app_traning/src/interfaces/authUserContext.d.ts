interface IAuthUserContext {
  profilesUsersCurrent: IUserPofile[];
  isRootProfiles: boolean; 
  isTrainerProfiles: boolean;
  isUserProfiles: boolean;
  setProfilesUser: (profiles: IUserPofile[]) => void;
  setToken: (token: string) => void;
  getToken: () => string | null;
  clearToken: () => void;
}
