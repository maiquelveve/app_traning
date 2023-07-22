interface IGenerateTokenProps {
  id: number;
}

interface IAuthConfigurationProps {
  secret: string;
  expiresIn: string;
}

interface IJwtPayloadAuthUser {
  auth_user_id: number;
}

type EnumSystemPermission = "root" | "client" | "trainer" // Pensar melhor aqui tbm....

interface ISystemPermission {
  permissions?: EnumSystemPermission[];
}
