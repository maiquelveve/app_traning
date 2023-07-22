import { AUTH_PASS_MAIL, AUTH_USER_MAIL, HOST_MAIL, PORT_MAIL, SECURE_MAIL } from "../constants";

export const sendMailConfig: ISendMailConfig = {
  host: HOST_MAIL,
  port: PORT_MAIL,
  secure: SECURE_MAIL,
  auth: {
    user: AUTH_USER_MAIL,
    pass: AUTH_PASS_MAIL,
  },
};
