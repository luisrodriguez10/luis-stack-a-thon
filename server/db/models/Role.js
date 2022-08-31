const Sequelize = require("sequelize");
const db = require("../db");

const Role = db.define("role", {
  roleType: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Role;