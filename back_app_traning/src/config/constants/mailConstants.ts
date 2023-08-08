const HOST_MAIL = process.env.MAIL_HOST || "";
const PORT_MAIL = Number(process.env.MAIL_PORT) || 587;
const SECURE_MAIL = process.env.MAIL_SECURE === "true" ? true : false;
const AUTH_USER_MAIL = process.env.MAIL_AUTH_USER || "";
const AUTH_PASS_MAIL = process.env.MAIL_AUTH_PASS || "";

export {
  HOST_MAIL,
  PORT_MAIL,
  SECURE_MAIL,
  AUTH_USER_MAIL,
  AUTH_PASS_MAIL,
};
