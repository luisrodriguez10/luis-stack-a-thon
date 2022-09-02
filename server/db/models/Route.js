const Sequelize = require("sequelize");
const db = require("../db");

const Route = db.define("route", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Route;