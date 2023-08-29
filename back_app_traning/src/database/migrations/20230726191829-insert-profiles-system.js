"use strict";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const profilesSystem = require("./datas/profilesSystem");

module.exports = {
  async up (queryInterface) {
    queryInterface.bulkInsert("profiles", profilesSystem);
  },

  async down (queryInterface) {
    return queryInterface.bulkDelete("profiles", null, {});
  }
};
