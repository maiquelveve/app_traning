interface IAuthUserContext {
  createUser: (props: IUserCreateProps) => Promise<boolean | undefined>;
  loginUser: (props: IUserLoginProps) => Promise<boolean | undefined>;
  getToken: () => string | null;
}

interface ISaveUserAuthLocalStorageProps {
  user: IUserAuth;
}
