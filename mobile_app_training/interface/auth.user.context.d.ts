interface IAuthUserContext {
  createUser: (props: IUserCreateProps) => Promise<boolean | undefined> 
}
