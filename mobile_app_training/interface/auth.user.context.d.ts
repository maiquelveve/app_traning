interface IAuthUserContext {
  createUser: (props: IUserCreateProps) => Promise<boolean | undefined>;
  loginUser: (props: IUserLoginProps) => Promise<boolean | undefined>;
  getToken: () => Promise<string | null>;
}

interface ISaveUserAuthLocalStorageProps {
  token: string;
}
