interface IAuthUserContext {
  createUser: (props: IUserCreateProps) => Promise<IReturnedRequest> 
}
