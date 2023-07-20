// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: ".env" });

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT
  },
  "test": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME_DATABASE_TEST,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME_DATABASE_PRODUCTION,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT
  }
};
