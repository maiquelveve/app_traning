"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("students", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      paid: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      payday:{
        type: Sequelize.DATE,
        allowNull: false,
      },
      user_student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
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

    await queryInterface.addConstraint("students", {
      fields: ["user_student_id", "user_trainer_id"],
      type: "unique", 
      name: "unique_user_student_trainer_constraint",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("students");
  }
};
