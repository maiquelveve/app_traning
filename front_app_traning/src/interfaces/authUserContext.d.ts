interface IAuthUserContext {
  profilesUsersCurrent: IUserPofile[];
  setProfilesUser: (profiles: IUserPofile[]) => void;
  setToken: (token: string) => void;
  getToken: () => string | null;
  clearToken: () => void;
}
