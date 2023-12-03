interface IUserCreateProps {
  name: string;
  email: string;
  password: string;
}

interface IUserLoginProps {
  email: string;
  password: string;
}

interface IUserAuth {
  id: number;
  name: string;
  email: string;
  token: string;
  avatar_url: string | null;
  avatar_filename: string | null;
  profiles: IUserPofile[]
}
