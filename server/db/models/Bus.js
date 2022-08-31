const Sequelize = require("sequelize");
const db = require("../db");

const Bus = db.define("bus", {
  number: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Bus;
