export const authConfiguration: IAuthConfigurationProps = { 
  secret: process.env.SECRET_TOKEN_USER || "a1b2c3d4f7&?",
  expiresIn: process.env.SECRET_TOKEN_EXPIRESIN || "1d",
};
