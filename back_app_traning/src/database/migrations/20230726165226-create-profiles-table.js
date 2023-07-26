"use strict";

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("profiles", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      profile: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      code: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ["U", "T", "R"],
      },
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable("profiles");
  }
};
