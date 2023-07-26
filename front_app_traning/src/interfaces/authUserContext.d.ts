interface IAuthUserContext {
  setToken: (token: string) => void;
  getToken: () => string | null;
  clearToken: () => void;
}
