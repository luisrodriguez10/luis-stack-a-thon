const Sequelize = require("sequelize");
const db = require("../db");

const Coordinate = db.define("coordinate", {
  lat: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lng: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Coordinate;