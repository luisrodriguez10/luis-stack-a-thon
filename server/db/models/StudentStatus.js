const Sequelize = require("sequelize");
const db = require("../db");

const StudentStatus = db.define("studentStatus", {
  time: {
    type: Sequelize.TIME,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  }
});

module.exports = StudentStatus;
