//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Role = require('./models/Role');
const Bus = require('./models/Bus');
const Student = require('./models/Student');
const Status = require('./models/Status');
const StudentStatus = require('./models/StudentStatus');
const Route = require('./models/Route');
const State = require('./models/State');
const Coordinate = require('./models/Coordinate');

//associations could go here!
User.belongsTo(Role);
Bus.belongsTo(User);
Student.belongsTo(User);
Student.belongsTo(Bus);
// Student.belongsTo(Status);
StudentStatus.belongsTo(Status);
StudentStatus.belongsTo(Student);
StudentStatus.belongsTo(Route)

module.exports = {
  db,
  models: {
    User,
    Role,
    Bus,
    Student,
    Status,
    StudentStatus,
    Route,
    State,
    Coordinate
  },
};
