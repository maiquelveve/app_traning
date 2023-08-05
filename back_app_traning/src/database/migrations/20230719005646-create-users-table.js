"use strict";

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      avatar_url: {
        type: Sequelize.STRING(150),
        allowNull: true,
        defaultValue: null
      },
      name: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      password: {
        type: Sequelize.STRING(150),
        allowNull: false
      }
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable("users");
  }
};
