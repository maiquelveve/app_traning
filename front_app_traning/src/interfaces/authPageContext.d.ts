interface IAuthPageContext {
  showFormSignIn: boolean;
  showFormSignUp: boolean;
  showFormPassword: boolean;
  handleChangeSignIn: () => void;
  handleChangeSignUp: () => void;
  handleChangePasswordReset: () => void;
}
