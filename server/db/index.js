//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Role = require('./models/Role');
const Bus = require('./models/Bus');
const Student = require('./models/Student');

//associations could go here!
User.belongsTo(Role);
Bus.belongsTo(User);
Student.belongsTo(User);
Student.belongsTo(Bus);

module.exports = {
  db,
  models: {
    User,
    Role,
    Bus,
    Student
  },
};
