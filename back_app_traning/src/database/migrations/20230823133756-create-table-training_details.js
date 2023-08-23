"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("training_details", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      description: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      value: {
        type: Sequelize.STRING(25),
        allowNull: false,
      },
      training_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "trainings", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("training_details");
  }
};
