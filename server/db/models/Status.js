const Sequelize = require("sequelize");
const db = require("../db");

const Status = db.define("status", {
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Status;