interface IUserCreate {
  name: string;
  email: string;
  password: string;
}

interface IUserLogin {
  email: string;
  password: string;
}

interface IUserSerialize {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
}

interface IUserResetPasswordProps {
  email: string;
}
