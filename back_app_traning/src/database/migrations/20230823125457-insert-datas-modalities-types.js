"use strict";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const typesModaitiesSystem = require("./datas/typesModaitiesSystem");

module.exports = {
  async up (queryInterface) {
    queryInterface.bulkInsert("modalities_types", typesModaitiesSystem);
  },

  async down (queryInterface) {
    return queryInterface.bulkDelete("modalities_types", null, {});
  }
};
