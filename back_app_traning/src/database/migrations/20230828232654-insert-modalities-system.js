"use strict";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const modaitiesSystem = require("./datas/modaitiesSystem");

module.exports = {
  async up (queryInterface) {
    queryInterface.bulkInsert("modalities", modaitiesSystem);
  },

  async down (queryInterface) {
    return queryInterface.bulkDelete("modalities", null, {});
  }
};
