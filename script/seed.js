'use strict'

const {db, models: {User, Role, Bus, Student, Status, StudentStatus, Route, State} } = require('../server/db')
const seedRoles = require('./seed-roles.json');
const seedUsers = require('./seed-users.json');
const seedBuses = require('./seed-buses.json');
const seedStudents = require('./seed-students.json');
const seedStatuses = require('./seed-statuses.json')
const seedStudentsStatuses = require('./seed-studentsStatuses.json');
const seedRoutes = require('./seed-routes.json');
const seedStates = require('./seed-states.json');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  await Promise.all(seedRoles.map(role => Role.create(role)));
  await Promise.all(seedUsers.map(user => User.create(user)));
  await Promise.all(seedBuses.map(bus => Bus.create(bus)));
  await Promise.all(seedStatuses.map(status => Status.create(status)));
  await Promise.all(seedStudents.map(student => Student.create(student)));
  await Promise.all(seedRoutes.map(route => Route.create(route)));
  await Promise.all(seedStudentsStatuses.map(studentStatus => StudentStatus.create(studentStatus) ));
  await Promise.all(seedStates.map(state => State.create(state)));

  // Creating Users
  // const users = await Promise.all([
  //   User.create({ username: 'cody', password: '123' }),
  //   User.create({ username: 'murphy', password: '123' }),
  // ])

  // console.log(`seeded ${users.length} users`)
  // console.log(`seeded successfully`)
  // return {
  //   users: {
  //     cody: users[0],
  //     murphy: users[1]
  //   }
  // }

}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
