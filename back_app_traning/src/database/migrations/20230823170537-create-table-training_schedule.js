"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("training_schedule", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      date:{
        type: Sequelize.DATE,
        allowNull: false,
      },
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "students", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      training_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "trainings", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });

    await queryInterface.addConstraint("training_schedule", {
      fields: ["student_id", "training_id", "date"],
      type: "unique", 
      name: "unique_student_traning_date_constraint",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("training_schedule");
  }
};
