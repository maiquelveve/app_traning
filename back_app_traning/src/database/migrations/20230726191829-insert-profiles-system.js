"use strict";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const profilesSistem = require("./datas/profilesSistem");

module.exports = {
  async up (queryInterface) {
    queryInterface.bulkInsert("profiles", profilesSistem);
  },

  async down (queryInterface) {
    return queryInterface.bulkDelete("profiles", null, {});
  }
};
