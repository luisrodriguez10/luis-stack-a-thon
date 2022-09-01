const Sequelize = require("sequelize");
const db = require("../db");

const StudentBusStatus = db.define("studentBusStatus", {
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = StudentBusStatus;