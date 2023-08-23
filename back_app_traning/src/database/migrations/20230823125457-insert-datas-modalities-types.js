"use strict";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const typesModaitiesSistem = require("./datas/typesModaitiesSistem");

module.exports = {
  async up (queryInterface) {
    queryInterface.bulkInsert("modalities_types", typesModaitiesSistem);
  },

  async down (queryInterface) {
    return queryInterface.bulkDelete("modalities_types", null, {});
  }
};
