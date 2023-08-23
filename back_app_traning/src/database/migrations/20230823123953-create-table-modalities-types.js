"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("modalities_types", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      type: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ["CLASS", "TRAINING"],
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("modalities_types");
  }
};
