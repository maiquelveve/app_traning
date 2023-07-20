const {DB_DIALECT, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME_DATABASE } = process.env;

const uri_database = `${DB_DIALECT}://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME_DATABASE}`;

export default {
  uri: uri_database, 
  define: {
    timestamps: false,
    underscored: false,
  },
  logging: false
};
