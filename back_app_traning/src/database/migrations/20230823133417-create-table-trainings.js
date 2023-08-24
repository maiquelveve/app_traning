"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("trainings", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      tag: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      training: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      video_url: {
        type: Sequelize.STRING(200),
        allowNull: true,
        defaultValue: null
      },
      modality_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "modalities", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      user_trainer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("trainings");
  }
};
