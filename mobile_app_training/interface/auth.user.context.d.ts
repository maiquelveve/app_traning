interface IAuthUserContext {
  createUser: (props: IUserCreateProps) => Promise<boolean | undefined>;
  loginUser: (props: IUserLoginProps) => Promise<void>;
  logout: () => Promise<void>;
  getToken: () => string | null;
}

interface ISaveUserAuthLocalStorageProps {
  user: IUserAuth;
}
