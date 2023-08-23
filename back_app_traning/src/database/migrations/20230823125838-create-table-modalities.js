"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("modalities", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      modality: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      activated: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      requested: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: null
      },
      modality_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "modalities_types", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("modalities");
  }
};
